import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loadGuardianList from "./GuardianManagement"
import "./Add.css"

export default function AddGuardian() {
    const [serialNumList, setSerialNumList] = useState([]); // id, serial_num 모두 type이 number이 맞는지 확인..! (문제: 코드 순서였음.. 하)

    const [user, setUser] = useState({
        id: 0,
        name: "",
        info: "",
        serial_num: createSerialNum(),
        students: []
    });

    const { name, info, serial_num, students } = user;


    // 6자리의 중복 없는 serial_num 생성하기 (serial_num 테이블 필요할듯, 중복 대조 위해서)
    const loadSerialNum = async () => {
        await axios.post('http://13.209.104.24:8080/guardian_serial_num')
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
        // return randomNumber;
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
        await axios.post("http://dolbomi.site/guardian_submit", user);
        alert('추가되었습니다!');
        window.close(); //클로즈 먼저해야만 새로고침이 되었음
        window.dialogArguments.document.location.reload(); //클로즈 먼저해야만 새로고침이 되었음
    };

    return (
        <form onSubmit={submitGuardian}>
            <div>
                <h2 class="guardian-modal-title">보호자 추가</h2>
            </div>
            <div class="guardian-form-item">
                <label class="guardian-label">이름</label>
                <input type="text" name="name" value={name} onChange={e => onInputChange(e)} placeholder="보호자의 이름을 입력하세요." required=""
                />
            </div>
            <div class="guardian-form-item">
                <label class="guardian-label">소속</label>
                <input type="text" name="info" value={info} onChange={e => onInputChange(e)} placeholder="보호자의 소속을 입력하세요." required=""
                />
            </div>
            <div>
                <button class="guardian-form-add" type="submit">추가하기</button>
            </div>
        </form>
    )
}