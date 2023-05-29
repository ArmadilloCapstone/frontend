import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Message = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const [ws, setWs] = useState(null);
    const [sendMsg, setSendMsg] = useState(false);
    const [items, setItems] = useState([]);
  
    const webSocketUrl = `ws://localhost/room`;
    
    // 소켓 객체 생성
    useEffect(() => {
      if (!ws) {
        var ws2 = new WebSocket(webSocketUrl);
        ws2.onopen = () => {
          console.log("connected to " + webSocketUrl);
          if(localStorage.getItem('useroption') == 1){
            ws2.send("setting_user_id:T"+localStorage.getItem('userid'));
          }
          if(localStorage.getItem('useroption') == 2){
            ws2.send("setting_user_id:P"+localStorage.getItem('userid'));
          }
          setSocketConnected(true);
        };
        ws2.onclose = (error) => {
          console.log("disconnect from " + webSocketUrl);
          console.log(error);
        };
        ws2.onerror = (error) => {
          console.log("connection error " + webSocketUrl);
          console.log(error);
        };
        ws2.onmessage = (evt) => {
          const data = JSON.parse(evt.data);
          console.log(evt.data);
          //setItems((prevItems) => [...prevItems, data]);
        };

        setWs(ws2);
      }
  
      return () => {
        console.log("clean up");
        if (ws) {
            ws.close();
        }
      };
    }, [ws]);
  
    // 소켓이 연결되었을 시에 send 메소드
    useEffect(() => {
      if (socketConnected && ws) {
        if(localStorage.getItem('useroption') == 1){
          ws.send(
            JSON.stringify({
              id: "T"+localStorage.getItem('userid'),
              text: "선생님이 입장하였습니다."
            })
          );
        }
        if(localStorage.getItem('useroption') == 2){
          ws.send(
            JSON.stringify({
              id: "P"+localStorage.getItem('userid'),
              text: "학부모가 입장하였습니다."
            })
          );
        }
  
        setSendMsg(true);
      }
    }, [socketConnected, ws]);
  
    return (
      <div>
        <div>socket</div>
        <div>socket connected : {`${socketConnected}`}</div>
        <div>res : </div>
        <div>
          {items.map((item) => {
            return <div>{JSON.stringify(item)}</div>;
          })}
        </div>
      </div>
    );
};

export default Message;