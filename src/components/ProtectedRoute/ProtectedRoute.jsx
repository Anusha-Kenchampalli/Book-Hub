import Cookies from 'js-cookie'  
import {Navigate} from 'react-router'
const ProtectedRoute=({children})=> {
   if(Cookies.get("jwtToken")===undefined){
     return  <Navigate to="/login" replace/>
   }
   return children
  
}
export default ProtectedRoute
