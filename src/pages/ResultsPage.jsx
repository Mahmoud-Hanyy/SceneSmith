import React, { useContext, useState } from "react";
import SearchContext from "../context/searchContext";
import SearchKeyContext from "../context/searchKeyContext";
import MainCards from "../components/MainCards";
import { useNavigate } from "react-router";

export default function ResultsPage() {
  const { search, _ } = useContext(SearchContext);
  const { searchKeyword, __ } = useContext(SearchKeyContext);
  const [searchResults, ___] = useState(search);
  console.log(search);
  const navigate = useNavigate()

  const handleNavigation = (type,id) => {
      navigate(`/details/${type}/${id}`);
  };
  return (
    <div className="container text-light">
      <div className="row my-2 justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <h2>The Results for: "{searchKeyword}"</h2>
        </div>
      </div>

      <div className="row">
        {searchResults?.map((result) => (
          <div className="col d-flex justify-content-center g-4" key={result.id}>
            <MainCards data={result} onCardClick={() => {
              const type = result.title ?  "movie":"tv" ;
              handleNavigation(type,result.id)

            }
              
            }

             

             />
          </div>
        ))}
      </div>
    </div>
  );
}
