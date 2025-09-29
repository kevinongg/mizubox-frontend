import useQuery from "../../api/useQuery";

const BuildYourOwn = () => {
  const { data: nigiris, loading, error } = useQuery("/nigiris", "nigiris");
  console.log(nigiris);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load nigiris</p>;

  return (
    <div className="build-container">
      <h1>Build Your Own</h1>
      <p>Select nigiris</p>
      
      <div className="nigiri-grid">
        {nigiris?.map((nigiri) => (
          <div key={nigiri.id} className="nigiri-item">
            <img src={nigiri.image_url} alt={nigiri.name} />
            <div className="nigiri-info">
              <h3>{nigiri.name}</h3>
              <p>${nigiri.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildYourOwn;