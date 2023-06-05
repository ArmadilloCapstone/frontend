//import DropdownMenu from "../Header/DropdownMenu"
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUserId, setUserName, setUserOption, setMessageClick, setMessageAlarm } from '../../../redux/actions';
import { ChangePw } from './ChangePw';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user_id = useSelector((state => state.user_id))
  const user_option = useSelector((state => state.user_option))
  const message_click = useSelector((state => state.message_click))
  const message_alarm = useSelector((state => state.message_alarm))
  const [showPopup, setShowPopup] = useState(false);

  
  const logoutClickHandler = () => {
    dispatch(setUserId(""));
    dispatch(setUserName(""));
    dispatch(setUserOption(""));
    dispatch(setMessageClick(false));
    localStorage.clear()
    navigate('/');
  };  
  const MessageClickHandler = () => {
    console.log("hi")
    if(!message_click){
      dispatch(setMessageAlarm(false));
    }
    dispatch(setMessageClick(!message_click));
  };

  const changePwClickHandler = () => {
      setShowPopup(!showPopup);
  }
  
  const clickClose = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    console.log(user_option)
    console.log(localStorage.getItem('useroption') || "")
  }, []);
    return (
        <header className="header">
            {showPopup ? <div className="blur"></div> : null}
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">  </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
                {
                  user_id !== ""
                  ?
                <Nav className="ms-auto">
                {(localStorage.getItem('useroption') == 1 || localStorage.getItem('useroption') == 2) ? <Nav.Link onClick={MessageClickHandler}>메시지{message_alarm ? "!!!" : ""}</Nav.Link> : null}
                  <NavDropdown title="내 정보" id="basic-nav-dropdown">
                    {localStorage.getItem('useroption') != 3 ? <NavDropdown.Item onClick={changePwClickHandler}>비밀번호 변경</NavDropdown.Item> : null}
                  </NavDropdown>
                  <Nav.Link onClick={logoutClickHandler}>로그아웃</Nav.Link>
                </Nav>
                :
                null
                }
                {showPopup ? <span className="popupclose" onClick={clickClose}>X</span> : null}
                {showPopup ? <ChangePw/> : null}
              </Navbar.Collapse>
            </Navbar>
        </header>
    )
    
}

export default Header