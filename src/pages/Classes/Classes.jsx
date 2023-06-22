import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ClassCard from "../../components/ClassCard";
import Banner from "../../components/Banner";


const Classes = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch("https://sports-academies-server-five.vercel.app/approveClasses")
            return res.json()
        },
    })
    const handleSelectClass = (_id) => {
        const newData = { classId: _id, studentEmail: user?.email }
        
        if (user) {
            fetch("https://sports-academies-server-five.vercel.app/selectedClass", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newData)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Successfully selected")
                })
        } else {
            toast.error("Pls Sign in before selecting the course")
            navigate('/signIn&Up')
        }
    }
    return (
        <>
         <Banner heading={"Popular Classes"}/>
        <section className="mt-24 container mx-auto">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {
                    classes?.map(element => <ClassCard key={element._id} element={element} handleSelectClass={handleSelectClass}></ClassCard>)
                }
            </div>
        </section>
        </>
       

    );
};

export default Classes;