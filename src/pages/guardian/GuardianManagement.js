import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import AddGuardian from './AddGuardian';
import AddStudentsOfGaurdian from './AddStudentsOfGaurdian';
import "./Guardian.css"
import swal from 'sweetalert';

export default function GuardianManagement() {
    // 모달창 나타내기 위한 변수들
    const [selected, setSelected] = useState()
    const [addGuardian, setAddGuardian] = useState(false); // 새로운 보호자 추가
    const [addstudentList, setAddstudentList] = useState(false); // 기존 보호자의 학생명단 추가

    const [guardianList, setGuardianList] = useState([]);

    // 기존의 guardian List 가져오기
    const loadGuardianList = async () => {
        await axios.post('http://dolbomi.site/guardianManage')
            .then(function (response) {
                setGuardianList(response.data.map(function (el, id) {
                    // console.log(el);

                    var returnObj = {}
                    returnObj['id'] = el.id;
                    returnObj['name'] = el.name;
                    returnObj['info'] = el.info;
                    returnObj['serial_num'] = el.serial_num;
                    returnObj['studentList'] = el.studentList;

                    return returnObj;
                }));
            }).catch(function (reason) {
                // console.log(reason);
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

    // 보호자의 학생 삭제
    const deleteStudent = (guardian_id, student_id) => {
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
        // console.log(data);
        setSelected(data);
    }

    return (
        <section class="guardianSection">
            <button class="guardian-add-button" onClick={() => setAddGuardian(!addGuardian)}>
                보호자 추가
            </button>

            {addGuardian && (
                <Modal closeModal={() => setAddGuardian(!addGuardian)}>
                    <AddGuardian />
                </Modal>
            )}

            <table class="guardian">
                <thead class="guardian">
                    <tr class="guardian">
                        <th class="guardian">이름</th>
                        <th class="guardian">소속</th>
                        <th class="guardian">일련번호</th>
                        <th class="guardian">학생 명단</th>
                        <th class="guardian">Action</th>
                    </tr>
                </thead>
                <tbody class="guardian">

                    {guardianList.map((el, id) =>
                        <tr class="guardian">
                            <td class="guardian">{el.name}</td>
                            <td class="guardian">{el.info}</td>
                            <td class="guardian">{el.serial_num}</td>
                            <td class="guardian">
                                {el.studentList.map((stu_el) =>
                                    <>
                                        {stu_el.name}&nbsp;
                                        <button class="delete-student-button" onClick={() => {
                                            swal({
                                                text: "'" + stu_el.name + "'" + " 학생을 정말 삭제하시겠습니까?",
                                                icon: "warning",
                                                closeOnClickOutside: false,
                                                dangerMode: true,
                                                buttons: ["취소", "확인"]
                                            }).then((result) => {
                                                if (result === true) {
                                                    deleteStudent(el.id, stu_el.id)
                                                }
                                            })
                                        }}>-</button>&nbsp;&nbsp;
                                    </>
                                )}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <button class="add-student-button" onClick={() => {
                                    setAddstudentList(!addstudentList)
                                    onEdit(el);
                                }}>수정
                                </button>
                            </td>

                            <td class="guardian">
                                <button class="delete-guardian-button"
                                    onClick={() => {
                                        swal({
                                            text: "'" + el.name + "'" + " 보호자를 정말 삭제하시겠습니까?",
                                            icon: "warning",
                                            closeOnClickOutside: false,
                                            dangerMode: true,
                                            buttons: ["취소", "확인"]
                                        }).then((result) => {
                                            if (result === true) {
                                                deleteGuardian(el.id)
                                            }
                                        })
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