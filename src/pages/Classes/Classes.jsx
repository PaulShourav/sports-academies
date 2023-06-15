import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const Classes = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/approveClasses")
            return res.json()
        },
    })
    const handleSelectClass = (_id) => {
        const newData = { classId: _id, studentEmail: user?.email }
        
        if (user) {
            fetch("http://localhost:5000/selectedClass", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        } else {
            toast.error("Pls Sign in before selecting the course")
            navigate('/signIn&Up')
        }
    }
    return (
        <section className="mt-10 container mx-auto">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {
                    classes?.map(element => <div key={element._id} className="card  bg-base-100 shadow-xl">
                        <figure><img src={element.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {element.className}

                            </h2>
                            <p><span className="font-bold">Instructor:</span>{element.instructorName}</p>
                            <p>Seats:{element.availableSeat}</p>
                            <p>Price:{element.price}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleSelectClass(element._id)} className="btn btn-sm btn-primary">Select Class</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section>

    );
};

export default Classes;