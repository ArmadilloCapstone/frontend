import React, { useState } from 'react';
import checkImg from './check.png';
import parentImg from './parent.png';
import checkedImg from './checked.png';
import axios from 'axios';

// 버튼 클릭 시 호출 완료를 알리는 checkedImg가 뜨는 페이지

// 필요 내용 : 버튼 클릭 시 백엔드에 현재 로그인된 학부모의 아이 정보를 학생 픽업 정보(구현해야함)로 전달

const Pickup = () => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(true);
    axios.post("/requestParent", {pickupManId : 12007050}).then(function(response){
      console.log(response.data);
    })
  };


  const imageSource = showContent ? checkedImg : parentImg;

  return (
    <div style={{ position: "fixed", flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, border: '1px solid black', align: "center" }}></div>
      <img src={imageSource} style={{ padding: '30px 385px', width: "400px", height: "400px" }} />

      {!showContent && (
        <>
          <div style={{ marginBottom: '50px', textAlign: 'center', fontSize: '30px' }}>
            아이를 마중 나왔어요
          </div>

          /* 학생 호출 버튼 */
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <button
              onClick={handleClick}
              style={{
                width: "500px",
                height: "100px",
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '20px',
                fontSize: '30px',
                fontWeight: 'bold',
                display: 'block' 
              }}
            >
              선생님, 저희 아이 데리고 갈게요.
            </button>
          </div>
        </>
      )}

      {showContent && <pre></pre>}

      <div>
        <table style={{ padding: "0px 0px 0px 240px", border: "none" }}>
          <tr>
            <td>
              <img src={checkImg} style={{ align: "center", padding: '40px 30px 0px 0px', width: "100px", height: "100px" }} />
            </td>
            <td>
              <span style={{ width: "200px", height: "10px", color: 'black', fontSize: '18px' }}>
                <br></br>선생님은 정각부터 15분 단위로 아이들과 함께 나오십니다.<br></br>픽업자께서는 잠시 대기해주세요.
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Pickup;
