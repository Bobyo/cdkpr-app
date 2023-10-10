import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state?.allSearch) {
            setSearchResults(location.state.allSearch);
          }
    }, [location.state?.allSearch])

    const handleSearch = async () => {
        try {
          if (!query) {
            setError('Please enter a search query.');
            return;
          }

          const encodedQuery = encodeURIComponent(query);

          const queryParams = {
            q: encodedQuery,
            media_type: 'image'
          };

          if (startYear) {
            queryParams.year_start = startYear;
          }
          if (endYear) {
            queryParams.year_end = endYear;
          }

          const response = await axios.get('https://images-api.nasa.gov/search', {
            params: queryParams
          });
    
          setSearchResults(response.data.collection.items);
          setError(null);
        } catch (err) {
          setError('An error occurred while fetching data.');
          setSearchResults([]);
        }
      };

      return (
        <div className='prose lg:prose-xl max-w-3xl container mx-auto'>
          <h1 className='text-3xl font-semibold mb-4'>Search NASA Media Library</h1>
          <div className='flex justify-between'>
            <input
              type="text"
              placeholder="Search query"
              value={query}
              className='p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500'
              onChange={(e) => setQuery(e.target.value)}
            />
            <input
              type="text"
              placeholder="Start year"
              value={startYear}
              className='p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500'
              onChange={(e) => setStartYear(e.target.value)}
            />
            <input
              type="text"
              placeholder="End year"
              value={endYear}
              className='p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500'
              onChange={(e) => setEndYear(e.target.value)}
            />
            
          </div>
          <button className='w-full button bg-blue-600 rounded text-white mt-5' onClick={handleSearch}>Search</button>
          {error && <p>{error}</p>}
          <div>
            {searchResults.map((result) => (
              <div key={result.data[0].nasa_id}>
                <img src={result.links[0].href} alt={result.data[0].title} />
                <p>Title: {result.data[0].title}</p>
                <p>Location: {result.data[0].location}</p>
                <p>Photographer: {result.data[0].photographer}</p>
                <Link to={`/show/${result.data[0].nasa_id}`} state={{ searchResult: result, allSearch: searchResults }}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Search;