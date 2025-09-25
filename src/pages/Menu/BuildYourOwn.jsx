import { useState } from "react";
import useQuery from "../../api/useQuery";

const BuildYourOwn = () => {
  const { data: nigiris, loading, error } = useQuery("/nigiris", "nigiris");
  const [selection, setSelection] = useState();
  console.log(nigiris);

  return (
    <div>
      <h1>Build Your Own Omakase Box</h1>
      <p>Select at least 14 nigiris to continue</p>
      <></>
    </div>
  );
};

export default BuildYourOwn;
