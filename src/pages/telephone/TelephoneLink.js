import React, { useState, useEffect } from "react"
import axios from "axios";
import teacherImg from './teacher.png';

function TelephoneLink() {
    const [callList, setCallList] = useState([
        { name: "돌봄교사", phone_num: "010-2532-7535" },
        { name: "아주초등학교", phone_num: "010-2532-7535" },
        { name: "아주초 행정실", phone_num: "010-2532-7535" }
    ]); // 주요 연락처를 담을 변수

    // 주요 연락처 List 가져오기
    const loadCallList = async () => {
        await axios.post('http://localhost:80/callList')
            .then(function (response) {
                setCallList(response.data.map(function (el, id) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['name'] = el.name;
                    returnObj['phone_num'] = el.phone_num;

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }
    useEffect(() => {
        loadCallList();
    }, []);

    function phoneCall(phoneNumber, name) {

        return (
            <div>
                <a href={"tel:" + phoneNumber}>
                    <img src={teacherImg} />
                    <span>{name}</span>
                </a>
            </div>
        )
    }

    return (
        callList.map((el) => (
            phoneCall(el.phone_num, el.name)
        ))
    )
}

export default TelephoneLink