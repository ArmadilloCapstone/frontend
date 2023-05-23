import './style.css';
import Draggable from "react-draggable";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ParentMain = () => {
  // 더미데이터 -> 추후에 백엔드에서 학생 명단 받아오면 대체할 부분
const [name, setStudent] = useState("");
const [grade, setGrade] = useState("");
const [origin_class, setOrigin_class] = useState("");
const [dol_class, setDol_class] = useState("");
const [birth_date, setBirth_date] = useState("");
const [phone_num, setPhone_num] = useState("");
const [student_state, setStudent_state] = useState("");

const user_name = useSelector((state => state.user_name))

useEffect(() => {
    // 백엔드의 학생 명단 가져오는 부분
    axios.post('http://dolbomi.site/getStudent/' + localStorage.getItem('userid'))
        .then(function(res){
            console.log(res);
            setStudent(res.data.name);
            setGrade(res.data.grade);
            setOrigin_class(res.data.origin_class);
            setDol_class(res.data.dol_class);
            setBirth_date(res.data.birth_date);
            var data = res.data.phone_num;
            console.log(data)
            console.log(data.substring(9, 13))
            setPhone_num(data.substring(0, 3) + "-" + data.substring(3, 7) + "-" + data.substring(7, 11));
        }).catch(function(reason){
        console.log(reason);
    });
    
    axios.post('http://dolbomi.site/sendStudentStateToParent/' + localStorage.getItem('userid'))
        .then(function(res){
            console.log(res);
            setStudent_state(res.data.state);
        }).catch(function(reason){
        console.log(reason);
    });
    
}, []);


return (
<div className="ParentMainPage">
    <div className="box" id="box">
        <div className="student_info">
            <spanc className="name">{user_name}</spanc>
            <spanc className="name-side">학부모님</spanc>
        </div>
        <div className="student_info_box">
            <div className="name">
                이름 : {name}
            </div>
            <div className="grade">
                학년 : {grade}
            </div>
            <div className="origin_class">
                반 : {origin_class}
            </div>
            <div className="dol_class">
                돌봄반 : {dol_class}
            </div>
            <div className="birth_date">
                생일 : {birth_date}
            </div>
            <div className="phone_num">
                전화번호 : {phone_num}
            </div>
        </div>
        <div className="student_state_info">
            저희 아이는 현재
        </div>
        <div className={(student_state == 1) ? "student_state_info_box checked" : "student_state_info_box"}>
        돌봄교실에 도착하지 않았어요
        </div>
        <div className={(student_state == 2) ? "student_state_info_box checked" : "student_state_info_box"}>
        돌봄교실에서 수업중이에요
        </div>
        <div className={(student_state == 3) ? "student_state_info_box checked" : "student_state_info_box"}>
        방과후 수업중이에요
        </div>
        <div className={(student_state == 4) ? "student_state_info_box checked" : "student_state_info_box"}>
        돌봄교실을 떠났어요
        </div>
    </div>
</div>
);
};
