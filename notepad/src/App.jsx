import { Outlet } from "react-router-dom";
import Head from "./components/Head/Head";
import "./index.scss";
function App() {
  return (
    <div className="app">
      <Head></Head>
      <Outlet />
    </div>
  );
}

export default App;
