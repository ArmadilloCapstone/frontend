import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

function StudentScheduleDetail() {
    // Paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    const [record, setRecord] = useState([]);

    // On Page load display all records 
    const loadStudentScheduleDetail = async () => {
        await axios.post('http://dolbomi.site/student_schedule')
            .then(function (response) {
                setRecord(response.data.map(function (el, idx) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['id'] = el.id;
                    returnObj['name'] = el.name;
                    returnObj['class_name'] = el.class_name;
                    returnObj['day'] = el.day;
                    if(el.day === "월") returnObj['dayNum'] = 1;
                    else if(el.day === "화") returnObj['dayNum'] = 2;
                    else if(el.day === "수") returnObj['dayNum'] = 3;
                    else if(el.day === "목") returnObj['dayNum'] = 4;
                    else if(el.day === "금") returnObj['dayNum'] = 5;

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
        axios.delete(`http://dolbomi.site/student_schedule/${productId}`)
            .then((res) => {
                console.log(res);
                loadStudentScheduleDetail();
            })
            .catch(() => {
                alert('오류가 발생했습니다!');
            });
    };

    // 정렬 메소드
    const sortByStudentName = () => {
        let copy = [...record];
        copy.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1);
        setRecord(copy);
    }
    const sortByAfterClassName = () => {
        let copy = [...record];
        copy.sort((a, b) => {
            if (a.class_name.toUpperCase() > b.class_name.toUpperCase()) return 1;
            else if (a.class_name.toUpperCase() < b.class_name.toUpperCase()) return -1;
            else if (a.dayNum > b.dayNum) return 1;
            else if (a.dayNum < b.dayNum) return -1;
            return 0;
        })
        setRecord(copy);
    }

    return (
        <div>
            <div class="admin_sort">
                <button className="adminsortingButtons" onClick={() => sortByAfterClassName()}
                >방과후수업순
                </button>
                <button className="adminsortingButtons" onClick={() => sortByStudentName()}
                >학생이름순
                </button>
            </div>
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
        </div>
    )
}

export default StudentScheduleDetail;