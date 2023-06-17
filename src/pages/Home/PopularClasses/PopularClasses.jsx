import { useNavigate } from "react-router-dom";
import ClassCard from "../../../components/ClassCard";
import SectionTitle from "../../../components/SectionTitle";
import useAllClasses from "../../../hooks/useAllClasses";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import Banner from "../../../components/Banner";


const PopularClasses = () => {
    const { user } = useContext(AuthContext)
    const [classes]=useAllClasses()
    const navigate = useNavigate()
    const highestEnrolled=classes?.sort((a, b) => a.enrolledStudent - b.enrolledStudent).slice(0,6)
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
                    console.log(data);
                })
        } else {
            toast.error("Pls Sign in before selecting the course")
            navigate('/signIn&Up')
        }
    }
    return (
        <>
        
        <div className="mt-24 container mx-auto">
            <SectionTitle heading={"Popular Classes"} />
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-20">
                {
                    highestEnrolled?.map(element => <ClassCard key={element._id} element={element} handleSelectClass={handleSelectClass}></ClassCard>)
                }
            </div>

        </div>
        </>
        
    );
};

export default PopularClasses;