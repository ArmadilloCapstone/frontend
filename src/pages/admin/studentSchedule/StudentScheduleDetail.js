import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentScheduleDetail() {
    const [record, setRecord] = useState([]);

    // On Page load display all records 
    const loadStudentScheduleDetail = async () => {
        await axios.post('http://localhost:80/student_schedule')
            .then(function (response) {
                setRecord(response.data.map(function (el, idx) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['id'] = el.id;
                    returnObj['name'] = el.name;
                    returnObj['class_name'] = el.class_name;
                    returnObj['day'] = el.day;

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }

    useEffect(() => {
        loadStudentScheduleDetail();
    }, []);

    // Delete Parent Record
    const deleteRecord = (productId) => {
        axios.delete(`http://localhost:80/student_schedule/${productId}`)
            .then((res) => {
                console.log(res);
                loadStudentScheduleDetail();
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
                        <th class="admin">학생 이름</th>
                        <th class="admin">방과후수업 이름</th>
                        <th class="admin">Action</th>
                    </tr>
                </thead>
                <tbody class="admin">

                    {record.map((name) =>
                        <tr class="admin">
                            <td class="admin">{name.name}</td>
                            <td class="admin">{name.class_name}{'('}{name.day}{')'}</td>
                            <td class="admin">
                                <button class="delete"
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                            "'" + name.name + "'" + " 학생의 시간표를 정말 삭제하시겠습니까?"
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

export default StudentScheduleDetail;