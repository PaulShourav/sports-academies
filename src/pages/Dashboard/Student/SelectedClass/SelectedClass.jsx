import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAllClasses from "../../../../hooks/useAllClasses";
import SectionTitle from "../../../../components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../../components/Forms/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useEnrolledClasses from "../../../../hooks/useEnrolledClasses";


const SelectedClass = () => {
    const { user } = useContext(AuthContext)
    const [classes] = useAllClasses()
    const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_Gateway_PK}`);
    const [myClass,setMyClass]=useState('')
    

    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ["selectedClasses", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://sports-academies-server-five.vercel.app/selectedClass?email=${user?.email}`)
            return res.json()
        }
    })
    const myClasses = classes?.filter(o1 => selectedClasses?.some(o2 => o2.classId == o1._id))
//     const checkEnrolledClass = enrolledClasses?.find(o1 => selectedClasses?.some(o2 => o2.classId == o1.classId))
// console.log(checkEnrolledClass);

    const handleDelete = (_id) => {
        console.log(_id);
        fetch(`https://sports-academies-server-five.vercel.app/selectedClass?classId=${_id}&email=${user?.email}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data);
            })
    }

    return (
        <div>
            <SectionTitle heading={"Selected Classes"} />
            <section>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Class name</th>
                                <th>Instrctor Name</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Seats</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {myClasses.map((element, index) =>
                                <tr key={element._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={element.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{element.className}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {element.instructorName}
                                    </td>
                                    <td>
                                        {element.email}
                                    </td>
                                    <td>
                                        {element.price}
                                    </td>
                                    <td>
                                        {element.availableSeat}
                                    </td>
                                    <td className="space-x-2">
                                        <button  onClick={() => handleDelete(element._id)} className="btn btn-sm btn-primary">Delete</button>
                                        <label htmlFor="my_modal_7"  onClick={()=>setMyClass(element)} className="btn btn-sm btn-primary">Payment</label>
                                    </td>

                                </tr>

                            )}

                        </tbody>


                    </table>
                </div>
            </section>
            {/* Model */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm  myClass={myClass}/>
                    </Elements>
                  
                </div>

                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default SelectedClass;