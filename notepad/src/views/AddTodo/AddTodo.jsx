import "./AddTodo.scss";
import { Input, ConfigProvider } from "antd";
import { LeftOutlined, CheckOutlined } from "@ant-design/icons";
import { Component, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addtodo, updatetodo, deletetodo } from "../../reducer/todoReducer.js";
const { TextArea } = Input;
import { useLocation, useNavigate } from "react-router-dom";
 
const AddTodo = () => {
  const { state } = useLocation(); //state.item
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const inputRef = useRef(null);
   useEffect(()=>{
    inputRef.current.focus({
      cursor: 'end',
    });
   })
  const [todo, setTodo] = useState(() => {
    if (state) {
      return state.todo;
    } else {
      return { content: "", isdone: false };
    }
  });
  const changeText = (e) => {
    //console.log(e.target.value, "22");
    setTodo({ ...todo, content: e.target.value });
  };
  const done = () => {
    if (!todo._id && todo.content != "") {
      dispatch(addtodo(todo));
    } else if (todo._id && todo.content != "") {
      dispatch(updatetodo(todo));
    } else if (todo._id && todo.content == "") {
      dispatch(deletetodo(todo._id));
    } else {
      console.log("什么也不做");
    }
    navigate("/todo");
  };


  return (
    <ConfigProvider
      theme={{
        components: {
          Input: { activeBorderColor: "#fff", activeShadow: "#fff" },
        },
      }}
    >
      <div className="add-todo">
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
            value={todo.content}
            placeholder="请输入内容"
            onChange={(e) => changeText(e)}
            autoSize="true"
            style={{ border: "none" }}
           
            ref={inputRef}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
export default AddTodo;
