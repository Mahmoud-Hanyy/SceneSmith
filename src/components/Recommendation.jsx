import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axiosInstance from "../apis/config";
import MainCards from "./MainCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Recommendation.css"; 
import { useNavigate } from "react-router";


const NextArrow = ({ onClick }) => (
  <div className="slick-next custom-arrow" onClick={onClick}>

  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-prev custom-arrow" onClick={onClick}>
  </div>
);

function Recommendation({ type,id }) {
  const [shows, setMovies] = useState([]);
  const navigate =useNavigate()
  const onShowClick=(selectedShowId)=>{
  navigate(`/details/${type}/${selectedShowId}`)
      window.scrollTo({ top: 0, behavior: 'smooth' }); 

  }


  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    dots: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, centerPadding: "50px" } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "40px" } },

    ]
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axiosInstance.get(`/${type}/${id}/recommendations`);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  useEffect(() => {

    fetchRecommendations();
  }, [type,id]);


  if (!shows.length) {
    return (
      <div className="text-center py-3">
        <strong>No recommendations</strong>
      </div>
    );
  }

if(shows){
  return (
 <>
    <div className="container  mt-5 p-5 " >
      <h2 className="text-white fw-bold">
        {type==="tv" &&      
          "Recommended Tv Shows"
 }
        {type==="movie" &&      
          "Recommended Movies"
 }
      </h2>
      <hr/>

      
        <div className="mb-5 p-3">
   <Slider {...settings}>
          {shows.map((show) => (
            <div key={show.id} >
              <MainCards data={show} onCardClick={() => { onShowClick(show.id)}} />
            </div>
          ))}
        </Slider>
        </div>
     

      
    </div>
    <hr/>
    </>
  );
}
}


export default Recommendation;