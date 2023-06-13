import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const useInstructor=()=>{
    const {user}=useContext(AuthContext)
    const { isLoading:isInstructorLoading, data:isInstructor } = useQuery({
        queryKey: ['isInstructor',user?.email],
        queryFn: async()=>{
          const res= await fetch(`http://localhost:5000/instructor?email=${user?.email}`)
          return res.json()
        },
      })
      return [isInstructor,isInstructorLoading]
}
export default useInstructor