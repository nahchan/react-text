import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Note from "./views/Note/Note";
import Todo from "./views/Todo/Todo";
import AddNote from "./views/AddNote/AddNote";
import AddTodo from "./views/AddTodo/AddTodo";
import { store } from "./store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/note", element: <Note /> },
      {
        path: "/todo",
        element: <Todo />,
      },
    ],
  },
  {
    path: "/addnote",
    element: <AddNote />,
  },
  {
    path: "/addtodo",
    element: <AddTodo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
