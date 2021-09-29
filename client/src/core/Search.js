import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
// import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const { categories, category, search, results, searched } = data;
  const loadCategoris = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategoris();
  }, []);

  const searchData = () => {
    console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then((res) => {
        if (res?.error) {
          console.log(res?.error);
        } else {
          setData({ ...data, results: res, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products.`;
    }
    if (searched && results.length < 1) {
      return `No products found!`;
    }
  };

  const SearchedProducts = (results) => (
    <div>
      <h4 className="mt-4 mb-4 text-center">{searchMessage(searched, results)}</h4>
      <div className="row">
        {results?.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </div>
  );

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()} </div>
      <div className="container-fluid">{SearchedProducts(results)}</div>
    </div>
  );
};

export default Search;
