import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axiosInstance from "../apis/config";
import MainCards from "./MainCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MoviesRecommendation.css"; 
import { useNavigate } from "react-router";


const NextArrow = ({ onClick }) => (
  <div className="slick-next custom-arrow" onClick={onClick}>

  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-prev custom-arrow" onClick={onClick}>
  </div>
);

function MoviesRecommendation({ movieId }) {
  const [movies, setMovies] = useState([]);
  const navigate =useNavigate()
  const onMovieClick=(selectedMovieId)=>{
  navigate(`/details/movie/${selectedMovieId}`)
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
      const response = await axiosInstance.get(`/movie/${movieId}/recommendations`);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  useEffect(() => {

    fetchRecommendations();
  }, [movieId]);


  if (!movies.length) {
    return (
      <div className="text-center py-3">
        <strong>No recommendations</strong>
      </div>
    );
  }

if(movies){
  return (
 <>
    <div className="container  mt-5 p-5 " >
      <h2 className="text-white fw-bold">
        Recommended Movies
      </h2>
      <hr/>

      
        <div className="mb-5 p-3">
   <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} >
              <MainCards data={movie} onCardClick={() => { onMovieClick(movie.id)}} />
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


export default MoviesRecommendation;