import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Add.css"

export default function AddStudentsOfGaurdian(props) {
    const [edited, setEdited] = useState(props.data); // 선택한 row의 보호자 데이터 불러오기
    const [user, setUser] = useState({
        id: edited.id,
        name: edited.name,
        studentList: []
    });
    const { id, name, studentList } = user;
    console.log(edited);

    // 더미데이터, 빈 객체 배열로 변경 예정
    const [students, setStudents] = useState([]);

    // 체크된 studentList 관리할 변수
    const [checkedList, setCheckedList] = useState([]);

    // 어떤 element가 체크된 상태인지 파악하기 위한 변수
    const [isChecked, setIsChecked] = useState(false);

    // 체크됐는지 확인 후, 리스트에 넣거나 제거
    const checkedItemHandler = (id, name, isChecked) => {
        if (isChecked) {
            setCheckedList([...checkedList, { id: id, name: name }]);
            return true;
        }
        else {
            setCheckedList(checkedList.filter((item) => item.id !== id));
            return false;
        }
    }

    // 어떤 element의 체크 상태 업데이트
    const checkHandler = (e, id, name) => {
        setIsChecked(!isChecked);
        let checkValid = false;
        checkValid = checkedItemHandler(id, name, e.target.checked);
        if (checkValid === true) {
            setUser({
                ...user,
                serial_num: edited.serial_num,
                studentList: [...checkedList, { id: id, name: name }]
            });
        }
        else {
            setUser({
                ...user,
                serial_num: edited.serial_num,
                studentList: [...checkedList.filter((item) => item.id !== id)]
            });
        }
    }

    // 기존의 student List 가져오기
    const loadStudentList = async () => {
        await axios.post('http://dolbomi.site/guardianManage/studentList', edited)
            .then(function (response) {
                setStudents(response.data.map(function (el, idx) {
                    var returnObj = {}
                    returnObj['id'] = el.id;
                    returnObj['name'] = el.name;

                    return returnObj;
                }));
            }).catch(function (reason) {
                console.log(reason);
            });
    }
    useEffect(() => {
        loadStudentList();
    }, []);

    // 보호자의 학생 추가
    function selectable() {
        let nowStudentList = [...edited.studentList] // 선택한 보호자의 학생 목록

        for (let i = 0; i < nowStudentList.length; i++) {
            for (let j = 0; j < students.length; j++) {
                if (nowStudentList[i].name === students[j].name) {
                    students.splice(j, 1);
                }
            }
        }
    };
    selectable();

    // 이름, 소속 변경 시
    const onInputChange = (e) => {
        setEdited({ ...edited, [e.target.name]: e.target.value });
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    // form 제출
    const submitGuardian = async (e) => {
        e.preventDefault();
        // e.target.reset();

        await axios.post("http://dolbomi.site/guardianManage/student_submit", user);
        console.log(edited);
        console.log(checkedList);
        alert('추가되었습니다!');
        window.close(); //클로즈 먼저해야만 새로고침이 되었음
        window.location.reload();
    };

    return (
        <form onSubmit={submitGuardian}>
            <div>
                <h2 class="student-modal-title">{edited.name}의 정보 수정</h2>
            </div>
            <div class="guardian-form-item">
                <label class="guardian-label">이름</label>
                <input type="text" name="name" value={edited.name} onChange={onInputChange} />
            </div>
            <div class="guardian-form-item">
                <label class="guardian-label">소속</label>
                <input type="text" name="info" value={edited.info} onChange={onInputChange} />
            </div>

            <div class="guardian-label">추가할 학생(중복선택 가능)</div>
            <div class="guardian-form-item">
                <div class="guardian-checkbox-border">
                    {students.map((option, idx) => (

                        <label class="student-label" key={idx}>
                            <input type="checkbox" name="studentList" id={option.id} onChange={(e) => checkHandler(e, option.id, option.name)} />
                            {option.name}
                        </label>
                    ))
                    }
                </div>
            </div>


            <div>
                <button class="guardian-form-add" type="submit">수정하기</button>
            </div>
        </form >
    )
}