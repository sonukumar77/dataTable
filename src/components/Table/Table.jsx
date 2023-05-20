import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import { useNavigate } from "react-router-dom";
import "./Table.css";

const Table = () => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      const data = await response.json();
      if (data) {
        setUser(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlerPagination = (pageNo) => {
    if (pageNo >= 1 && pageNo !== page && pageNo <= user.length / 2) {
      setPage(pageNo);
    }
  };

  const handleRoute = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      <h1>Users</h1>
      <table id="customers">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {user?.slice(page * 2 - 2, page * 2)?.map((singleUser, id) => {
            return (
              <tr
                key={singleUser?.id}
                onClick={() => handleRoute(singleUser.id)}
              >
                <td>{singleUser?.id}</td>
                <td>{singleUser?.name}</td>
                <td>
                  {singleUser?.address?.street},{singleUser?.address?.suite},
                  {singleUser?.address?.city},{singleUser?.address?.zipcode}
                </td>
                <td>{singleUser?.email}</td>
                <td>{singleUser?.name}</td>
                <td>{singleUser?.phone}</td>
                <td>{singleUser?.website}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-container">
        {user.length > 0 && (
          <div>
            <span
              className={`pagination-btn ${page <= 1 ? "hide" : null}`}
              onClick={() => handlerPagination(page - 1)}
            >
              prev
            </span>
            {[...Array(user.length / 2)].map((e, idx) => {
              return (
                <span
                  key={idx}
                  className={`pagination ${
                    page === idx + 1 ? "selected-pagination" : null
                  }`}
                  onClick={() => handlerPagination(idx + 1)}
                >
                  {idx + 1}
                </span>
              );
            })}

            <span
              className={`pagination-btn ${
                page >= user.length / 2 ? "hide" : null
              }`}
              onClick={() => handlerPagination(page + 1)}
            >
              next
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
