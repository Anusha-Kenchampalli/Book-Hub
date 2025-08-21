import {useState} from 'react' 
import { useNavigate, Navigate } from 'react-router' 
import Cookies from 'js-cookie'
const Login=()=> { 
  const [username, setusername]=useState("") 
  const [password, setpassword]=useState("") 
  const [showSubmitError, setShowSubmitError]=useState(false)
  const [errormsg, setErrorMsg]=useState("")
  const navigate=useNavigate() 

  const handleInput1=(e)=>{
       setusername(e.target.value)
  }
   const handleInput2=(e)=>{
    setpassword(e.target.value)
  }
  const onsubmitSuccess=(jwtToken)=>{
       Cookies.set("jwtToken",jwtToken, {expires:30})
       navigate('/', {replace:true})
       
  }
  const onSubmitFailure=(errormsg)=>{
      setShowSubmitError(true)
      setErrorMsg(errormsg)
      
  }
  const submitform= async (event)=>{
    event.preventDefault()
    const details={username, password}  
    const url="https://apis.ccbp.in/login" 
    const options={
          method:"POST",
          body:JSON.stringify(details) 

    }
    const response=await fetch(url, options) 
    console.log(response)
    const data=await response.json() 
    console.log(data)
    if (response.ok===true){
         onsubmitSuccess(data.jwt_token)
    }
    else{
      onSubmitFailure(data.error_msg)
    }
  }
  
  if (Cookies.get()!=undefined){
    <Navigate to="/" replace/>  
  }

  return (
    <div className="md:flex bg-[#F8FAFC] "> 
      <img className="md:w-[50vw] md:h-[100vh] hidden md:block" src="https://res.cloudinary.com/doicvqkvb/image/upload/v1753887900/Rectangle_1467_1_uis4fi.png" />  
      <div className='md:hidden flex justify-center p-10 h-[45vh] ]'>
      <img className='md:hidden rounded-full aspect-[1/1]' src='https://res.cloudinary.com/doicvqkvb/image/upload/v1753887900/Rectangle_1467_1_uis4fi.png' /> 
      </div>  
      <div className="w-[95vw] h-[55vh] m-auto md:w-[50vw] flex items-center justify-center ">
      <form onSubmit={submitform}
      className="pt-2 p-8 md:p-8 flex flex-col w-[100%] md:w-[350px] md:bg-[#FFFFFF]"> 
        <div className="flex justify-center">
        <img className="mb-6 w-[150px] " src="https://res.cloudinary.com/doicvqkvb/image/upload/v1753890674/Group_7731_pji07q.png" />
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-[#5A7184] mb-2 font-semi-bold">Username*</label> 
          <input 
          className="border border-[#C3CAD9] rounded-lg p-2 outline-none"  
          onChange={handleInput1}
          type="text"/>
        </div>
        <div className="flex flex-col mb-7">
          <label className="text-[#5A7184] mb-2">password*</label> 
          <input 
          className="border border-[#C3CAD9] rounded-lg p-2 outline-none mb-2"  
          onChange={handleInput2}
          type="password"/>
          {showSubmitError&&<p className='text-[#EF4444]'>{errormsg}</p>}
        </div> 
        <button type="submit"
        className="bg-[#0284C7] text-[#FFFFFF] p-3 rounded-lg">Login</button>
      </form>
      </div>
    </div>
  )
}
export default Login
