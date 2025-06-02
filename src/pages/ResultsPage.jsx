import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import SearchKeyContext from "../context/searchKeyContext";
import MainCards from "../components/MainCards";
import { useNavigate } from "react-router";
import Search from "../components/Search";

export default function ResultsPage({ type }) {
  const { search } = useContext(SearchContext);
  const { searchKeyword, __ } = useContext(SearchKeyContext);
  const navigate = useNavigate();

  const handleNavigation = (type, id) => {
    navigate(`/details/${type}/${id}`);
  };
  return (
    <div className="container text-light">
      <div className="row">
        <Search type={type} />
      </div>
      <div className="row my-2 justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <h2>The Results for: "{searchKeyword}"</h2>
        </div>
      </div>

      <div className="row d-flex g-4 justify-content-center">
        {search?.map((result) => {
          const type = result.title ? "movie" : "tv";
          const mappedCategory = type === "movie" ? "movies" : "shows";
          return (
            <div className="col-3" key={result.id}>
              <MainCards
                data={result}
                category={mappedCategory}
                onCardClick={() => {
                  handleNavigation(type, result.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
