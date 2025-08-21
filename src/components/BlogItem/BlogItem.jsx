import {useEffect, useState} from "react"                
import {useParams} from 'react-router' 
import Cookies from "js-cookie" 
import Navbar from "../Navbar/Navbar"
const BlogItem=()=> { 
      const [updatedspecificData, setSpecificData]=useState([])
    const {id}=useParams()
   useEffect(()=>{  
    const specificBook= async ()=>{

    
    const url=`https://apis.ccbp.in/book-hub/books/${id}`
    const options={
        headers:{
            Authorization:`Bearer ${Cookies.get("jwtToken")} `
        }
    }  
    const response= await fetch(url, options)
        const data = await response.json() 
        // console.log(data) 
        if(response.ok===true){
           const bookDetails = data.book_details; 

                const specificdata={
                aboutAuthor:bookDetails.about_author,
                aboutBook:bookDetails.about_book,
                authorName:bookDetails.author_name,
                coverPic:bookDetails.cover_pic, 
                id:bookDetails.id,
                rating:bookDetails.rating,
                readStatus:bookDetails.read_status,
                title:bookDetails.title
            }
            setSpecificData(specificdata)
        } 
       
    } 
     specificBook()
   })
  return ( 
    <>
    <Navbar/>
   <div className="bg-[#F8FAFC] pt-10 flex items-center justify-center  font-[Inter]">     
   <div className="w-[75%] bg-[#FFFFFF] p-6">
        <div className="w-[100%] flex justify-center mb-10">
        <div className="flex flex-col  md:flex-row items-center">
        <img className="h-[180px] w-[140px] rounded-lg" src={updatedspecificData.coverPic} /> 
        <div className="md:ml-6 text-center md:text-start"> 
            <h1 className="mb-2 font-bold text-[#334155] text-[20px]">{updatedspecificData.title}</h1> 
            <p className="mb-2 text-[#475569] font-semi-bold">{updatedspecificData.authorName}</p> 
          
            <p className="flex items-center mb-2 text-[#475569] font-semi-bold">Avg Rating  <img style={{height:"18px",display:"inline"}} src="https://t3.ftcdn.net/jpg/01/09/84/42/360_F_109844239_A7MdQSDf4y1H80cfvHZuSa0zKBkZ68S7.jpg" />   {updatedspecificData.rating}</p> 
            <p className="mb-2 text-[#475569] font-semi-bold">Status : <span className="text-[#0284C7]">{updatedspecificData.readStatus}</span> </p> 
          
        </div> 
       
         </div>
        
         </div>
           <hr className="mx-2 bg-[#94A3B8] h-[1px] text-[#94A3B8]"/>
    <h1 className="mt-10 mb-2 font-bold text-[#334155]">About Author</h1>
      <p className="mb-5 text-[#475569] text-[14px]">James Clear is a writer and speaker focused on habits, decision making, and continuous improvement. He is the author of the #1 New York Times bestseller, Atomic Habits. The book has sold over 5 million copies worldwide and has been translated into more than 50 languages.</p> 
<h1 className="mb-2 font-bold text-[#334155]">About Book</h1> 
<p className="text-[#475569] text-[14px]">In this “gripping story of resistance and the triumph of human will” (Senator Elizabeth Warren), activist and subject of the new documentary Not Going Quietly Ady Barkan explores his life with ALS</p>
     

   </div>
   </div>
   </>
  )
} 

export default BlogItem
