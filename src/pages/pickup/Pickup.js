import React, { useState } from 'react';
import axios from 'axios';
import checkImg from './check.png';
import parentImg from './parent.png';
import checkedImg from './checked.png';
import { useSelector } from 'react-redux';

const Pickup = () => {
  const [showContent, setShowContent] = useState(false);
  const user_id = useSelector((state => state.user_id))

  const handleClick = () => {

    axios.post("http://dolbomi.site/requestParent", {

      pickupManId : user_id-0
    }).then((res)=>{
      if(res.data == "success"){
        setShowContent(true);   
      }
      else{
        alert("error")
      }
    })
  };


  const imageSource = showContent ? checkedImg : parentImg;

  return (
    <div style={{ padding: '10px 0px 0px 10px', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, align: 'center' }}></div>
      <img src={imageSource} style={{ marginLeft: '90px', width: '200px', height: '200px' }} />

      {!showContent && (
        <>
          <div style={{ marginTop: '25px', marginBottom: '30px', textAlign: 'center', fontSize: '30px' }}>
            아이를 마중 나왔습니다
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <button
              onClick={handleClick}
              style={{
                width: '320px',
                height: '100px',
                backgroundColor: '#12B560',
                color: 'white',
                alignItems: 'center',
                border: 'none',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'block',
                boxShadow: '4px 4px 20px #8C92AC'
              }}
            >
              선생님, 저희 아이 데리고 갈게요
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

export default Pickup;
