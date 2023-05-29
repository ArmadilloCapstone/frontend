import './style.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import checkImg from './check.png';
import parentImg from './parent.png';
import checkedImg from './checked.png';
import driver from "./driver.png";
import { useSelector } from 'react-redux';

const UserImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

const GuardianPickup = () => {
  const [showContent, setShowContent] = useState(false);
  const user_id = useSelector((state => state.user_id))
  const [studentList, setStudentList] = useState([]);
  const [dummy, setDummy] = useState([
    {id : "1", name : "정재윤1", grade : 1, gender : 1},
    {id : "2", name : "정재윤2", grade : 1, gender : 1},
    {id : "3", name : "정재윤3", grade : 1, gender : 1},
    {id : "4", name : "정재윤4", grade : 1, gender : 1}
]);

  useEffect(() => {
    axios.post("http://dolbomi.site/guardian", {
      id : user_id
    }).then((res)=>{
      if(res.data != null){
        setStudentList(res.data.map(function(el, idx){
          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['grade'] = el.grade;
          returnObj['gender'] = el.gender;
          returnObj['checked'] = true;
          return returnObj;
        }));
      }
      else{
        setStudentList(dummy.map(function(el, idx){
        var returnObj = {}
        returnObj['id'] = el.id;
        returnObj['name'] = el.name;
        returnObj['grade'] = el.grade;
        returnObj['gender'] = el.gender;
        returnObj['checked'] = true;
        return returnObj;
        }))
      }
    })
  }, []);
  
  const clickButton = (idx) => {
    console.log("hi")
    setStudentList((prev) =>
    prev.map((el, i) => {
      if (i !== idx) {
        return el;
      }
      el.checked = !el.checked;
      return el;
    })
  );
    console.log(studentList)
  }

  const handleClick = () => {

    var list = [];
    studentList.map((el) => {
        var returnObj = {}
        if(el.checked == true){
            returnObj['id'] = el.id;
            returnObj['name'] = el.name;
            returnObj['grade'] = el.grade;
            returnObj['gender'] = el.gender;
            list.push(returnObj)
        }
    })
    
    // 백엔드로 parentId 보내는 코드
    axios.post("http://dolbomi.site/requestGuardian", {
        pickupManId : localStorage.getItem('userid'),
        pickupManName : localStorage.getItem('username'),
        studentPickupFormList : list
    }).then((res)=>{
      if(res.data == "success"){
        setShowContent(true);    // 버튼 클릭 시 호출 완료를 보여줌
      }
      else{
        alert("error")
      }
    })

  };

  const imageSource = showContent ? checkedImg : parentImg;
  const user_name = useSelector((state => state.user_name))

  return (

    <div style={{ padding: '20px 10px 0px 20px', flexDirection: 'column', height: '100vh' }}>
      <div style={{ fontSize: '35px'}}>
        <UserImage src={driver} alt="Driver" style={{ width: '80px', height: '80px' }} />
        보호자 {localStorage.getItem('username')}님
      </div>
      <div style={{ flex: 1, align: 'center' }}></div>
      <div className="studentList">
        {studentList.map((student, idx) => (
            <div onClick={() => clickButton(idx)} className={!!(studentList[idx].checked) ? "student checked" : "student"} key = {idx} >{student.name}</div>
        ))}
      </div>
      {!showContent && (
        <>
          <div style={{ marginTop: '20px', marginBottom: '50px', textAlign: 'center', fontSize: '30px' }}>
            학생을 마중 나왔습니다.
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <button
              onClick={handleClick}
              style={{
                width: '320px',
                height: '100px',
                backgroundColor: '#12B560',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '20px',
                fontWeight: 'bold',
                display: 'block',
                boxShadow: '4px 4px 20px #8C92AC'
              }}
            >
              선생님, 저희 아이 데리고 갈게요.
            </button>
          </div>
        </>
      )}

      {showContent && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginTop: '30px', marginLeft: '25px', fontSize: '30px' }}>호출 완료되었습니다.</div>
        </div>

      )}

      <div>
        <table style={{ padding: '0px 0px 0px 240px', border: 'none' }}>
          <tr>
            <td>
              <img src={checkImg} style={{ padding: '30px 10px 10px 10px', width: '50px', height: '70px' }} />
            </td>
            <td>
              <span style={{ padding: '10px 0px 10px 3px', width: '200px', height: '10px', color: 'black', fontSize: '13px' }}>
                <br />
                선생님은 정각부터 15분 단위로 아이들과 함께 나오십니다.
                <br />
                픽업자께서는 잠시 대기해주세요.
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default GuardianPickup;




/*



*/
