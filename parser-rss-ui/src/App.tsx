import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import AddPost from "./components/pages/AddPost";
import Post from "./components/pages/Post";
import Head from "./components/layout/Head";
import Posts from "./components/pages/Posts";
import { Login } from "./components/pages/Login";
import UserService from "./services/auth.service";
import { IUser } from "./types/user.type";
import { UserContext } from "./context/user.context";

const App: React.FC = () => {
 const [user, setUser] = useState<IUser | undefined | null>(
  undefined
 );
 const { Content } = Layout;

 useEffect(() => {
  const _user = UserService.getCurrentUser();

  if (_user) {
   setUser(_user);
  }
 }, []);

  const currentUser = useMemo(
    () => ({ user, setUser }), 
    [user]
  );

//  const logout = () => {
//   setUser(null);
//  };

 return (
  <Layout>
   <UserContext.Provider value={currentUser}>
    <Head />
    <Content>
     <Routes>
      {!user && <Route path='/' element={<Login />} />}
      {user && (
       <>
        <Route path='/' element={<Posts />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/add' element={<AddPost />} />
        <Route path='/posts/:id' element={<Post />} />
       </>
      )}
     </Routes>
    </Content>
   </UserContext.Provider>
  </Layout>
 );
};

export default App;
