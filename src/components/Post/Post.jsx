import { useState, useEffect } from "react";
import "./Post.css";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { postDataAction } from "../../redux/action";

const Post = () => {
  const { dataReducer } = useSelector((store) => store);

  const [post, setPost] = useState(dataReducer?.posts);

  const [totalPost, setTotalPost] = useState(0);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState("ASC");

  const handlerSorting = (col) => {
    if (order === "ASC") {
      const sortData = [...post].sort((a, b) => (a[col] > b[col] ? 1 : -1));

      setPost(sortData);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sortData = [...post].sort((a, b) => (a[col] < b[col] ? 1 : -1));

      setPost(sortData);
      setOrder("ASC");
    }
  };

  const dispatch = useDispatch();

  const fetchPostData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/posts?_start=${currentPage * 10}&_limit=10`
      );

      const total = response.headers.get("x-total-count");
      setTotalPost(total);

      const data = await response.json();
      if (data) {
        setPost(data);
        dispatch(postDataAction(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [currentPage]);

  const handlerPagination = async (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <>
      <h1>Posts</h1>
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
            <th>UserId</th>
            <th onClick={() => handlerSorting("title")}>Title</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {dataReducer?.posts
            ?.filter((item) => {
              if (input.toLowerCase() === "") {
                return item;
              } else if (item.title.toLowerCase().includes(input)) {
                return item.title.toLowerCase().includes(input);
              } else if (item.body.toLowerCase().includes(input)) {
                return item.body.toLowerCase().includes(input);
              }
            })
            .map((singlePost, id) => {
              return (
                <tr key={singlePost?.id}>
                  <td>{id + 1}</td>
                  <td>{singlePost?.id}</td>
                  <td>{singlePost?.userId}</td>
                  <td>{singlePost?.title}</td>
                  <td>{singlePost?.body}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination-container">
        {post.length > 0 && (
          <div>
            <span
              className={`pagination-btn ${currentPage < 1 ? "hide" : null}`}
              onClick={() => handlerPagination(currentPage - 1)}
            >
              prev
            </span>
            {[...Array(totalPost / 10)].map((e, idx) => {
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
                currentPage >= totalPost / 10 - 1 ? "hide" : null
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

export default Post;
