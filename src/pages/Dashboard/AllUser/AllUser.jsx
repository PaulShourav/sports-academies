import { useQuery } from "@tanstack/react-query";


const AllUser = () => {
    const {  data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/user')
            return res.json()
        }
    })
    const handleRole=(role,email)=>{
        console.log(role);
        fetch(`http://localhost:5000/user?role=${role}&email=${email}`,{
            method:"PATCH",
            // headers:{
            //     "content-type":"application/json"
            // },
            // body
        })
        .then(res=>res.json())
        .then(data=>{
            refetch()
            console.log(data)
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                               
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {users.map((element,index)=>
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
                                        <div className="font-bold">{element.name}</div>
                                       
                                    </div>
                                </div>
                            </td>
                            
                            <td>
                                {element.email}<div className={`ms-2 badge ${element.role=="instructor" || element.role=="admin"?"badge-secondary":"badge-outline"}`} >{element.role}</div>
                            </td>
                            <td className="space-x-2">
                            <button onClick={()=>handleRole('instructor',element.email)} className="btn btn-xs  btn-primary" disabled={`${element.role=="instructor"?'disabled':''}`} >Instructor</button>
                            <button onClick={()=>handleRole('admin',element.email)} className="btn btn-xs  btn-primary" disabled={`${element.role=="admin"?'disabled':''}`}>Admin</button>
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

export default AllUser;