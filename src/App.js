import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

function App() {
  const user = null;

  return (
    <BrowserRouter>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<h3 style={{ textAlign: "center" }}>Main page will be here</h3>} />
          <Route path="/register" element={<h3 style={{ textAlign: "center" }}>Register page will be here</h3>} />
          <Route path="/login" element={<h3 style={{ textAlign: "center" }}>Login page will be here</h3>} />
          <Route path="/add-post" element={<h3 style={{ textAlign: "center" }}>Add new post page will be here</h3>} />
          <Route path="/post/:postId" element={<h3 style={{ textAlign: "center" }}>Full post page will be here</h3>} />
          <Route path="*" element={<h3 style={{ textAlign: "center" }}>Page not found</h3>} />
        </Routes>
      </Layout>
    </BrowserRouter >
  );
}

export default App;
