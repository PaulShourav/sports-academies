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
    const handleStatus=(status,_id)=>{
        console.log(status,_id);
        fetch(`http://localhost:5000/class?status=${status}&id=${_id}`,{
            method:"PATCH"
        })
        .then(res=>res.json())
        .then(data=>{
            refetch()
            
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
                                <th>Price</th>
                                <th>Seats</th>
                               
                                <th></th>
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
                                {element.price}
                            </td>
                            <td>
                                {element.availableSeat}
                            </td>
                            <td className="space-x-2">
                            <button onClick={()=>handleStatus('pending',element._id)} className="btn btn-xs  btn-primary" disabled={`${element.status=="pending"?'disabled':''}`} >Pending</button>
                            <button onClick={()=>handleStatus('approved',element._id)} className="btn btn-xs  btn-primary" disabled={`${element.status=="approved"?'disabled':''}`} >approved</button>
                            <button onClick={()=>handleStatus('denied',element._id)} className="btn btn-xs  btn-primary" disabled={`${element.status=="denied"?'disabled':''}`} >denied</button>
                            </td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
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