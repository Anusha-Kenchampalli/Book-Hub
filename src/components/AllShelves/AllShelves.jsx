 const AllShelves=(props)=> { 
   const {shelfButton, shelf,statuss,selfbtn}=props   
   
     const listItem=()=>{
        selfbtn(shelf, shelfButton) 
     } 
     const color=statuss?"text-[#0284C7]":"text-[#475569]" 
     const backgroundColor=statuss?"bg-[#0284C7] text-[#FFFFFF]":"bg-[#FFFFFF] border-[#0284C7] text-[#0284C7]" 
  return (
    <>
    <li  onClick={listItem}
    className={`${color} mb-2  text-[14px] hidden md:block cursor-pointer`}>{shelfButton}</li>  

    <li onClick={listItem} className={`${backgroundColor} mr-2 border p-1 px-4 mb-2 rounded-[200px] md:hidden cursor-pointer `}>
     {shelfButton}
    </li>
    </>
  )
}

export default AllShelves
