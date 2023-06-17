import { useQuery } from "@tanstack/react-query"

const useAllInstructor=()=>{
    const {data:instructors=[] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async()=>{
          const res= await fetch("https://sports-academies-server-five.vercel.app/allInstructor")
          return res.json()
        },
      })
      return [instructors]
}
export default useAllInstructor