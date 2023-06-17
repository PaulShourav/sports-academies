import { useQuery } from "@tanstack/react-query";
import InstructorCard from "../../components/InstructorCard";
import useAllInstructor from "../../hooks/useAllInstructor";
import Banner from "../../components/Banner";


const Instructor = () => {
    const [instructors] = useAllInstructor()
    return (
        <>
            <Banner heading={"Popular Instructor"} />
            <section className="mt-10 container mx-auto">
                <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-20">
                    {
                        instructors?.map(element => <InstructorCard key={element} element={element}></InstructorCard>)
                    }
                </div>
            </section>
        </>

    );
};

export default Instructor;