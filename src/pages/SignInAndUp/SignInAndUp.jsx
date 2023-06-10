import { useState } from "react";
import { useForm } from "react-hook-form";
import SocialSignIn from "../../components/SocialSignIn";
import { useContext } from 'react';
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";



const SignInAndUp = () => {
    const [tabText, setTabTest] = useState('signin')
    const { register, setError, handleSubmit, reset, formState: { errors } } = useForm();
    const { user, createAccount } = useContext(AuthContext)
    // console.log(user);
   
   
    const onSubmitSignIn = data => {
        console.log(data)
    };
    const onSubmitSignUp = data => {
        const formData=new FormData()

        if (data.password !== data.confirm_password) {
            return setError("password", {
                type: "custom",
                message: "Password don't match with confirm password"
            })
        }
        formData.append('image',data.image[0])
        // Store image in imgbb
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting_token}`,{
            method:"POST",
            body:formData
        })
        .then(res=>res.json())
        .then(imgRes=>{
            // Successfully stored image then create account 
            if(imgRes.success){
                createAccount(data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    updateUserProfile(user, data.name, imgRes.data.display_url)
                    // Successfully created account then store user data in database
                    addUser(user, data.name,imgRes.data.display_url)
    
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        })
      
        
        
    };
    const updateUserProfile = (user, name, image) => {
        updateProfile(user, {
            displayName: name, photoURL: image
        }).then(() => {
            // Profile updated!         
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }
    const addUser=(data,name,image)=>{
        console.log(data);
        const newData={name:name,image:image,email:data.email,role:"student"}
        fetch("http://localhost:5000/user",{
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
            }
        })
    }
    // console.log(tabText);
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card md:w-[800px] md:h-[570px] md:bg-gray-100 shadow-xl ">
                <div className="card-body">
                    <div className=" self-center ">
                        <div className="tab-custom">
                            <div onClick={() => { setTabTest('signin'), reset() }} className={`tab-item-custom rounded-s-full ${tabText == 'signin' ? "bg-lime-600" : ""}`}>
                                Sign in
                            </div>
                            <div onClick={() => { setTabTest('signup'), reset() }} className={`tab-item-custom rounded-e-full ${tabText == 'signup' ? "bg-lime-600" : ""}`}>
                                Sign up
                            </div>
                        </div>

                    </div>
                    <div className="main">
                        <div className="mt-6  flex justify-center">

                            {
                                tabText == "signin" ?
                                    <div className="w-full md:w-3/5">

                                        <form onSubmit={handleSubmit(onSubmitSignIn)} >
                                            <p className="font-bold text-2xl text-center uppercase mb-6">Sign In</p>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Email</span>
                                                </label>
                                                <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                                {errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>}
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Password</span>
                                                </label>
                                                <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                                                {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                                            </div>
                                            <p onClick={() => { setTabTest('signup'), reset() }}>Create a account?</p>
                                            <input type="submit" className="mt-4 w-full btn rounded-3xl btn-primary" value={"SIGN IN"} />

                                        </form>
                                        <div className=" text-center mt-3">
                                            <SocialSignIn />
                                        </div>
                                    </div> :
                                    <form onSubmit={handleSubmit(onSubmitSignUp)} className="w-full md:w-3/4">
                                        <p className="font-bold text-2xl text-center uppercase mb-6">Sign up</p>
                                        <div className="flex flex-col md:flex-row gap-5">
                                            <div className="form-control md:w-2/5">
                                                <label className="label">
                                                    <span className="label-text">Name</span>
                                                </label>
                                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                                {errors.name?.type === 'required' && <p className="text-red-500">Name is required</p>}
                                            </div>
                                            <div className="form-control md:w-3/5">
                                                <label className="label">
                                                    <span className="label-text">Image</span>
                                                </label>

                                                <input type="file" {...register("image", { required: true })} placeholder="Image" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                                                {errors.image?.type === 'required' && <p className="text-red-500">Image is required</p>}
                                            </div>

                                        </div>


                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                            {errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>}
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-5">
                                            <div className="form-control  md:w-1/2">
                                                <label className="label">
                                                    <span className="label-text">Password</span>
                                                </label>
                                                <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[!@#$%^&*])(?=.*[A-Z])/ })} placeholder="password" className="input input-bordered" />
                                                {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                                                {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be greater than 6 </p>}
                                                {errors.password?.type === 'pattern' && <p className="text-red-500">Password must be one special character,one capital character.   </p>}

                                            </div>
                                            <div className="form-control md:w-1/2">
                                                <label className="label">
                                                    <span className="label-text">Confirm Password</span>
                                                </label>
                                                <input type="password" {...register("confirm_password", { required: true })} placeholder="confirm password" className="input input-bordered" />
                                                {errors.confirm_password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                                            </div>
                                        </div>
                                        {errors?.password && <p className="text-red-500">{errors.password?.message}</p>}
                                        <input type="submit" className="mt-4 w-full btn rounded-3xl btn-primary" value={"SIGN UP"} />
                                    </form>
                            }



                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignInAndUp;