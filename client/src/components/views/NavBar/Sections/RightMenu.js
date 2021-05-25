/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon,  Popover, Button } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)
  
  const content = (
    <div>
      <p><a href="/me/mypage">My Profile</a></p>
      <p><a href="/upload">Book Upload</a></p>
    </div>
  );

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="search">
          <a href="/search">Search<Icon type="search" style={{ marginLeft:'5px',  fontSize: '1.2rem'}} /></a>
        </Menu.Item>
        <Menu.Item key="mypage">
        <Popover placement="leftTop" content={content} trigger="click">
          <a><Icon type="user" style={{ marginLeft:'5px',  fontSize: '1.3rem'}} /></a>
        </Popover>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

