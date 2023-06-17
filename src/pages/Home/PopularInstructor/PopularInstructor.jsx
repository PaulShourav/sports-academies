import Banner from "../../../components/Banner";
import InstructorCard from "../../../components/InstructorCard";
import SectionTitle from "../../../components/SectionTitle";
import useAllInstructor from "../../../hooks/useAllInstructor";


const PopularInstructor = () => {
    const [instructors]=useAllInstructor()
    return (
        <>
        <Banner heading={"Popular Instructor"}/>
         <div className="mt-24  container mx-auto">
            <SectionTitle heading={"Popular Instructor"}/>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {
                    instructors?.slice(0,6).map(element =><InstructorCard key={element} element={element}></InstructorCard> )
                }
            </div>
        </div>
        </>
       
    );
};

export default PopularInstructor;