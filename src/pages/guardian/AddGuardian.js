import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Add.css"
import swal from 'sweetalert';

export default function AddGuardian() {
    const [serialNumList, setSerialNumList] = useState([]);

    const [user, setUser] = useState({
        id: 0,
        name: "",
        info: "",
        serial_num: createSerialNum(),
        studentList: []
    });

    const { name, info, serial_num, studentList } = user;


    // 6자리의 중복 없는 serial_num 생성하기
    const loadSerialNum = async () => {
        await axios.post('http://dolbomi.site/guardianManage/guardianList')
            .then(function (response) {
                setSerialNumList(response.data.map(function (el, id) {
                    // console.log(el);

                    var returnObj = {}
                    returnObj['id'] = id;
                    returnObj['serial_num'] = el.serial_num;

                    return returnObj;
                }));
            }).catch(function (reason) {
                // console.log(reason);
            });
    }
    useEffect(() => {
        loadSerialNum();
    }, []);

    function createSerialNum() {
        // 100,000 ~ 999,999 사이의 정수 1개 랜덤으로 생성
        let randomNumber = Math.floor(Math.random() * 900000 + 100000);
        if (isValid(randomNumber)) {
            return randomNumber;
        }
        else {
            return createSerialNum();
        }
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
        // console.log(user);
        await axios.post("http://dolbomi.site/guardianManage/guardian_submit", user)
            .then(function (response) {
                // console.log(response.data);
                if (response.data === "success") {
                    swal({
                        title: "추가되었습니다!",
                        icon: "success",
                        timer: 3000,
                        button: "확인"
                    }).then(function () {
                        window.close();
                        window.location.reload();
                    });
                }
                else {
                    swal({
                        title: "잘못 입력된 값이 존재합니다!",
                        icon: "error",
                        timer: 3000,
                        button: "확인"
                    }).then(function () {
                        window.close(); 
                        window.location.reload();
                    });
                }

            }).catch(function (reason) {
                // console.log(reason.data);
            });
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