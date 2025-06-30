import HzScroll from "../../components/ui/HzScroll"

let cardsInfo = [
  {
    id : 1 ,
    imgSrc : "/services/images/audiovisual.jpg" ,
    title   : "audiovisual" ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [10, 50, 0, 10] ,
      [15 , -5, -25, 20] ,
    ],
  },
  {
    id : 2 ,
    imgSrc : "/services/images/creativity.webp" ,
    title   : "creativity " ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0, 45, -10, 15] ,
      [15 ,-5 ,-10, 20] ,
    ],
  },
  {
    id : 3 ,
    imgSrc : "/services/images/digital-marketing.jpg" ,
    title   : "digital marketing " ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0,  52 , -10 , 5] ,
      [15 , -5 , -10 , 20] ,
    ],
  },
   {
    id : 4 ,
    imgSrc : "/services/images/graphic-design.jpg" ,
    title   : "graphic design " ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0,  52 , -10 , 5] ,
      [15 , -5 , -10 , 20] ,
    ],
  },
     {
    id : 5 ,
    imgSrc : "/services/images/ux.jpg",
    title   : "user experience" ,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, qui? " ,
    transforms : [
      [0,  52 , -10 , 5] ,
      [15 , -5 , -10 , 20] ,
    ],
  },
]

const NotFound = () => {
    return ( 
        <>
           <HzScroll fluidText={"page not found !"} cardsInfo={cardsInfo}
           additionalClasses="opacity-0 pe-none user-select-none"
           />
        </>
     );
}
 
export default NotFound;