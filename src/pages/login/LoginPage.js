import './style.css';
import logo from './logo.png';
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from './SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const showSignup = useSelector((state => state.showSignup))
  const [userOption, setUserOption] = useState("1");

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

  const logoStyle = {
    width: '170px', 
    height: '170px', 
    marginTop: '30px',
    marginBottom: '20px'

  };

  const loginFormWrapperStyle = {
    backgroundColor: '#F5FFFA',
    borderRadius: '15px',
    paddingRight: '10px',
    paddingLeft: '10px',
    marginBottom: '-140px',
    marginTop: '80px',
    width: '40%',
    margin: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '900px',

  };

/* Mobile View */
const mobileView = window.matchMedia('(max-width: 600px)');
if (mobileView.matches) {
  logoStyle.width = '120px';
  logoStyle.height = '120px';
  logoStyle.marginTop = '20px';
  logoStyle.marginBottom = '10px';

  loginFormWrapperStyle.width = '90%';
  loginFormWrapperStyle.height = 'auto';
}

  
  

  return (
    <div style={{ ...loginFormWrapperStyle, fontFamily: "Eorinai" }} className='login_page'>
      {showSignup ? <div className="blur"></div> : null}

        <div className='radioGroup'>
          <input type='radio' value="1" id="1" checked={userOption == "1"} onChange={clickradio}/> <label for="1">돌봄교사</label>
          <input type='radio' value="2" id="2" checked={userOption == "2"} onChange={clickradio}/> <label for="2">학부모</label>
          <input type='radio' value="3" id="3" checked={userOption == "3"} onChange={clickradio}/> <label for="3">보호자</label>
          <input type='radio' value="4" id="4" checked={userOption == "4"} onChange={clickradio}/> <label for="4">관리자</label>
        </div>

        <img src={logo} alt="Logo" style={logoStyle} />
        <h1 className="login_title">돌봄 교실, 자녀의 안전과 행복을 위한 파트너</h1> 

        <LoginForm option={userOption} setUserOption={setUserOption} title={option2name(userOption)} />
          {showSignup ? <span className="signupClose" onClick={clickClose}>X</span> : null}
          {showSignup ? <SignupForm option={userOption} /> : null}

          
    </div>
  );
};
