import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import moment from 'moment';

const Message = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [ws, setWs] = useState(null);
  const [sendMsg, setSendMsg] = useState(false);

  const [allChatList, setAllChatList] = useState([]); // 채팅 가능한 모든 상대 정보 (채팅 목록에 필요)
  const [allChatMsg, setAllChatMsg] = useState([]); // 내가 채팅에 참여했던 모든 메시지
  const [selected, setSelected] = useState({
    id: 0,
    name: "",
    phone_num: "",
    gender: "",
    birth_date: "",
    child_id: null,
    class_id: null,
    // disable : Long
  }); // 채팅목록에서 선택한 상대 (=현재 채팅룸의 상대)
  const [nowChatMsg, setNowChatMsg] = useState([]); // 현재 채팅룸의 모든 메시지

  const [inputMsg, setInputMsg] = useState("")
  const [showForm, setShowForm] = useState(false); // 메시지 전송 폼



  const webSocketUrl = `ws://dolbomi.site/room`;

  // 소켓 객체 생성
  useEffect(() => {
    if (localStorage.getItem('useroption') == 1) {
      axios.post("localhost/getAllParentByTid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatList(res.data) // 상대(부모들)의 모든 정보를 set
      })
      axios.post("localhost/getAllMessageByTid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatMsg(res.data) // 상대(부모들)의 모든 메시지를 set
      })
    }

    if (localStorage.getItem('useroption') == 2) {
      axios.post("localhost/getAllTeacherByPid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatList(res.data) // 상대(교사들)의 모든 정보를 set
      })
      axios.post("localhost/getAllMessageByPid", {
        id: localStorage.getItem('userid')
      }).then((res) => {
        console.log(res.data)
        setAllChatMsg(res.data) // 상대(교사들)의 모든 메시지를 set
      })
    }

    if (!ws) {
      var ws2 = new WebSocket(webSocketUrl);
      ws2.onopen = () => {
        // 소켓이 연결되는 부분
        console.log("connected to " + webSocketUrl);
        if (localStorage.getItem('useroption') == 1) {

          ws2.send(
            JSON.stringify({
              type: "setting",
              id: "T" + localStorage.getItem('userid'),
              name: localStorage.getItem('username')
            }));
        }
        if (localStorage.getItem('useroption') == 2) {
          ws2.send(
            JSON.stringify({
              type: "setting",
              id: "P" + localStorage.getItem('userid'),
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
        console.log(evt.data);
        /*
        {
          {'id':'1','sender_id':'P02','sender_name':'라마바','receiver_id':'T01','receiver_name':'가나다','text':'선생님이 입장하였습니다.','date':'2023-06-01 19:03:57.982'}
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

  /* 채팅목록에서 클릭한 상대와의 채팅 룸을 화면에 보여주는 메소드 */
  const showChatRoom = (select) => {
    setSelected(select);
  }

  /* 현재 채팅 룸에 보여야 하는 메시지들을 불러오는 메소드 */
  const loadMsgOnChatRoom = () => {
    let filterMsg = allChatMsg.filter(el => el.receiver_name === selected.name || el.sender_name === selected.name);
    setNowChatMsg(filterMsg);
  }
  useEffect(() => {
    loadMsgOnChatRoom();
  }, [nowChatMsg]);

  /* 채팅룸이 활성화될 때만 메시지 입력창 보이게 설정 */
  const showChattSubmitForm = () => {
    setShowForm(true);
  }

  const onInputChange = (e) => {
    setInputMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    sendMsgOnServer();
  }

  /* 소켓이 연결되었을 시에 send 메소드 */
  const sendMsgOnServer = () => {
    if (socketConnected && ws) {
      if (localStorage.getItem('useroption') == 1) { // 돌봄교사일 경우
        ws.send( //상대방한테
          JSON.stringify({
            type: "message",
            id: 1,
            sender_id: "T" + localStorage.getItem('userid'),
            sender_name: localStorage.getItem('username'),
            // sender_id: "T" + "01",
            // sender_name: "교사1",
            receiver_id: "P" + "0" + selected.id.toString(),
            receiver_name: selected.name,
            text: inputMsg,
            date: moment(),
            // id: "T" + localStorage.getItem('userid'),
            // name: localStorage.getItem('username'),
            // text: inputMsg
          })
        );

      }
      if (localStorage.getItem('useroption') == 2) { // 부모일 경우
        ws.send(
          JSON.stringify({
            type: "message",
            id: 0,
            sender_id: "P" + localStorage.getItem('userid'),
            sender_name: localStorage.getItem('username'),
            // sender_id: "P" + "01",
            // sender_name: "부모1",
            receiver_id: "T" + "0" + selected.id.toString(),
            receiver_name: selected.name,
            text: inputMsg,
            date: moment(),
            // id: "P" + localStorage.getItem('userid'),
            // name: localStorage.getItem('username'),
            // text: inputMsg
          })
        );
      }

      setSendMsg(true);
    }
  }

  useEffect(() => {
    sendMsgOnServer();
  }, [socketConnected, ws]);

  /* send 후에 onmessage로 데이터 가져오기 */
  useEffect(() => {
    if (sendMsg) {
      ws.onmessage = (evt) => { // ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        setAllChatMsg((prevItems) => [...prevItems, data]);
      };
    }
  }, [sendMsg]);

  return (
    <div style={{ margin: "200px", display: "flex" }}>
      <div style={{ margin: "0 20px" }}> 채팅 목록
        <div>
          {allChatList.map((el) =>
            <div>
              <button onClick={() => {
                showChatRoom(el); // 채팅 목록에서 클릭한 상대와의 채팅룸이 오른쪽에 생성
                loadMsgOnChatRoom();
                showChattSubmitForm();
              }}>
                {/* 채팅 목록에는 이름만 보이게 설정 */}
                <div>{el.name}</div>
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ "align-content": "space-between" }}> {selected.name}님과의 채팅룸입니다.
        <hr></hr>
        <div>
          {/* 클릭한 상대와의 주고 받은 모든 메시지를 화면에 출력 */}
          {nowChatMsg.map((el) =>
            <div style={{ border: "1px solid", padding: "10px" }}>
              <div>
                보낸사람: {el.sender_name}, 받는사람: {el.receiver_name}, 시간: {el.date}
              </div>
              <hr></hr>
              <div>내용: {el.text}</div>
            </div>
          )}
          {
            showForm === true ?
              < form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
                <input
                  type="text"
                  name="text"
                  value={inputMsg}
                  onChange={e => onInputChange(e)}
                />
                <button type='submit'>전송</button>
              </form>

              : null
          }
        </div>

      </div>


      {/* <div>socket</div>
        <div>socket connected : {`${socketConnected}`}</div>
        <div>res : </div>
        <div>
          {items.map((item) => {
            return <div>{JSON.stringify(item)}</div>;
          })}
        </div> */}

    </div >
  );
};

export default Message;