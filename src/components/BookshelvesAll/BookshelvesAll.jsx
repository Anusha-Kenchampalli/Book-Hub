import Navbar from "../Navbar/Navbar" 
import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'
import AllShelves from "../AllShelves/AllShelves"
import { v4 as uid } from 'uuid'; 
import {Link} from 'react-router'
import ClipLoader from "react-spinners/ClipLoader"
const Bookshelves = [
  {shelf:"ALL",selfButtons:"All", Active:true,id:uid()}, 
  {shelf:"READ",selfButtons:"Read", Active:false,id:uid()}, 
  {shelf:"CURRENTLY_READING", selfButtons:"Currently Reading",Active:false, id:uid()} ,
  {shelf:"WANT_TO_READ",selfButtons:"Want to Read",Active:false,id:uid()} 
]


const BookshelvesAll=()=> {
  const [Bookshelf, setBookshelf]=useState(Bookshelves) 
  const [searchtext, setsearchtext] = useState("")
  const [ActiveSelf, setActiveSelf]=useState("ALL") 
  const [ActiveSelfButton, setActiveSelfButton]=useState("All")
  const [bookData,setBookData]=useState([])
  const [showSubmitError, setshowSubmitError]=useState(false)  
  const [isLoaded, setisLoaded]=useState(false)
  const [isSearched,setisSearched]=useState(false)

      console.log(Bookshelves[0].selfButtons) 
  
  const onSuccess=(array)=>{
          setBookData(array)
          setisLoaded(true)
  }
  const onfailure=()=>{
    setshowSubmitError(true) 
 
  }
  useEffect(()=>{
     const totalBooks=async () =>{

       const url=`https://apis.ccbp.in/book-hub/books?shelf=${ActiveSelf}&search=${searchtext}`  
       const options={
          headers:{
            Authorization:`Bearer ${Cookies.get("jwtToken")}`
          }
       }
       const response=await fetch(url, options) 
       
       const data=await response.json(); 
       console.log(data)
       if(response.ok===true){ 
        const updatedBooksData=data.books.map(eachObject=>({
          authorName:eachObject.author_name,
          coverPic:eachObject.cover_pic,
          id:eachObject.id,
          rating:eachObject.rating,
          readStatus:eachObject.read_status,
          title:eachObject.title
        }))
        onSuccess(updatedBooksData)
       }
       else{
        onfailure()
       } 
     }  
     totalBooks() 
     
  },[ActiveSelf, searchtext])

  const searchInput=(event)=>{
    setsearchtext(event.target.value)
    setisSearched(true)
   
  }
  const selfbtn=(shelf, shelfButton)=>{
    const updatedBookself=Bookshelf.map(eachObject=>{
           if(eachObject.shelf===shelf){
              return {...eachObject,Active:true}
           } 
           else{
            return {...eachObject,Active:false}
           }
          
  })
   setBookshelf(updatedBookself) 
   setActiveSelf(shelf)
   setActiveSelfButton(shelfButton)

  }


  return (
    <div className="min-w-screen">
     <Navbar/>
     <div className="bg-[#F8FAFC]   pt-10 font-[Inter] flex"> 

          <div className=" hidden md:block bg-[#FFFFFF] p-8 pl-4 w-[200px] md:ml-10 lg:ml-26">
            <h1 className="mb-4 text-[#334155] font-bold">Bookshelves </h1> 
            <ul className=" pl-0 "> 

              {Bookshelf.map(eachObject=>(
                
                 <AllShelves shelf={eachObject.shelf} shelfButton={eachObject.selfButtons} statuss={eachObject.Active} selfbtn={selfbtn} key={eachObject.id}/> 
                
              ))}
              
            </ul>
          </div> 

          <div className="m-8  md:ml-10  md:mr-26 ">

            <div className="md:flex   flex-1 justify-between">

              <div className="flex items-center justify-between w-full">
              <h1 className="hidden md:block"> {ActiveSelfButton} Books</h1> 
             
              <div className=" flex items-center  border-2 border-[#CBD5E1] rounded-sm w-[262px]">
              <input 
              type="text" 
              onChange={searchInput}
              className="rounded-sm rounded-r-none  h-9 p-1 pl-3 bg-[#FFFFFF] outline-none " 
              placeholder="Search"/>  

              <img className="w-8 h-9 rounded-r-sm bg-[#edeff1]" src="https://icons.veryicon.com/png/o/miscellaneous/light-e-treasure-3/search-286.png" />
              </div>  
              </div>


              
              <ul className="sm:block md:hidden flex flex-wrap  mt-7 w-full">

                 {Bookshelf.map(eachObject=>(
                
                 <AllShelves shelf={eachObject.shelf} shelfButton={eachObject.selfButtons} statuss={eachObject.Active} selfbtn={selfbtn} key={eachObject.id}/> 
                
              ))}

                
              </ul>

            </div> 


             {isLoaded? 
             <div className="flex justify-between mt-10 flex-wrap"> 
                 
              {(showSubmitError||((bookData.length===0)&&isSearched))?
                 <div className="flex flex-col items-center w-[70vw] h-[78vh] justify-center">
                  <img src="https://res.cloudinary.com/doicvqkvb/image/upload/v1754098468/Asset_1_1_whrgbh.png" /> 
                  <p className="text-[#334155] mt-4">{`Your search for ${searchtext} did not find any matches.`}</p>
                </div>:
                (bookData.map(eachObject=>(
                    <Link to={`/blogitem/${eachObject.id}`}>
                    <div className="flex items-start mb-10 md:w-[530px]">
                       <img className="rounded-sm h-[220px] w-[200px]" src={eachObject.coverPic} />
                       <div className="ml-6">
                        <p>{eachObject.title}</p> 
                         <p>{eachObject.authorName}</p> 
                         <p>Average Rating <img style={{display:"inline",width:"18px"}} src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNDY3YmF0Y2gyLXN0YXItMDAxXzEucG5n.png" /> ${eachObject.rating}</p>
                         <p className="">Status : <span className="text-[#0284C7]">{eachObject.readStatus}</span></p>
                       </div>
                       </div>
                       </Link>
                    )))
                  
                  }
            </div>
            :
            <div className="  flex justify-center items-center w-[70vw]  h-[78vh] border-[#56b3f0] "><ClipLoader/></div>}
          </div>
     </div>
    </div>
  )
}
export default BookshelvesAll 