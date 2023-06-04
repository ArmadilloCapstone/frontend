import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./style.css"

const Message = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [ws, setWs] = useState(null);
  const [sendMsg, setSendMsg] = useState(false);

  const [allChatList, setAllChatList] = useState([
    {
    id: 1,
    name: "부모1",
    phone_num: "010-1111-1111",
    gender: "여자",
    birth_date: "700115",
    child_id: 1,
    class_id: 1,
    // disable : Long
},
{
    id: 2,
    name: "부모2",
    phone_num: "010-2222-2222",
    gender: "남자",
    birth_date: "690328",
    child_id: 2,
    class_id: 1,
    // disable : Long
}
  ]);
  const [allChatMsg, setAllChatMsg] = useState([
    {
        id: 1,
        sender_id: "P01",
        sender_name: "부모1",
        receiver_id: "T01",
        receiver_name: "교사1",
        text: "보낸사람: 부모1, 받은사람: 교사1, 부모가 첫번째 보낸 메시지",
        date: moment("2023-06-01 10:30:25")
    },
    {
        id: 2,
        sender_id: "P02",
        sender_name: "부모2",
        receiver_id: "T01",
        receiver_name: "교사1",
        text: "보낸사람: 부모2, 받은사람: 교사1, 부모가 첫번째 보낸 메시지",
        date: moment("2023-06-01 11:30:25")
    },
    {
        id: 3,
        sender_id: "T01",
        sender_name: "교사1",
        receiver_id: "P01",
        receiver_name: "부모1",
        text: "보낸사람: 교사1, 받은사람: 부모1, 교사가 첫번째 보낸 메시지",
        date: moment("2023-06-01 12:30:25")
    },
    {
        id: 4,
        sender_id: "T01",
        sender_name: "교사1",
        receiver_id: "P01",
        receiver_name: "부모2",
        text: "보낸사람: 교사1, 받은사람: 부모2, 교사가 첫번째 보낸 메시지",
        date: moment("2023-06-01 13:30:25")
    }
  ]);
  const [selected, setSelected] = useState({
    id: 0,
    name: "",
    phone_num: "",
    gender: "",
    birth_date: "",
    child_id: null,
    class_id: null,
  });
  const [nowChatMsg, setNowChatMsg] = useState([]);

  const [inputMsg, setInputMsg] = useState("")
  const [showForm, setShowForm] = useState(false);

  const webSocketUrl = `ws://localhost/room`;

<<<<<<< HEAD
  useEffect(() => {
    if (localStorage.getItem('useroption') == 1) {
      axios.post("http://localhost/getAllParentByTid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatList(res.data)
      })
      axios.post("http://localhost/getAllMessageByTid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatMsg(res.data)
      })
    }

    if (localStorage.getItem('useroption') == 2) {
      axios.post("http://localhost/getAllTeacherByPid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatList(res.data)
      })
      axios.post("http://localhost/getAllMessageByPid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatMsg(res.data)
      })
    }
=======
  // useEffect(() => {
  //   if (localStorage.getItem('useroption') == 1) {
  //     axios.post("http://dolbomi.site/getAllParentByTid", {
  //       id: localStorage.getItem('userid')
  //     }).then((res) => {
  //       console.log(res.data)
  //       setAllChatList(res.data)
  //     })
  //     axios.post("http://dolbomi.site/getAllMessageByTid", {
  //       id: localStorage.getItem('userid')
  //     }).then((res) => {
  //       console.log(res.data)
  //       setAllChatMsg(res.data)
  //     })
  //   }

  //   if (localStorage.getItem('useroption') == 2) {
  //     axios.post("http://dolbomi.site/getAllTeacherByPid", {
  //       id: localStorage.getItem('userid')
  //     }).then((res) => {
  //       console.log(res.data)
  //       setAllChatList(res.data)
  //     })
  //     axios.post("http://dolbomi.site/getAllMessageByPid", {
  //       id: localStorage.getItem('userid')
  //     }).then((res) => {
  //       console.log(res.data)
  //       setAllChatMsg(res.data)
  //     })
  //   }
