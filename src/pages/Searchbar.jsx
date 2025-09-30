import { useState } from "react";
import useQuery from "../api/useQuery";

const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  
  //--------------------------------------------- Fetch all data---------------------------
  
  const { data: preMadeBoxes } = useQuery("/pre-made-boxes", "pre-made-boxes");
  const { data: sauces } = useQuery("/sauces", "sauces");
  const { data: extras } = useQuery("/extras", "extras");
  const { data: nigiris } = useQuery("/nigiris", "nigiris");

  //-------------------------------------------- Combine all items--------------------------

  const allItems = [
    ...(preMadeBoxes?.map(box => ({ ...box, type: "Box" })) || []),
    ...(sauces?.map(sauce => ({ ...sauce, type: "Sauce" })) || []),
    ...(extras?.map(extra => ({ ...extra, type: "Extra" })) || []),
    ...(nigiris?.map(nigiri => ({ ...nigiri, type: "Nigiri" })) || [])
  ];

  // --------------------------------------Filter items based on search-text----------------------

  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="search-container">
      <h1>Search Menu</h1>
      
      <input
        type="text"
        placeholder="Search for boxes, sauces, extras, or nigiris..."
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />

      {searchText && (
        <p>Found {filteredItems.length} items</p>
      )}

      <div className="search-results">
        {searchText && filteredItems.map((item) => (
          <div key={`${item.type}-${item.id}`} className="search-item">
            <img src={item.image_url} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="item-type">{item.type}</span>
              <span className="item-price">${item.price}</span>
            </div>
          </div>
        ))}
      </div>

      {searchText && filteredItems.length === 0 && (
        <p>No items found for {searchText}</p>
      )}
    </div>
  );
};

export default Searchbar;