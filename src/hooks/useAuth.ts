import { useEffect, useState } from "react";
import axios from 'axios';
type User={
    id:string,
    email:string;
}| null;
export function useAuth(){
    const [user,setUser] = useState<User>(null);
    const [isLoading,setisLoading]= useState(true);
    useEffect(()=>{
        let cancelled = false;
        const checkAuth = async()=>{
            try{
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/me`,{withCredentials:true});
                if(!cancelled)
                {
                    setUser(res.data.data || res.data.user || res.data);
                }
            }catch(err)
            {
                if(!cancelled)
                {
                    setUser(null);
                }
            }
            finally{
                if(!cancelled)
                {
                    setisLoading(false)
                }
            }
        };
        checkAuth();
        return ()=>{
            cancelled = true;
        };

    },[]);
    const isAuthenticated = !!user;
    return {user,isAuthenticated,isLoading};
}