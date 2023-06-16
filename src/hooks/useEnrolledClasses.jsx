import { useQuery } from "@tanstack/react-query"

const useEnrolledClasses=()=>{
    const { data: enrolledClasses = [], refetch } = useQuery({
        queryKey: ["enrolledClasses"],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/enrolledClass')
            return res.json()
        }
    })
    return [enrolledClasses]
}
export default useEnrolledClasses