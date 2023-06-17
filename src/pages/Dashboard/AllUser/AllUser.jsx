import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";


const AllUser = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/user')
            return res.json()
        }
    })

    const handleRole = (role, email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Role Updated?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user?role=${role}&email=${email}`, {
                    method: "PATCH",
                })
                    .then(res => res.json())
                    .then(data => {
                        refetch()
                        Swal.fire(
                            'Updated!',
                            'Role  has been Updated.',
                            'success'
                        )

                    })
               
            }
        })

    }
    return (
        <div>
            <SectionTitle heading={"All User"} />
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

                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {users.map((element, index) => <tr key={element._id}>
                                <th>{index + 1}</th>
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
                                    {element.email}<div className={`ms-2 badge ${element.role == "instructor" || element.role == "admin" ? "badge-secondary" : "badge-outline"}`} >{element.role}</div>
                                </td>
                                <td className="space-x-2">
                                    <button onClick={() => handleRole('instructor', element.email)} className="btn btn-xs  btn-primary" disabled={`${element.role == "instructor" ? 'disabled' : ''}`} >Instructor</button>
                                    <button onClick={() => handleRole('admin', element.email)} className="btn btn-xs  btn-primary" disabled={`${element.role == "admin" ? 'disabled' : ''}`}>Admin</button>
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

export default AllUser;