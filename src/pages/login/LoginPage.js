import './style.css';
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from './SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const showSignup = useSelector((state => state.showSignup))
  const [userOption, setUserOption] = useState("1");
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);

  const clickClose = () => {
    dispatch(setShowSignup(!showSignup));
  };
  const clickradio = (e) => {
    console.log(e.target.value);
    setUserOption(e.target.value);
  };
  const option2name = (num) => {
    switch(num){
      case "1":
        return "돌봄교사"
      case "2":
        return "학부모"
      case "3":
        return "보호자"
      case "4":
        return "관리자"
    }
  };

  const loginFormWrapperStyle = {
    backgroundColor: '#fffafa',
    padding: '25px',
    width: '60%',
    margin: '25px',
    display: 'inline-block',
    borderRadius: '20px',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{ fontFamily: "Eorinai" }} className='login_page'>
      {showSignup ? <div className="blur"></div> : null}

      <div
        style={{
          ...loginFormWrapperStyle
        }}
      >
        <div className='radioGroup'>
          <input type='radio' value="1" id="1" checked={userOption == "1"} onChange={clickradio}/> <label for="1">돌봄교사</label>
          <input type='radio' value="2" id="2" checked={userOption == "2"} onChange={clickradio}/> <label for="2">학부모</label>
          <input type='radio' value="3" id="3" checked={userOption == "3"} onChange={clickradio}/> <label for="3">보호자</label>
          <input type='radio' value="4" id="4" checked={userOption == "4"} onChange={clickradio}/> <label for="4">관리자</label>
        </div>
        <LoginForm option={userOption} setUserOption={setUserOption} title={option2name(userOption)} />
      </div>

      {showSignup ? <span className="signupClose" onClick={clickClose}>X</span> : null}
      {showSignup ? <SignupForm option={userOption} /> : null}
    </div>
  );
};
