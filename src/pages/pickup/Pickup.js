import React, { useState } from 'react';
import Pickup_done from './Pickup_done.js';
import checkImg from './check.png';
import parentImg from './parent.png';
import checkedImg from './checked.png';

const Pickup = () => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(true);
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
                display: 'block' // Add this line to control the button's visibility
              }}
            >
              선생님, 저희 아이 데리고 갈게요.
            </button>
          </div>
        </>
      )}

      {showContent && <pre>{Pickup_done}</pre>}

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
