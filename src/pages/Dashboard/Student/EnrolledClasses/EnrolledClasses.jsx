import { useQuery } from "@tanstack/react-query";


const EnrolledClasses = () => {
    const { data: enrolledClasses=[], refetch } = useQuery({
        queryKey: ["enrolledClasses"],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/enrolledClass')
            return res.json()
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default EnrolledClasses;