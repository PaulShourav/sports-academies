import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAllClasses from "../../../../hooks/useAllClasses";


const SelectedClass = () => {
    const {user}=useContext(AuthContext)
    const [classes]=useAllClasses()
    const{data:selectedClass=[],refetch}=useQuery({
        queryKey:["selectedClass",user?.email],
        queryFn:async()=>{
            const res=await fetch(`http://localhost:5000/selectedClass?email=${user?.email}`)
            return res.json()
        }
    })
    const myClasses=classes?.filter(o1=>selectedClass?.some(o2=>o2.classId==o1._id))

    const handleDelete=(_id)=>{
        console.log(_id);
        fetch(`http://localhost:5000/selectedClass?classId=${_id}&email=${user?.email}`,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            refetch()
            console.log(data);
        })
    }
   
    return (
        <div>
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
                                        <button onClick={()=>handleDelete(element._id)} className="btn btn-sm btn-primary">Delete</button>
                                    </td>

                                </tr>

                            )}

                        </tbody>


                    </table>
                </div>
            </section>
        </div>
    );
};

export default SelectedClass;