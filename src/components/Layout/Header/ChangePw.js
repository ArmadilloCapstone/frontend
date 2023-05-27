import React, { useState } from "react";
import axios from 'axios';

export const ChangePw = (props) => {

  const [user_pw, setUser_pw] = useState([]);
  const [user_new_pw, setUser_new_pw] = useState([]);

  const saveName = event => {
    setUser_pw(event.target.value);
  };
  const savePhoneNum = event => {
    setUser_new_pw(event.target.value);
  };
  const register = () => {
    axios.post("http://dolbomi.site/changepw", {
        "user_id" : localStorage.getItem('userid'),
        "user_pw" : user_pw,
        "user_new_pw" : user_new_pw,
        "option" : localStorage.getItem('useroption')
    }).then((res) => {
      console.log(res.data)
      if(res.data == "success"){
        alert('비밀번호가 변경되었습니다.');
      }
      else{
        alert('실패')
      }
    })
  }

  return (
    <div className="changepw">
      <div className="title">비밀번호 변경</div>
      <div className="box name">
        <div className="name">현재 비밀번호</div>
        <input type="password" value ={user_pw} onChange={saveName}/>
      </div>
      <div className="box className">
        <div className="name">변경 비밀번호</div>
        <input type="password" value ={user_new_pw} onChange={savePhoneNum}/>
      </div>
      <div className="loginButton" onClick={register}>비밀번호 변경하기</div>
    </div>
  );
}