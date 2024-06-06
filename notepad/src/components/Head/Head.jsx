import "./Head.scss";
import { NavLink } from "react-router-dom";
const Head = () => {
  return (
    <div className="head">
      <div className="note">
        <NavLink className="item1" to="/note">
          便签
        </NavLink>
      </div>
      <div className="todo">
        <NavLink className="item2" to="/todo">
          待办
        </NavLink>
      </div>
    </div>
  );
};
export default Head;
