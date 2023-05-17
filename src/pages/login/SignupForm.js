import './style.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';

export const SignupForm = (props) => {
  const dispatch = useDispatch();
  const showSignup = useSelector((state => state.showSignup))

  const [name, setName] = useState([]);
  const [phone_num, setPhoneNum] = useState([]);
  const [id, setId] = useState([]);
  const [pw, setPw] = useState([]);

  const saveName = event => {
    setName(event.target.value);
  };
  const savePhoneNum = event => {
    setPhoneNum(event.target.value);
  };
  
  const saveUserId = event => {
    setId(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
  };

  const register = () => {
    axios.post("/signup", {
      "name" : name,
      "phone_num" : phone_num,
      "user_id" : id,
      "user_pw" : pw,
      "option" : props.option
    }).then((res) => {
      console.log(res.data)
      if(res.data == "success"){
        dispatch(setShowSignup(!showSignup));
        alert('회원가입 되었습니다!');
      }
      else{
        alert('실패')
      }
    })
  }

  return (
    <div className="signup">
      <div className="title">회원가입</div>
      <div className="box name">
        <div className="name">이름</div>
        <input type="text" value ={name} onChange={saveName}/>
      </div>
      <div className="box className">
        <div className="name">전화번호</div>
        <input type="text" value ={phone_num} onChange={savePhoneNum}/>
      </div>
      <div className="box phone">
        <div className="name">아이디</div>
        <input type="text" value ={id} onChange={saveUserId}/>
      </div>
      <div className="box pw">
        <div className="name">비밀번호</div>
        <input type="password" value ={pw} onChange={saveUserPw}/>
      </div>
      <div className="loginButton" onClick={register}>회원가입</div>
    </div>
  );
}