>>>>>>> c590fdc1941c36f13f04da613e97da11565586aa

  //   if (!ws) {
  //     var ws2 = new WebSocket(webSocketUrl);
  //     ws2.onopen = () => {
  //       console.log("connected to " + webSocketUrl);
  //       if (localStorage.getItem('useroption') == 1) {
  //         ws2.send(
  //           JSON.stringify({
  //             type: "setting",
  //             id: "T" + localStorage.getItem('userid'),
  //             name: localStorage.getItem('username')
  //           }));
  //       }
  //       if (localStorage.getItem('useroption') == 2) {
  //         ws2.send(
  //           JSON.stringify({
  //             type: "setting",
  //             id: "P" + localStorage.getItem('userid'),
  //             name: localStorage.getItem('username')
  //           }));
  //       }
  //       setSocketConnected(true);
  //     };
  //     ws2.onclose = (error) => {
  //       console.log("disconnect from " + webSocketUrl);
  //       console.log(error);
  //     };
  //     ws2.onerror = (error) => {
  //       console.log("connection error " + webSocketUrl);
  //       console.log(error);
  //     };
  //     ws2.onmessage = (evt) => {
  //       console.log(evt.data);
  //     };

  //     setWs(ws2);
  //   }

  //   return () => {
  //     console.log("clean up");
  //     if (ws) {
  //       ws.close();
  //     }
  //   };
  // }, [ws]);

  const showChatRoom = (select) => {
    /* 선택된 상대와의 채팅룸 visible */
    setSelected(select);
    // /* 선택된 상대와의 메시지 내역 불러옴 */
    // setNowChatMsg(allChatMsg.filter(el => el.receiver_name === select.name || el.sender_name === select.name));
    // /* 메시지 전송 폼 visible */
    // setShowForm(true);
  }
  const showChatRoom2 = (select) => {
    /* 선택된 상대와의 메시지 내역 불러옴 */
    setNowChatMsg(allChatMsg.filter(el => el.receiver_name === select.name || el.sender_name === select.name));
    /* 메시지 전송 폼 visible */
    setShowForm(true);
  }

  const onInputChange = (e) => {
    setInputMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    sendMsgOnServer();
    setAllChatMsg((prevItems) => [...prevItems, {
      id: allChatMsg.length,
      sender_id: "T" + localStorage.getItem('userid'),
      sender_name: localStorage.getItem('username'),
      receiver_id: "P" + selected.id.toString(),
      receiver_name: selected.name,
      text: inputMsg,
      date: moment(),
    }]);
    onReset();
  }

  const onReset = () => {
    setInputMsg("");
};

  const sendMsgOnServer = () => {
    if (socketConnected && ws) {
      if (localStorage.getItem('useroption') == 1) {
        ws.send(
          JSON.stringify({
            type: "message",
            sender_id: "T" + localStorage.getItem('userid'),
            sender_name: localStorage.getItem('username'),
            receiver_id: "P" + selected.id.toString(),
            receiver_name: selected.name,
            text: inputMsg,
            date: moment(),
          })
        );
      }
      if (localStorage.getItem('useroption') == 2) {
        ws.send(
          JSON.stringify({
            type: "message",
            sender_id: "P" + localStorage.getItem('userid'),
            sender_name: localStorage.getItem('username'),
            receiver_id: "T" + selected.id.toString(),
            receiver_name: selected.name,
            text: inputMsg,
            date: moment(),
          })
        );
      }
      setSendMsg(true);
    }
  }
  // useEffect(() => {
  //   sendMsgOnServer();
  // }, [socketConnected, ws]);

  useEffect(() => {
    if (sendMsg) {
      ws.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        setAllChatMsg((prevItems) => [...prevItems, evt.data]);
      };
    }
  }, [sendMsg]);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-list">
          <div>채팅 목록</div>
          <div>
            {allChatList.map((el) =>
              <div>
                <button onClick={() => {
                  showChatRoom(el);
                  showChatRoom2(el);
                }}>
                  <div>{el.name}</div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="chat-room">
          <div>{selected.name}님과의 채팅룸입니다.</div>
          <hr></hr>
          <div>
            {nowChatMsg.map((el) =>
              <div className="message-container">
                <div>
                  보낸사람: {el.sender_name}, 받는사람: {el.receiver_name},
                  {/* 시간: {el.date} */}
                </div>
                <hr></hr>
                <div>내용: {el.text}</div>
              </div>
            )}
            {
              showForm === true ?
                <form onSubmit={handleSubmit} className="message-form">
                  <input
                    type="text"
                    name="text"
                    value={inputMsg}
                    onChange={e => onInputChange(e)}
                  />
                  <button type='submit' disabled={inputMsg==="" ? true : false}>전송</button>
                </form>
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
