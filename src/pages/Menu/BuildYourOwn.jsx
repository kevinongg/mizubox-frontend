import { useState } from "react";
import useQuery from "../../api/useQuery";

const BuildYourOwn = () => {
  const { data: nigiris, loading, error } = useQuery("/nigiris", "nigiris");
  const [selection, setSelection] = useState();
  console.log(nigiris);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load nigiris</p>;

  return (
    <div>
      <h1>Build Your Own Omakase Box</h1>
      <p>Select at least 14 nigiris to continue</p>
      <>
        {nigiris?.map((nigiri) => {
          return <li key={nigiri.id}></li>;
        })}
      </>
    </div>
  );
};

export default BuildYourOwn;
