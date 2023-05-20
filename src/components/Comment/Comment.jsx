import { useState, useEffect } from "react";
import "./Comment.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { commentDataAction } from "../../redux/action";

const Comment = () => {
  const { dataReducer } = useSelector((store) => store);

  const [comment, setComment] = useState(dataReducer?.comments);

  const [totalComment, setTotalComment] = useState(0);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState("ASC");

  const handlerSorting = (col) => {
    if (order === "ASC") {
      const sortData = [...comment].sort((a, b) => (a[col] > b[col] ? 1 : -1));

      setComment(sortData);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sortData = [...comment].sort((a, b) => (a[col] < b[col] ? 1 : -1));

      setComment(sortData);
      setOrder("ASC");
    }
  };

  const dispatch = useDispatch();

  const fetchPostData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/comments?_start=${currentPage * 10}&_limit=10`
      );

      const total = response.headers.get("x-total-count");
      setTotalComment(total);

      const data = await response.json();
      if (data) {
        setComment(data);
        dispatch(commentDataAction(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [currentPage]);

  const handlerPagination = async (pageNo) => {
    console.log("pageNo", pageNo);
    setCurrentPage(pageNo);
  };

  console.log(comment, input);

  console.log("postReducer", dataReducer);

  return (
    <>
      <h1>Comments</h1>
      <div
        className="search-container"
        onKeyUp={(e) => setInput(e.target.value)}
      >
        <input type="text" />
      </div>
      <table id="customers">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>PostId</th>
            <th>PostId</th>
            <th onClick={() => handlerSorting("title")}>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {dataReducer?.comments
            ?.filter((item) => {
              if (input.toLowerCase() === "") {
                return item;
              } else if (item.name.toLowerCase().includes(input)) {
                return item.name.toLowerCase().includes(input);
              } else if (item.email.toLowerCase().includes(input)) {
                return item.email.toLowerCase().includes(input);
              } else if (item.body.toLowerCase().includes(input)) {
                return item.body.toLowerCase().includes(input);
              }
            })
            .map((singlePost, id) => {
              return (
                <tr key={singlePost?.id}>
                  <td>{id + 1}</td>
                  <td>{singlePost?.id}</td>
                  <td>{singlePost?.postId}</td>
                  <td>{singlePost?.name}</td>
                  <td>{singlePost?.email}</td>
                  <td>{singlePost?.body}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination-container">
        {comment.length > 0 && (
          <div>
            <span
              className={`pagination-btn ${currentPage < 1 ? "hide" : null}`}
              onClick={() => handlerPagination(currentPage - 1)}
            >
              prev
            </span>
            {[...Array(totalComment / 10)].map((e, idx) => {
              return (
                <span
                  key={idx}
                  className={`pagination ${
                    currentPage === idx ? "selected-pagination" : null
                  }`}
                  onClick={() => handlerPagination(idx)}
                >
                  {idx + 1}
                </span>
              );
            })}

            <span
              className={`pagination-btn ${
                currentPage >= totalComment / 10 - 1 ? "hide" : null
              }`}
              onClick={() => handlerPagination(currentPage + 1)}
            >
              next
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
