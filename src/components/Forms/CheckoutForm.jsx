import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './CheckoutForm.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ myClass }) => {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const navigate=useNavigate()
    const [cardError, , setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        const price = { price: myClass.price }

        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(price)
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret)
            })


    }, [myClass])
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        //Confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user?.email || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            console.log('[error]', confirmError);
            setCardError(confirmError.message)
        } else {
            console.log('[paymentIntent]', paymentIntent);
            const newData = { classId: myClass._id, className: myClass.className, studentEmail: user.email, price: myClass.price, transectionId: paymentIntent.id, date: new Date() }
            console.log(newData);
            if (paymentIntent.status == "succeeded") {
                fetch('http://localhost:5000/enrolledClass', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(newData)
                })
                    .then(res => res.json())
                    .then(data => {
                        toast.success('Succesfully Enrolled the class.')
                        navigate('/dashboard/enrolledClass')
                    })
            }
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {cardError && <p className="text-red-500">{cardError}</p>}
            <button type="submit" disabled={!stripe} className="btn btn-sm btn-primary">Confirm Payment</button>

        </form>
    );
};


export default CheckoutForm;