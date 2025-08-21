import {useNavigate} from "react-router"
const PageNotFound=()=> { 
  const navigate=useNavigate()
  const homebtn=()=>{
    navigate('/', {replace:true})
  }
  return (
  <div className="flex flex-col items-center justify-center text-center h-screen font-[Inter]"> 
   
      <img src="https://res.cloudinary.com/doicvqkvb/image/upload/v1754117131/Group_7484_hkc3xt.png" /> 
      <h1 className="mt-5 font-bold text-[#334155] text-[20px]">Page Not Found</h1> 
      <p className="mt-3 text-[#475569] text-[16px]">we are sorry, the page you requested could not be found,Please go back to the homepage.</p> 
      <button onClick={homebtn}
       className="bg-[#0284C7] text-[#FFFFFF] p-2 rounded-lg mt-4 ">Go Back to Home</button>
    </div>
    
)
};

export default PageNotFound
