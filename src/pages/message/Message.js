import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

const Message = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const [ws, setWs] = useState(null);
    const [sendMsg, setSendMsg] = useState(false);
    const [items, setItems] = useState([]);
  
    const webSocketUrl = `ws://dolbomi.site/room`;
    
    // 소켓 객체 생성
    useEffect(() => {
      if(localStorage.getItem('useroption') == 1){
        axios.post("localhost/getAllParentByTid", {
          id : localStorage.getItem('userid')
        }).then((res) => {
          /*
          [
            {
              id : Long,
              name : String,
              phone_num : String, 
              gender : Long,
              birth_date : Date,
              class_id
            }
          ]
          */
        })
        axios.post("localhost/getAllMessageByTid", {
          id : localStorage.getItem('userid')
        }).then((res) => {
          /*
          [
            {
              
            }
          ]
          */
        })
      }
      if(localStorage.getItem('useroption') == 2){
        axios.post("localhost/getAllTeacherByPid", {
          id : localStorage.getItem('userid')
        }).then((res) => {
          /*
          [
            {
              
            }
          ]
          */
        })
        axios.post("localhost/getAllMessageByPid", {
          id : localStorage.getItem('userid')
        }).then((res) => {
          /*
          [
            {
              
            }
          ]
          */
        })
      }




      if (!ws) {
        var ws2 = new WebSocket(webSocketUrl);
        ws2.onopen = () => {
          // 소켓이 연결되는 부분
          console.log("connected to " + webSocketUrl);
          if(localStorage.getItem('useroption') == 1){
            
            ws2.send(
              JSON.stringify({
                type: "setting",
                id: "T"+localStorage.getItem('userid'),
                name: localStorage.getItem('username')
              }));
          }
          if(localStorage.getItem('useroption') == 2){
            ws2.send(
              JSON.stringify({
                type: "setting",
                id: "P"+localStorage.getItem('userid'),
                name: localStorage.getItem('username')
              }));
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
          // 메시지가 온 경우
          console.log(evt.data);
          /*
          {
            
          }
          */
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
              type: "message",
              id: "T"+localStorage.getItem('userid'),
              name: localStorage.getItem('username'),
              text: "선생님이 입장하였습니다."
            })
          );
        }
        if(localStorage.getItem('useroption') == 2){
          ws.send(
            JSON.stringify({
              type: "message",
              id: "P"+localStorage.getItem('userid'),
              name: localStorage.getItem('username'),
              text: "학부모가 입장하였습니다."
            })
          );
        }
  
        setSendMsg(true);
      }
    }, [socketConnected, ws]);
  
    return (
      <div>
        {/* <div>socket</div>
        <div>socket connected : {`${socketConnected}`}</div>
        <div>res : </div>
        <div>
          {items.map((item) => {
            return <div>{JSON.stringify(item)}</div>;
          })}
        </div> */}
      </div>
    );
};

export default Message;