import React, { useContext, useState } from "react";
import SearchContext from "../context/searchContext";
import SearchKeyContext from "../context/searchKeyContext";
import MainCards from "../components/MainCards";

export default function ResultsPage() {
  const { search, _ } = useContext(SearchContext);
  const { searchKeyword, __ } = useContext(SearchKeyContext);
  const [searchResults, ___] = useState(search);
  console.log(search);

  return (
    <div className="container text-light">
      <div className="row my-2 justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <h2>The Results for: "{searchKeyword}"</h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 my-4">
        {searchResults?.map((result) => (
          <div className="col" key={result.id}>
            <MainCards data={result} />
          </div>
        ))}
      </div>
    </div>
  );
}
