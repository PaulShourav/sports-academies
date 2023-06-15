import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import useAllClasses from '../../../hooks/useAllClasses';
import SectionTitle from '../../../components/SectionTitle';

const AllClasses = () => {
    const { user } = useContext(AuthContext)
    const [id, setId] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [classes,refetch]=useAllClasses()
   
    const handleStatus = (status, _id) => {
        console.log(status, _id);
        fetch(`http://localhost:5000/class?status=${status}&id=${_id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                refetch()

            })
    }
    const handleFeedback = (data) => {
        data.id=id
        fetch("http://localhost:5000/class", {
            method: "PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data);
            })
    }
    return (
        <div>
            <SectionTitle heading={"All Classes"}/>
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
                            {classes.map((element, index) =>
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

                                        <button onClick={() => handleStatus('approved', element._id)} className="btn btn-xs  btn-primary" disabled={`${element.status == "approved" ? 'disabled' : ''}`} >approved</button>
                                        <button onClick={() => handleStatus('denied', element._id)} className="btn btn-xs  btn-primary" disabled={`${element.status == "denied" ? 'disabled' : ''}`} >denied</button>
                                        <button onClick={() =>{window.my_modal_2.showModal(),setId(element._id)}} className="btn btn-xs  btn-primary" >feedback</button>
                                    </td>

                                </tr>

                            )}

                        </tbody>


                    </table>
                </div>
            </section>
            {/* Model */}
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={handleSubmit(handleFeedback)} method="dialog" className="modal-box">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Write Feedback</span>
                        </label>
                        <textarea {...register("feedback", { required: true  })} className="textarea textarea-bordered h-24" placeholder="Feedback"></textarea>
                        {errors.feedback?.type === "required" && <span className="text-red-600">This field is required</span>}
                    </div>
                    <button className='mt-4 btn btn-sm btn-primary'>Send feedback</button>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default AllClasses;