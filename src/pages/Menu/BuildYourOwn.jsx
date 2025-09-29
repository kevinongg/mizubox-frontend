// import { useState } from "react";
import useQuery from "../../api/useQuery";
import React, { useState } from 'react';

const BuildYourOwn = () => {
  const { data: nigiris, loading, error } = useQuery("/nigiris", "nigiris");
  // const [selection, setSelection] = useState();
  console.log(nigiris);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load nigiris</p>;

  return (
    <div>
      <h1>Build Your Own Omakase Box</h1>
      <p>Select at least 14 nigiris to continue</p>

<div>
  <h1>Build Your Own</h1>
  <p>Select nigiris</p>
  
  <div >
    {nigiris?.map((nigiri) => (
      <div key={nigiri.id} >
        <img src={nigiri.image_url} alt={nigiri.name} />
        <div>
          <h3>{nigiri.name}</h3>
          <p>${nigiri.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>);
};

export default BuildYourOwn;
