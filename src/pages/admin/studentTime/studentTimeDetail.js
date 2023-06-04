import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentTimeDetail() {
    const [record, setRecord] = useState([]);

    // On Page load display all records 
    const loadStudentTimeDetail = async () => {
        await axios.post('http://dolbomi.site/student_time') // student와 parent를 연결해서 어떻게 데이터를 가져오는 거지? db 쿼리로 처리하는 건가?
            .then(function (response) {
                setRecord(response.data.map(function (el, idx) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['name'] = el.name;
                    returnObj['student_id'] = el.student_id;
                    returnObj['entry_1'] = el.entry_1;
                    returnObj['off_1'] = el.off_1;
                    returnObj['entry_2'] = el.entry_2;
                    returnObj['off_2'] = el.off_2;
                    returnObj['entry_3'] = el.entry_3;
                    returnObj['off_3'] = el.off_3;
                    returnObj['entry_4'] = el.entry_4;
                    returnObj['off_4'] = el.off_4;
                    returnObj['entry_5'] = el.entry_5;
                    returnObj['off_5'] = el.off_5;

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });

    }
    useEffect(() => {
        loadStudentTimeDetail();
    }, []);

    // Delete Student Record
    const deleteRecord = (productId) => {
        axios.delete(`http://dolbomi.site/student_time/${productId}`)
            .then((result) => {
                loadStudentTimeDetail();
            })
            .catch(() => {
                alert('오류가 발생했습니다!');
            });
    };

    return (
        <section class="tableSection">
            <table class="admin">
                <thead class="admin">
                    <tr class="admin">
                        <th class="admin">이름</th>
                        <th class="admin">월(입)</th>
                        <th class="admin">월(퇴)</th>
                        <th class="admin">화(입)</th>
                        <th class="admin">화(퇴)</th>
                        <th class="admin">수(입)</th>
                        <th class="admin">수(퇴)</th>
                        <th class="admin">목(입)</th>
                        <th class="admin">목(퇴)</th>
                        <th class="admin">금(입)</th>
                        <th class="admin">금(퇴)</th>
                        <th class="admin">Action</th>
                    </tr>
                </thead>
                <tbody class="admin">

                    {record.map((name) =>
                        <tr class="admin">
                            <td class="admin">{name.name}</td>
                            <td class="admin">{name.entry_1}</td>
                            <td class="admin">{name.off_1}</td>
                            <td class="admin">{name.entry_2}</td>
                            <td class="admin">{name.off_2}</td>
                            <td class="admin">{name.entry_3}</td>
                            <td class="admin">{name.off_3}</td>
                            <td class="admin">{name.entry_4}</td>
                            <td class="admin">{name.off_4}</td>
                            <td class="admin">{name.entry_5}</td>
                            <td class="admin">{name.off_5}</td>
                            <td class="admin">
                                <button class="delete"
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                            "'" + name.name + "'" + "의 출입시간을 정말 삭제하시겠습니까?"
                                        )
                                        if (confirmBox === true) {
                                            deleteRecord(name.id)
                                        }
                                    }}>삭제</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default StudentTimeDetail;