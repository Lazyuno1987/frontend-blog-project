import Container from "@mui/material/Container";
import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { TagsPage } from "./pages";
import { Popular } from "./pages/Popular/index.jsx";
import { fetchAuthMe } from "./redux/slices/auth";
import { New } from "./pages/New/New.jsx";

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(isAuthSelector)
  
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  
  
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}>
          <Route index element={<New />} />
          <Route  path="/popular" element={<Popular />} />
          </Route>
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path = '/posts/:id/edit' element={<AddPost />}/>
          <Route path='/add-post' element={<AddPost />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Registration />} />
          <Route path='/tags/:name' element={<TagsPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
