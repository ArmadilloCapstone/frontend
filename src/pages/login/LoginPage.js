import './style.css';
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from './SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const showSignup = useSelector((state => state.showSignup))
  const [userOption, setUserOption] = useState("0");
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);

  const clickClose = () => {
    dispatch(setShowSignup(!showSignup));
  };

  const loginFormWrapperStyle = {
    backgroundColor: '#e8e8e8',
    padding: '25px',
    width: '30%',
    margin: '25px',
    display: 'inline-block',
    borderRadius: '20px',
    transition: 'background-color 0.3s',
  };

  const loginFormWrapperHoverStyle = {
    backgroundColor: '#12B560',
  };

  return (
    <div style={{ fontFamily: "Eorinai" }} className='login_page'>
      {showSignup ? <div className="blur"></div> : null}

      <div
        style={{
          ...loginFormWrapperStyle,
          ...(hovered1 ? loginFormWrapperHoverStyle : null),
        }}
        onMouseEnter={() => setHovered1(true)}
        onMouseLeave={() => setHovered1(false)}
      >
        <LoginForm option="1" setUserOption={setUserOption} title="돌봄교사" />
      </div>

      <div
        style={{
          ...loginFormWrapperStyle,
          ...(hovered2 ? loginFormWrapperHoverStyle : null),
        }}
        onMouseEnter={() => setHovered2(true)}
        onMouseLeave={() => setHovered2(false)}
      >
        <LoginForm option="2" setUserOption={setUserOption} title="학부모" />
      </div>

      <div
        style={{
          ...loginFormWrapperStyle,
          ...(hovered3 ? loginFormWrapperHoverStyle : null),
        }}
        onMouseEnter={() => setHovered3(true)}
        onMouseLeave={() => setHovered3(false)}
      >
        <LoginForm option="3" title="보호자" />
      </div>

      <div
        style={{
          ...loginFormWrapperStyle,
          ...(hovered4 ? loginFormWrapperHoverStyle : null),
        }}
        onMouseEnter={() => setHovered4(true)}
        onMouseLeave={() => setHovered4(false)}
      >
        <LoginForm option="4" title="관리자" />
      </div>

      {showSignup ? <span className="signupClose" onClick={clickClose}>X</span> : null}
      {showSignup ? <SignupForm option={userOption} /> : null}
    </div>
  );
};
