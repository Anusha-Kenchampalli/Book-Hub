import Navbar from '../Navbar/Navbar.jsx' 
import "react-multi-carousel/lib/styles.css";
import {useNavigate} from "react-router" 
import Carousel from '../Carousel.jsx'
import Cookies from 'js-cookie'     
import {useEffect, useState} from 'react'  
import ClipLoader from "react-spinners/ClipLoader"

const Home=()=> {
const [formattedData, setFormattedData] =useState([])
const [showSubmitError, setSubmitError] = useState(false)
const [isLoading, setisLoading]=useState(true)
const navigate=useNavigate() 

useEffect(()=>{
  const ratedBooks = async ()=>{
       const url="https://apis.ccbp.in/book-hub/top-rated-books"  
       const options={
        headers:{
          Authorization: `Bearer ${Cookies.get('jwtToken')}`
        }
       }
       const response = await fetch(url, options)
       console.log(response)
       const data = await response.json() 
      //  console.log(data)
      if(response.ok==true){
       const formattedData=data.books.map(each=>({
          authorName:each.author_name,
          coverPick:each.cover_pic,
          id:each.id,
          title:each.title
         
       })) 
       console.log(formattedData)
       setFormattedData(formattedData)
       setisLoading(false)
      }
      else{
          setSubmitError(true) 
       
      }
  } 
  ratedBooks()

}, []) 



const tryAgainbtn= async()=>{
   const url="https://apis.ccbp.in/book-hub/top-rated-books"  
       const options={
        headers:{
          Authorization: `Bearer ${Cookies.get('jwtToken')}`
        }
       }
       const response = await fetch(url, options)
       console.log(response)
       const data = await response.json() 
      //  console.log(data)
      if(response.ok===true){
       const formattedData=data.books.map(each=>({
          authorName:each.author_name,
          coverPick:each.cover_pic,
          id:each.id,
          title:each.title
         
       })) 
       console.log(formattedData)
       setFormattedData(formattedData)
      }
      else{
          setSubmitError(true) 
       
      }
}
const findBooksbtn=()=>{
   navigate('/bookshelves')
}


  return (
    <div>
      <Navbar/>
     
      {isLoading?<div className='min-h-screen flex justify-center items-center text-[#56b3f0]'><ClipLoader/></div>
      :
      <div className='bg-[#F8FAFC] min-h-screen md:p-15 pt-10 font-[Inter]'> 
        
      <div className='md:p-8 p-8 pt-0'>
        <h1 className='text-[#1E293B] text-[23px] md:text-[30px] font-[600]'>Find Your Next Favorite Books?</h1> 
        <p className='text-[#475569] text-[18px] md:w-[60%]'>You are in the right place. Tell us what titles or genres you have enjoyed in the past, and we will give you surprisingly insightful recommendations.</p>  

        <button onClick={findBooksbtn}
             className='mt-5 px-4 md:hidden bg-[#0284C7] text-[#F8FAFC] rounded-lg p-2 cursor-pointer'>Find Books</button> 
      </div>

        <div className='w-[100%] mx-0 bg-[#FFFFFF] mb-6  md:p-6 mt-5 rounded-lg'>

           <div className='md:flex items-center md:justify-between md:w-[90%] m-auto sm:text-center'> 
             <div className='text-center'>
            <h1 className='text-[24px] p-4 pb-0 font-[600] text-[#1E293B]'>Top Rated Books</h1> 
            </div>
            <button onClick={findBooksbtn}
             className='hidden px-4 md:block bg-[#0284C7] text-[#F8FAFC] rounded-lg p-2 cursor-pointer'>Find Books</button>
           </div>

            <div className='w-[80%] m-auto mt-10  items-center '>
             {showSubmitError? <div className='w-[100%] flex flex-col justify-center items-center'>
                <img src='https://res.cloudinary.com/doicvqkvb/image/upload/v1753983633/Group_7522_wencdm.png' />
                <p className='my-3 text-[#475569] font-semi-bold'>Something went wrong, Please try again.</p> 
                <button onClick={tryAgainbtn}
                className='bg-[#0284C7] text-[#FFFFFF] rounded-lg p-2'>Try again</button>
              </div>
              : 
              <Carousel  Array={formattedData}/>
          }
          
            </div>
        </div>

      </div> }
      
   
    </div>
  )
} 

export default Home 
