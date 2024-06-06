import "./AddNote.scss";
import { useState, useRef, useEffect } from "react";
import { Input, ConfigProvider } from "antd";
import { LeftOutlined, CheckOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addnotes, editnote, deletenote } from "../../reducer/noteReducer";
import { useLocation, useNavigate } from "react-router-dom";
const { TextArea } = Input;

const AddNote = () => {
  //获取路由传参
  const { state } = useLocation(); //state.item
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [note, setNote] = useState(() => {
    if (state) {
      return state.item;
    } else {
      return { _id: "", content: "", dates: "" };
    }
  });
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus({
      cursor: "end",
    });
  });
  const changeText = (e) => {
    setNote({ ...note, content: e.target.value });
  };
  const done = () => {
    if (!note._id && note.content != "") {
      dispatch(addnotes(note.content));
    } else if (note._id && note.content != "") {
      dispatch(editnote(note));
    } else if (note._id && note.content == "") {
      dispatch(deletenote(note._id));
    } else {
      console.log("什么也不做");
    }
    navigate("/note");
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: { activeBorderColor: "#fff", activeShadow: "#fff" },
        },
      }}
    >
      <div className="add-note">
        <div className="menu">
          {/* 返回 */}
          <div className="back" onClick={() => done()}>
            <LeftOutlined />
          </div>
          <div className="done" onClick={() => done()}>
            <CheckOutlined />
          </div>
        </div>
        <div className="editor">
          <TextArea
            value={note.content}
            onChange={(e) => changeText(e)}
            placeholder="请输入内容"
            autoSize="true"
            style={{ border: "none" }}
            ref={inputRef}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
export default AddNote;
