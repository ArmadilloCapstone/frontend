import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddGuardian() {
    const [user, setUser] = useState({
        id: 0,
        name: "",
        info: "",
        serial_num: createSerialNum(),
        studentList: []
    });
    const [serialNumList, setSerialNumList] = useState([]);
    const { name, info, serial_num, studentList } = user;

    // 6자리의 중복 없는 serial_num 생성하기 (serial_num 테이블 필요할듯, 중복 대조 위해서)
    const loadSerialNum = async () => {
        await axios.post('http://dolbomi.site/guardianManage/guardianList')
            .then(function (response) {
                setSerialNumList(response.data.map(function (el, id) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['id'] = id;
                    returnObj['serial_num'] = el.serial_num;

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }
    useEffect(() => {
        loadSerialNum();
    }, []);

    function createSerialNum() {
        // 100,000 ~ 999,999 사이의 정수 1개 랜덤으로 생성
        let randomNumber = Math.floor(Math.random() * 900000 + 100000);
        //return randomNumber;
        if (isValid(randomNumber)) {
            return randomNumber;
        }
        else {
            return createSerialNum();
        } // 맞겠지?
    }

    function isValid(n) {
        // 중복 검사
        for (let i = 0; i < serialNumList.length; i++) {
            if (n === serialNumList[i].serial_num) {
                return false
            }
        }
        return true;
    }

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitGuardian = async (e) => {
        e.preventDefault();
        e.target.reset();
        console.log(user);
        await axios.post("http://dolbomi.site/guardianManage/guardian_submit", user)
            .then(function (response) {
                console.log(response.data);
                if(response.data === "success") {
                    alert('추가되었습니다!');
                }
                else {
                    alert('잘못 입력된 값이 존재합니다!');
                }

            }).catch(function (reason) {
                console.log(reason.data);
            });

        // loadGuardian();
    };

    return (
        <form onSubmit={submitGuardian}>
            <div>
                <h2>보호자 추가</h2>
            </div>
            <div>이름:
                <input type="text" name="name" value={name} onChange={e => onInputChange(e)} placeholder="보호자의 이름을 입력하세요." required=""
                    style={{ width: "60%", textAlign: "center" }} />
            </div>
            <div>소속:
                <input type="text" name="info" value={info} onChange={e => onInputChange(e)} placeholder="보호자의 소속을 입력하세요." required=""
                    style={{ width: "60%", textAlign: "center" }} />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <button type="submit" style={{ backgroundColor: "#12B560", border: "none", borderRadius: "5PX" }}>추가하기</button>
            </div>
        </form>
    )
}