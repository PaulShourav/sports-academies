import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";


const MyClasses = () => {
    const {user}=useContext(AuthContext)
    const { data:myClasses=[] ,refetch} = useQuery({
        queryKey: ['myClasses',user?.email],
        queryFn: async()=>{
          const res= await fetch(`http://localhost:5000/myClasses?email=${user?.email}`)
          return res.json()
        },
      })
  
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
                               
                                <th>Satus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {myClasses.map((element,index)=>
                            <tr key={element._id}>
                            <th>{index+1}</th>
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
                            <td >
                            {element.status}
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

export default MyClasses;