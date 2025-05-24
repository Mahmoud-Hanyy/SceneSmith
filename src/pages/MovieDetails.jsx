import MovieDetailsCard from '../components/MovieDetailsCard'
import axiosInstance from '../apis/config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState(null);
    const params = useParams();

    const getMovieDetails = async () => {
        try {
    const movieDetailsResponse = await axiosInstance.get(`/movie/${params.id}`);
            setMovieDetails(movieDetailsResponse.data)
            console.log(movieDetails);
        } catch (error) {
            console.error("Failed to fetch movie details", error);
        }
    }
    useEffect(() => {
        getMovieDetails();
    }, [params.id])

    if (movieDetails) {
        return (
            <>
                <MovieDetailsCard movie={movieDetails} />

            </>
        );
    }else{
        return(
            <>
            <p className='text-white'>Loading</p>
            </>
        );
    }


}