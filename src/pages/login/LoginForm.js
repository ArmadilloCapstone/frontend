import './style.css';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';
import axios from 'axios';


export const LoginForm = (props) => {
  const dispatch = useDispatch();


  const showSignup = useSelector((state => state.showSignup))

  const [serial, setSerial] = useState([]);
  const [id, setId] = useState([]);
  const [pw, setPw] = useState([]);

  const saveSerial = event => {
    setSerial(event.target.value);
  };
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
    if(props.title != "보호자"){
      axios.post("/login", {
        "user_id" : id,
        "user_pw" : pw
      }).then((res) => {
        console.log(res.data)
        if(res.data == "success"){
          dispatch(setShowSignup(!showSignup));
          alert('로그인!');
        }
        else{
          alert('실패')
        }
      })
    }
    else{
      axios.post("/login", {
        "serial_num" : serial
      }).then((res) => {
        console.log(res.data)
        if(res.data == "success"){
          dispatch(setShowSignup(!showSignup));
          alert('로그인!');
        }
        else{
          alert('실패')
        }
      })

    }
  };

  return (
    <div className='login_form'>
        <div className='login_title'>{props.title}</div>
        { (props.title == "보호자")
          ?
          <div className="login_box login_sid">
            <div className="login_name">일련번호</div>
            <input type="text" value ={serial} onChange={saveSerial}/>
          </div>
          :
          <div className="login_box login_sid">
            <div className="login_name">ID</div>
            <input type="text" value ={id} onChange={saveUserId}/>
          </div>

        }
        { (props.title == "보호자")
          ?
          <div className='empty'></div>
          :
          <div className="login_box pw">
          <div className="login_name">PW</div>
          <input type="password" value ={pw} onChange={saveUserPw}/>
          </div>
        }
        <div className="signupButton">
          {(props.title == '돌봄교사' || props.title == '학부모')?<span className="signup_button" onClick={clickSignup}>회원가입</span> : <span className="signup_button"></span>}
        </div>
        <div className="login_button" onClick={clickLogin}>로그인</div>
    </div>
  );
}
