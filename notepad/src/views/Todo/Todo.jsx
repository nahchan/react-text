import "./Todo.scss";
import { Input, List, ConfigProvider, FloatButton, Checkbox } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletetodo,
  pushtodos,
  updatetodo,
  searchtodo,
} from "../../reducer/todoReducer";
const { Search } = Input;
import InfiniteScroll from "react-infinite-scroll-component";
const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(20);
  const [loading, setLoading] = useState(false);
  const { todos } = useSelector((state) => state.todos);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
    dispatch(pushtodos({ page, size }));
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  const onSearch = (value) => {
   // console.log(value, "value");
    if (value == undefined || value == null || value == "") {
      dispatch(pushtodos({ page: 1, size: 20 }));
    } else {
      dispatch(searchtodo(value));
    }
  };
  const changeChecked = (item) => {
    const todo = {
      _id: item._id,
      isdone: !item.isdone,
      content: item.content,
    };
    //console.log("item", todo);
    dispatch(updatetodo(todo));
  };
  const editorTodo = (value) => {
    navigate("/addtodo", {
      state: {
        todo: value,
      },
    });
  };
  const [activeId, setActiveID] = useState("");
  const delTodo = (id) => {
    dispatch(deletetodo(id));
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#fff",
            activeShadow: "#fff",
            hoverBorderColor: "#ffF",
          },
          Checkbox: {
            colorPrimary: "#ebebeb",
          },
        },
      }}
    >
      <div className="todo">
        <Search
          placeholder="搜索待办"
          onSearch={onSearch}
          className="search"
          size="large"
        />
        <div className="todo-list">
          <InfiniteScroll
            style={{ overflowX: "hidden" }}
            dataLength={50}
            next={() => loadMoreData()}
            hasMore={true}
            loading={loading}
          >
            <List
              dataSource={todos}
              split={false}
              grid={{
                column: 1,
              }}
              loading={loading}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <div
                    className={
                      item.isdone ? "todo-item doned-item" : "todo-item"
                    }
                    onMouseEnter={() => setActiveID(item._id)}
                    onMouseLeave={() => setActiveID("")}
                  >
                    <div className="is-done">
                      <Checkbox
                        checked={item.isdone}
                        onChange={() => changeChecked(item)}
                      ></Checkbox>
                    </div>
                    <div className="content" onClick={() => editorTodo(item)}>
                      {item.content}
                    </div>
                    {activeId == item._id && (
                      <div className="delete" onClick={() => delTodo(item._id)}>
                        <DeleteOutlined />
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        <Link to="/addTodo">
          <FloatButton
            shape="circle"
            type="primary"
            style={{ right: 30, bottom: 30 }}
            icon={<PlusOutlined />}
          />
        </Link>
      </div>
    </ConfigProvider>
  );
};
export default Todo;
