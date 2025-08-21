import {Link} from "react-router" 
import {useLocation, useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import {useState} from 'react'
import { Menu, X } from "lucide-react";
const Navbar=()=>{
    
      const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const location=useLocation() 
  const navigate = useNavigate()

  const logoutbtn=()=>{
     Cookies.remove("jwtToken")
     navigate("/login", {replace:true})
  }
  const homeIcon=()=>{
      navigate('/') 
  }
  return (
    <div className="bg-[#FFFFFF] w-[100vw]">
    <div className="flex justify-between  w-[87%] m-auto p-4 items-center  font-[Inter]">
      <img onClick={homeIcon} className="h-[40px] cursor-pointer" src="https://res.cloudinary.com/doicvqkvb/image/upload/v1753890674/Group_7731_pji07q.png" /> 
      <div className="flex">
            <ul className="hidden md:flex md:items-center"> 
                <Link to='/'>
                <li  className={location.pathname==="/" ? "text-[#0284C7] mr-4 cursor-pointer" : "text-[#64748B] mr-4 cursor-pointer"}>Home</li> 
              </Link>

              <Link to="/bookshelves">
                <li  className={location.pathname==="/bookshelves" ? "text-[#0284C7] mr-4 cursor-pointer" : "text-[#64748B] mr-4 cursor-pointer"}>Bookshelves</li>
              </Link>

                <li className="mr-4 cursor-pointer">
                    <button  onClick={logoutbtn}
                    className="bg-[#0284C7]  cursor-pointer text-[#F8FAFC] px-3 py-2 text-center  rounded-lg">Logout</button>
                </li>
            </ul> 

             <div className="md:hidden" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>

             {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-end pr-10 space-y-4 py-4 md:hidden shadow-md z-10">
             <Link to='/'>
                <li  className={location.pathname==="/" ? "text-[#0284C7] mr-4 cursor-pointer" : "text-[#64748B] mr-4 cursor-pointer"}>Home</li> 
              </Link>

              <Link to="bookshelves">
                <li  className={location.pathname==="/bookshelves" ? "text-[#0284C7] mr-4 cursor-pointer" : "text-[#64748B] mr-4 cursor-pointer"}>Bookshelves</li>
              </Link>

                <li className="mr-4 cursor-pointer">
                    <button  onClick={logoutbtn}
                    className="bg-[#0284C7]  cursor-pointer text-[#F8FAFC] px-3 py-2 text-center  rounded-lg">Logout</button>
                </li>
        </ul>
                )}
      </div>
    </div>
    </div>
  )
}
export default Navbar

