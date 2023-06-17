import { useQuery } from "@tanstack/react-query"

const useEnrolledClasses=()=>{
    const { data: enrolledClasses = [], refetch } = useQuery({
        queryKey: ["enrolledClasses"],
        queryFn: async () => {
            const res = await fetch('https://sports-academies-server-five.vercel.app/enrolledClass')
            return res.json()
        }
    })
    return [enrolledClasses]
}
export default useEnrolledClasses