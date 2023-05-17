import './style.css';
import React, { useState } from "react";
import {LoginForm} from "./LoginForm";
import { SignupForm } from './SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const showSignup = useSelector((state => state.showSignup))
  const [userOption, setUserOption] = useState("0");

  const clickClose = () => {
    dispatch(setShowSignup(!showSignup));
  }
  return (
    <div className='login_page'>
      {showSignup?<div class="blur"></div> : null}
      <LoginForm option="1" setUserOption = {setUserOption} title="돌봄교사"/>
      <LoginForm option="2" setUserOption = {setUserOption}  title="학부모" />
      <LoginForm option="3" title="보호자" />
      <LoginForm option="4" title="관리자" />
      {showSignup?<span class="signupClose" onClick={clickClose}>X</span> : null}
      {showSignup?<SignupForm option={userOption}/> : null}
    </div>
  );
}