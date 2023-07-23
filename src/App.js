import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout/Layout";
import Register from "./containers/User/Register";
import Login from "./containers/User/Login";
import Posts from "./containers/Posts/Posts";

function App() {
  const user = useSelector(state => state.users.user);

  return (
    <BrowserRouter>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-post" element={<h3 style={{ textAlign: "center" }}>Add new post page will be here</h3>} />
          <Route path="/posts/:postId" element={<h3 style={{ textAlign: "center" }}>Full post page will be here</h3>} />
          <Route path="*" element={<h3 style={{ textAlign: "center" }}>Page not found</h3>} />
        </Routes>
      </Layout>
    </BrowserRouter >
  );
}

export default App;
