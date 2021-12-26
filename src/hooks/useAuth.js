import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider";

const useAuth = () => {
    const auth =  useContext(AuthContext);
    // console.log(auth.allContext)
    return auth.allContext;
}

export default useAuth;