import React, { useContext, useState } from "react";
import SearchContext from "../context/searchContext";
import SearchKeyContext from "../context/searchKeyContext";
import MainCards from "../components/MainCards";

export default function ResultsPage() {
  const { search, _ } = useContext(SearchContext);
  const {searchKeyword, __} = useContext(SearchKeyContext);
  const [searchResults, ___] = useState(search);
  console.log(search);

  return (
    <div>
      <div className="row my-2 justify-content-center">
        <h2 className="col-8 text-center">The Results for: "{searchKeyword}"</h2>
      </div>
      <div className="row my-4">
        {searchResults?.map((result) => (
                <div className="col" key={result.id}>
                  <MainCards data={result} />
                </div>
              ))}
      </div>
    </div>
  );
}
