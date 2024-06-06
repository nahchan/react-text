import "./Note.scss";
import { Input, List, ConfigProvider, FloatButton } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
const { Search } = Input;
import { pushnotes, deletenote, searchnote } from "../../reducer/noteReducer";

const Note = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size] = useState(20);
  const [loading, setLoading] = useState(false);
  const { notes } = useSelector((state) => state.notes);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
    dispatch(pushnotes({ page, size }));
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  /* 搜索 */
  const onSearch = (value) => {
    if (value == undefined || value == null || value == "") {    
      dispatch(pushnotes({ page: 1, size: 20 }));
    } else {
      dispatch(searchnote(value))
    }
  };
  const editNote = (value) => {
    navigate("/addnote", { state: { item: value } });
  };
  const [activeId, setActiveID] = useState("");
  const delNote = (id) => {
    dispatch(deletenote(id));
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
        },
      }}
    >
      <div className="note">
        <Search
          placeholder="搜索便签"
          onSearch={onSearch}
          className="search"
          size="large"
        />
        <div className="note-list">
          <InfiniteScroll
            style={{ overflowX: "hidden" }}
            dataLength={100}
            next={() => loadMoreData()}
            hasMore={true}
          >
            <List
              grid={{
                gutter: 15,
                column: 2,
              }}
              dataSource={notes}
              loading={loading}
              locale={{ emptyText: "暂无数据" }}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <div
                    className="list-item"
                    onMouseEnter={() => setActiveID(item._id)}
                    onMouseLeave={() => setActiveID("")}
                  >
                    <div onClick={() => editNote(item)}>
                      <div className="text">{item.content}</div>
                      <div className="date">{item.dates}</div>
                    </div>
                    {activeId == item._id && (
                      <div className="delete" onClick={() => delNote(item._id)}>
                        <DeleteOutlined />
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        <Link to="/addnote">
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
export default Note;
