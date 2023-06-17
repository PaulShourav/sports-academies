import { useQuery } from "@tanstack/react-query"

const useAllClasses=()=>{
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch("https://sports-academies-server-five.vercel.app/classes")
            return res.json()
        },
    })
    return [classes,refetch]
}
export default useAllClasses