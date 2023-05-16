import './style.css';
import React, { useState } from "react";
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
    if(props.option !== "3"){

      axios.post("/login", {
        "user_id" : id,
        "user_pw" : pw,
        "option" : (props.option - 0)
      }).then((res) => {
        console.log(res.data)
        if(res.data.name !== "Error"){
          dispatch(setShowSignup(!showSignup));
          alert('로그인!');
          console.log(res.data)
          if(props.option === "4"){
            console.log("admin")
            localStorage.setItem('userid', res.data.user_id);
          }
          else{
            localStorage.setItem('userid', res.data.id);
          }
          localStorage.setItem('username', res.data.name);
          localStorage.setItem('useroption', (props.option - 0));
        }
        else{
          alert('실패')
        }
      })
    }
    else{
      axios.post("/login", {
        "serial_num" : serial,
        "option" : (props.option - 0)
      }).then((res) => {
        console.log(res.data)
        if(res.data.name !== "Error"){
          dispatch(setShowSignup(!showSignup));
          alert('로그인!');
          localStorage.setItem('userid', res.data.user_id);
          localStorage.setItem('username', res.data.user_name);
          localStorage.setItem('useroption', (props.option - 0));
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
        { (props.option === "3")
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
        { (props.option === "3")
            ?
            <div className='empty'></div>
            :
            <div className="login_box pw">
              <div className="login_name">PW</div>
              <input type="password" value ={pw} onChange={saveUserPw}/>
            </div>
        }
        <div className="signupButton">
          {(props.option === '1' || props.option === '2')?<span className="signup_button" onClick={clickSignup}>회원가입</span> : <span className="signup_button"></span>}
        </div>
        <div className="login_button" onClick={clickLogin}>로그인</div>
      </div>
  );
}
