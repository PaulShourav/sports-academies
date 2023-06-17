import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionTitle from "../../../components/SectionTitle";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useInstructor from "../../../hooks/useInstructor";
import Swal from "sweetalert2";


const MyClasses = () => {
    const { user } = useContext(AuthContext)
    const [isInstructor] = useInstructor()
    const [id,setId]=useState('')
    const { register, handleSubmit,setValue, formState: { errors } } = useForm({
        defaultValues: {
            instructorName: isInstructor?.name,
            email: isInstructor?.email,
            
        }
    });
   

    const { data: myClasses = [], refetch } = useQuery({
        queryKey: ['myClasses', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://sports-academies-server-five.vercel.app/myClasses?email=${user?.email}`)
            return res.json()
        },
    })

    
    const handleUpdate = data => {
        data.id=id
        console.log(data);
        Swal.fire({
            title: 'Are you sure?',
            text: "Update?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch("https://sports-academies-server-five.vercel.app/updateClass",{
                    method:"PATCH",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    refetch()
                    document.getElementById("my_modal_7").checked = false
                    Swal.fire(
                        'Updated!',
                        'Your Class has been Updated.',
                        'success'
                      )
                })
              
            }
          })
       
    }
    // console.log(editData);
    return (
        <div>
            <SectionTitle heading={"My Classes"} />
            <section>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Class name</th>
                                <th>Instrctor Name</th>
                                <th>Price</th>
                                <th>Seats</th>
                                <th>Enrolled Students</th>
                                <th>Satus</th>
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
                                        {element.price}
                                    </td>
                                    <td>
                                        {element.availableSeat}
                                    </td>
                                    <td>
                                        {element.enrolledStudent || "0"}
                                    </td>
                                    <td >
                                        {element.status}
                                    </td>

                                    <td >
                                        <label htmlFor="my_modal_7" onClick={() =>{setId(element._id),setValue("className",element.className),
                                    setValue("availableSeat",element.availableSeat),setValue("price",element.price)}} className="btn btn-sm btn-circle btn-outline btn-secondary"><FaEdit /></label>
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
                <div className="modal-box w-11/12 max-w-5xl">
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <div className="flex gap-4 flex-col md:flex-row">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Class name<span className="text-red-600">*</span></span>
                                </label>
                                <input type="text" {...register("className",{required:true})}  placeholder="class name"  className="input input-bordered input-primary input-sm w-full " />
                                {errors.className?.type === "required" && <span className="text-red-600">This field is required</span>}

                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Image<span className="text-red-600">*</span></span>
                                </label>

                                <input type="file" {...register("image")} className="file-input file-input-bordered file-input-primary file-input-sm w-full " />
                               
                            </div>
                        </div>
                        <div className="flex gap-4 flex-col md:flex-row">
                            <div className="form-control basis-1/4">
                                <label className="label">
                                    <span className="label-text">Instructor name</span>
                                </label>
                                <input type="text" {...register("instructorName")}   className="input input-bordered input-primary input-sm w-full " />
                            </div>
                            <div className="form-control basis-2/5">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" {...register("email")} disabled className="input input-bordered input-primary input-sm w-full " />
                            </div>
                            <div className="form-control basis-1/5">
                                <label className="label">
                                    <span className="label-text">Available seat<span className="text-red-600">*</span></span>
                                </label>
                                <input type="text" {...register("availableSeat", {required:true,  pattern: /^[0-9]*$/ })}  placeholder="Type here"  className="input input-bordered input-primary input-sm w-full " />
                                {errors.availableSeat?.type === "required" && <span className="text-red-600">This field is required</span>}
                                {errors.availableSeat?.type === "pattern" && <span className="text-red-600">This field must be a number formet </span>}
                            </div>
                            <div className="form-control basis-1/5">
                                <label className="label">
                                    <span className="label-text">Price <span className="text-red-600">*</span></span>
                                </label>
                                <input type="text" {...register("price", {required:true, pattern: /^[0-9]+([.][0-9]+)?$/ })}placeholder="Type here" className="input input-bordered input-primary input-sm w-full " />
                                {errors.price?.type === "required" && <span className="text-red-600">This field is required</span>}
                                {errors.price?.type === "pattern" && <span className="text-red-600">This field must be a number formet </span>}
                            </div>
                        </div>
                        <input type="submit" className="mt-4 btn btn-sm btn-primary" value={"Update Class"} />
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default MyClasses;