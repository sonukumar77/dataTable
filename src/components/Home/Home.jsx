import Table from "../Table/Table";
import "./Home.css";

const Home = () => {
  return (
    <div className="table-container">
      <div style={{ overflowX: "auto" }}>
        <Table />
      </div>
    </div>
  );
};

export default Home;
