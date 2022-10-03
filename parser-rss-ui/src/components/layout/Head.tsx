import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
 UnorderedListOutlined,
 FormOutlined,
 LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, Button } from "antd";
import UserService from "../../services/auth.service";
import { UserContext } from "../../context/user.context";

const Head = () => {
 const { user, setUser } = useContext(UserContext);
 const { Header } = Layout;
 const [current, setCurrent] = useState("posts");
 const navigate = useNavigate();

 const menuItems: MenuProps["items"] = [
  {
   label: <NavLink to='/posts'>ALL POSTS</NavLink>,
   key: "posts",
   icon: <UnorderedListOutlined />,
  },
  {
   label: <NavLink to='/add'>ADD POST</NavLink>,
   key: "add",
   icon: <FormOutlined />,
  },
 ];

 const onClick: MenuProps["onClick"] = (e) => {
  setCurrent(e.key);
 };

 const handleLogout = () => {
  setUser(undefined);
  UserService.logout();
  navigate(`/`);
 };

 return (
  <Header>
   <h1 className='title text-white font-bold pt-0.4 my-0 font-bold pr-70'>
    <NavLink to='/'>RSS POSTS PARSER</NavLink>
   </h1>
   {user && (
    <>
     <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={["posts"]}
      items={menuItems}
      selectedKeys={[current]}
      onClick={onClick}
     />

     <Button
      shape='circle'
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      className='logout'
     />
     <div className='text-white absolute right-20 top-0 text-right'>
      Hello, {user?.username}
     </div>
    </>
   )}
  </Header>
 );
};

export default Head;
