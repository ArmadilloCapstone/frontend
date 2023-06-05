import './style.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';
import swal from 'sweetalert';

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

  const register = async (e) => {
    e.preventDefault();
    e.target.reset();
    axios.post("http://dolbomi.site/signup", {
      "name": name,
      "phone_num": phone_num,
      "user_id": id,
      "user_pw": pw,
      "option": (props.option - 0)
    }).then((res) => {
      console.log(res.data)
      if (res.data == "success") {
        dispatch(setShowSignup(!showSignup));
        swal({
          title: "회원가입 되었습니다!",
          icon: "success",
          timer: 3000,
          button: "확인"
        })
      }
      else {
        swal({
          title: res.data,
          icon: "error",
          timer: 3000,
          dangerMode: true,
          button: "확인"
        })
      }
    })
  }

  return (
    <div className="signup">
      <form name="form" onSubmit={register}>
        <div className="box name">
          <div className="name">이름</div>
          <input type="text" value={name} onChange={saveName} />
        </div>
        <div className="box className">
          <div className="name">전화번호</div>
          <input type="text" value={phone_num} onChange={savePhoneNum} />
        </div>
        <div className="box phone">
          <div className="name">아이디</div>
          <input type="text" value={id} onChange={saveUserId} />
        </div>
        <div className="box pw">
          <div className="name">비밀번호</div>
          <input type="password" value={pw} onChange={saveUserPw} />
        </div>
        <button className="signup_Button" type="submit" style={{borderColor:'white'}}>회원가입하기</button>
      </form>
    </div>
  );
}