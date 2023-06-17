import { useForm } from "react-hook-form";
import useInstructor from "../../../hooks/useInstructor";
import SectionTitle from "../../../components/SectionTitle";
import { toast } from "react-hot-toast";


const AddClass = () => {
    const [isInstructor]=useInstructor()
    const { register, handleSubmit,reset, formState: { errors } } = useForm({
        defaultValues:{
            instructorName:isInstructor.name,
            email:isInstructor.email
        }
    });

   
    const onSubmit = data => { 
        const formData=new FormData()
        formData.append('image',data.image[0])
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting_token}`,{
            method:"POST",
            body:formData
        })
        .then(res=>res.json())
        .then(imgRes=>{
            console.log(imgRes);
            if (imgRes.success) {
                addClass(data,imgRes.data.display_url)
            }
        })
        
     };
    const addClass=(data,image)=>{
        const newData={"className":data.className,"image":image,"instructorName":data.instructorName,"email":data.email,"availableSeat":parseFloat(data.availableSeat),"price":parseFloat(data.price),"status":"pending"}
        fetch("https://sports-academies-server-five.vercel.app/class",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newData)
        })
        .then(res=>res.json())
        .then(data=>{
            
            if (data.insertedId) {
                reset()
                toast.success("Successfully Added.")
            }
        })
     }
    return (
        <>
        <SectionTitle heading={"Add Classes"}/>
        <div className="self-center max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class name<span className="text-red-600">*</span></span>
                        </label>
                        <input type="text" {...register("className", { required: true  })} placeholder="class name" className="input input-bordered input-primary input-sm w-full " />
                        {errors.className?.type === "required" && <span className="text-red-600">This field is required</span>}
                        
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image<span className="text-red-600">*</span></span>
                        </label>

                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered file-input-primary file-input-sm w-full " />
                        {errors.image?.type === "required" && <span className="text-red-600">This field is required</span>}
                    </div>
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="form-control basis-1/4">
                        <label className="label">
                            <span className="label-text">Instructor name</span>
                        </label>
                        <input type="text" {...register("instructorName")} defaultValue={isInstructor.name}  disabled  className="input input-bordered input-primary input-sm w-full " />
                    </div>
                    <div className="form-control basis-2/5">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email")}  defaultValue={isInstructor?.email} disabled  className="input input-bordered input-primary input-sm w-full " />
                    </div>
                    <div className="form-control basis-1/5">
                        <label className="label">
                            <span className="label-text">Available seat<span className="text-red-600">*</span></span>
                        </label>
                        <input type="text" {...register("availableSeat", { required: true ,pattern:/^[0-9]*$/})} placeholder="Type here" className="input input-bordered input-primary input-sm w-full " />
                        {errors.availableSeat?.type === "required" && <span className="text-red-600">This field is required</span>}
                        {errors.availableSeat?.type === "pattern" && <span className="text-red-600">This field must be a number formet </span>}
                    </div>
                    <div className="form-control basis-1/5">
                        <label className="label">
                            <span className="label-text">Price <span className="text-red-600">*</span></span>
                        </label>
                        <input type="text" {...register("price", { required: true ,pattern:/^[0-9]+([.][0-9]+)?$/})} placeholder="Type here" className="input input-bordered input-primary input-sm w-full " />
                        {errors.price?.type === "required" && <span className="text-red-600">This field is required</span>}
                        {errors.price?.type === "pattern" && <span className="text-red-600">This field must be a number formet </span>}
                    </div>
                </div>
                <input type="submit" className="mt-4 btn btn-sm btn-primary" value={"Add Class"} />
            </form>
        </div>
        </>
        
    );
};

export default AddClass;