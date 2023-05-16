import './style.css';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';


export const LoginForm = (props) => {
  const dispatch = useDispatch();


  const showSignup = useSelector((state => state.showSignup))

  const [id, setId] = useState([]);
  const [pw, setPw] = useState([]);

  const saveUserId = event => {
    setId(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
  };

  const clickSignup = () => {
    dispatch(setShowSignup(!showSignup));
  };

  const clickLogin = () => {
    console.log("hi")
  };

  return (
    <div className='login_form'>
        <div className='login_title'>{props.title}</div>
        <div className="login_box login_sid">
            <div className="login_name">ID</div>
            <input type="text" value ={id} onChange={saveUserId}/>
        </div>
        <div className="login_box pw">
            <div className="login_name">PW</div>
            <input type="password" value ={pw} onChange={saveUserPw}/>
        </div>
        <div className="signupButton">
          <span className="signup_button" onClick={clickSignup}>회원가입</span>
        </div>
        <div className="login_button" onClick={clickLogin}>로그인</div>
    </div>
  );
}
