import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const useAdmin=()=>{
    const {user}=useContext(AuthContext)
    console.log(user);
    const { isLoading:isAdminLoading, data:isAdmin } = useQuery({
        queryKey: ['isAdmin',user?.email],
        queryFn: async()=>{
          const res= await fetch(`http://localhost:5000/adminUser?email=${user?.email}`)
          return res.json()
        },
      })
      return [isAdmin,isAdminLoading]
}
export default useAdmin