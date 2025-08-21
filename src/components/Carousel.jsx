import Slider from "react-slick" 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const Carousel=(props)=>{
  const {Array}=props
    const settings ={
       dots:false,
      autoplay:true,
       speed:500,
       infinite:true,
       slidesToShow:4,
       slidesToScroll:3,
       arrows:true,
       responsive: [
             {
               breakpoint: 1024,
               settings: {
                 slidesToShow: 3,
                 slidesToScroll: 3,
                 infinite: true,
               
               }
             }, 

             
          

             {
               breakpoint: 822, 

               settings: {
                 slidesToShow: 2,
                 slidesToScroll: 2,
                 initialSlide: 2
               }
             },
             {
               breakpoint: 480,
               settings: {
                 slidesToShow: 1,
                 slidesToScroll: 1
             }
             }
           ]
    
    }
  return (
    <Slider {...settings} className="p-0 mx-0">
      {Array.map(eachObject=>(
                      <div key={eachObject.id} className='text-center flex flex-col items-center m-0'> 
                      <div className="flex justify-center">
             <img className=' h-[300px] mb-3 mr-2'
                  src={eachObject.coverPick} alt={`slide${eachObject.id}`} /> </div>
                  <p className='text-[#334155] text-[15px] font-bold mb-1 ml-0'>{eachObject.title}</p>
                  <p className='text-[15px] text-[#475569] ml-0'>{eachObject.authorName}</p>
                </div>
      ))}
  
    </Slider>
  )
} 

export default  Carousel                                                                        