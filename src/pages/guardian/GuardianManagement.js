import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import AddGuardian from './AddGuardian';
import AddStudentsOfGaurdian from './AddStudentsOfGaurdian';

export default function GuardianManagement() {
    // 모달창 나타내기 위한 변수들
    const [selected, setSelected] = useState()
    const [addGuardian, setAddGuardian] = useState(false); // 새로운 보호자 추가
    const [addstudentList, setAddstudentList] = useState(false); // 기존 보호자의 학생명단 추가

    // 더미데이터, 빈 객체 배열로 변경 예정
    const [guardianList, setGuardianList] = useState([
        // { id: 1, name: "보호자1", info: "학원1", serial_num: 111111, studentList: [{ id: 1, name: "a" }, { id: 2, name: "b" }] },
        // { id: 2, name: "보호자2", info: "학원2", serial_num: 222222, studentList: [{ id: 3, name: "c" }, { id: 4, name: "d" }, { id: 5, name: "e" }] },
        // { id: 3, name: "보호자3", info: "학원3", serial_num: 333333, studentList: [{ id: 6, name: "f" }] }
    ]);

    // 기존의 guardian List 가져오기
    const loadGuardianList = async () => {
        await axios.post('http://dolbomi.site/guardianManage')
            .then(function (response) {
                setGuardianList(response.data.map(function (el, id) {
                    console.log(el);

                    var returnObj = {}
                    returnObj['id'] = el.id;
                    returnObj['name'] = el.name;
                    returnObj['info'] = el.info;
                    returnObj['serial_num'] = el.serial_num;
                    returnObj['studentList'] = el.studentList; // 서버에서 guardian의 id == student_of_guardian의 guardian id 조건으로 데이터 찾아서 전송해줘야 할듯?

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }
    useEffect(() => {
        loadGuardianList();
    }, []);

    // 보호자 삭제
    const deleteGuardian = (productId) => {
        axios.delete(`http://dolbomi.site/guardianManage/guardian/${productId}`)
            .then((result) => {
                loadGuardianList();
            })
            .catch(() => {
                alert('오류가 발생했습니다!');
            });
    };

    // 보호자의 학생 삭제 (버튼 클릭 이벤트, ui 지저분해서 학생 이름을 버튼으로 만듦!)
    const deleteStudent = (guardian_id,student_id) => {
        axios.delete(`http://dolbomi.site/guardianManage/student/${guardian_id}/${student_id}`)
            .then((result) => {
                loadGuardianList();
            })
            .catch(() => {
                alert('오류가 발생했습니다!');
            });
    };


    const onEdit = (guardian) => {
        let data = {
            id: guardian.id,
            name: guardian.name,
            info: guardian.info,
            serial_num: guardian.serial_num,
            studentList: guardian.studentList
        };
        console.log(data);
        setSelected(data);
    }

    return (
        <section class="tableSection">
            <button class="delete" onClick={() => setAddGuardian(!addGuardian)}>
                + 새로운 보호자 추가
            </button>
            
            {addGuardian && (
                <Modal closeModal={() => setAddGuardian(!addGuardian)}>
                    <AddGuardian />
                </Modal>
            )}

            <table class="admin">
                <thead class="admin">
                    <tr class="admin">
                        <th class="admin">이름</th>
                        <th class="admin">소속</th>
                        <th class="admin">일련번호</th>
                        <th class="admin">학생 명단</th>
                        <th class="admin">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {guardianList.map((el, id) =>
                        <tr class="admin">
                            <td class="admin">{el.name}</td>
                            <td class="admin">{el.info}</td>
                            <td class="admin">{el.serial_num}</td>
                            <td class="admin">
                                {el.studentList.map((stu_el) =>
                                    <>
                                        {stu_el.name}&nbsp;
                                        <button style={{backgroundColor:"red", border:"none", borderRadius:"5PX"}} onClick={() => {
                                            const confirmBox = window.confirm(
                                                "'" + stu_el.name + "'" + " 학생을 정말 삭제하시겠습니까?"
                                            )
                                            if (confirmBox === true) {
                                                deleteStudent(el.id, stu_el.id)
                                            }
                                        }}>-</button>&nbsp;&nbsp;
                                    </>
                                )}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <button className="btn btn-primary" onClick={() => {
                                    setAddstudentList(!addstudentList)
                                    onEdit(el);
                                }}>추가
                                </button>
                                {/* {addstudentList && (
                                    <Modal closeModal={() => setAddstudentList(!addstudentList)}>
                                        <AddStudentsOfGaurdian data={selected} />
                                    </Modal>
                                )} */}
                            </td>

                            <td class="admin">
                                <button class="delete"
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                            "'" + el.name + "'" + " 보호자를 정말 삭제하시겠습니까?"
                                        )
                                        if (confirmBox === true) {
                                            deleteGuardian(el.id)
                                        }
                                    }}>보호자 삭제
                                </button>

                            </td>
                        </tr>
                    )}
                    {addstudentList && (
                        <Modal closeModal={() => setAddstudentList(!addstudentList)}>
                            <AddStudentsOfGaurdian data={selected} />
                        </Modal>
                    )}
                </tbody>
            </table>

        </section>
    )
}