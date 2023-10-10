import React from "react";
import { useLocation, Link  } from "react-router-dom";

const Show = () => {
  const location = useLocation();
  const searchResult = location.state?.searchResult || null;
  const { state } = location;

  if (!searchResult) {
    return <div>No data available.</div>;
  }

  return (
    <div className="prose lg:prose-xl max-w-3xl container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Collection Details</h1>
      <div>
        <p>Title: {searchResult.data[0].title}</p>
        <p>Location: {searchResult.data[0].location}</p>
        <p>Photographer: {searchResult.data[0].photographer}</p>
        <p>Description: {searchResult.data[0].description || "N/A"}</p>
        <p>Keywords: {searchResult.data[0].keywords || "N/A"}</p>
        <p>Date: {searchResult.data[0].date_created || "N/A"}</p>
      </div>
      <div>
        <h2>Images from the Collection</h2>
        {searchResult.links.map((link) => (
          <img
            key={link.href}
            src={link.href}
            alt={searchResult.data[0].title}
          />
        ))}
      </div>
      <Link to={'/'} state={state}>Back to Search</Link>
    </div>
  );
};

export default Show;
