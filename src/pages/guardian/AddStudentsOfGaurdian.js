import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddStudentsOfGaurdian(props) {
    const [edited, setEdited] = useState(props.data); // 선택한 row의 보호자 데이터 불러오기
    const [sudentsOfGuardian, setSudentsOfGuardian] = useState(edited.students); // 선택한 row의 보호자 데이터 불러오기
    console.log(edited);

    // 더미데이터, 빈 객체 배열로 변경 예정
    const [studentList, setStudentList] = useState([
        { id: 1, name: "a" }, { id: 2, name: "b" },
        { id: 3, name: "c" }, { id: 4, name: "d" }, { id: 5, name: "e" },
        { id: 6, name: "f" }
    ]);

    // 체크된 students 관리할 변수
    const [checkedList, setCheckedList] = useState([]);
    
    // 어떤 element가 체크된 상태인지 파악하기 위한 변수
    const [isChecked, setIsChecked] = useState(false);

    // 체크됐는지 확인 후, 리스트에 넣거나 제거
    const checkedItemHandler = (id, name, isChecked) => {
        if(isChecked) {
            setCheckedList([...checkedList, {id: id, name: name}]);
        }
        else {
            setCheckedList(checkedList.filter((item) => item.id !== id));
        }
        console.log(checkedList);
    }

    // 어떤 element의 체크 상태 업데이트
    const checkHandler = (e, id, name) => {
        setIsChecked(!isChecked);
        checkedItemHandler(id, name, e.target.checked)
    }
    
    // 기존의 student List 가져오기
    const loadStudentList = async () => {
        await axios.post('dolbomi.site/student')
            .then(function (response) {
                setStudentList(response.data.map(function (el, idx) {
                    console.log(el);

                    var returnObj = []
                    returnObj.push(el.name);

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
        let nowStudentList = [...edited.students] // 선택한 보호자의 학생 목록

        for (let i = 0; i < nowStudentList.length; i++) {
            for (let j = 0; j < studentList.length; j++) {
                if (nowStudentList[i].name === studentList[j].name) {
                    studentList.splice(j, 1);
                }
            }
        }
    };
    selectable();

    // 이름, 소속 변경 시
    const onInputChange = (e) => {
        setEdited({ ...edited, [e.target.name]: e.target.value });
    };

    // form 제출
    const submitGuardian = async (e) => {
        e.preventDefault();
        // e.target.reset();
        await axios.post("http://dolbomi.site/guardian_student_submit", edited); // 이름, 소속 수정 시 (edited의 student list 변경 불가)
        await axios.post("http://dolbomi.site/guardian_student_submit", checkedList); // (추가된 학생)
        console.log(edited);
        console.log(checkedList);

        alert('추가되었습니다!');
    };

    return (
        <form onSubmit={submitGuardian}>
            <div>
                <h2>{edited.name}의 정보 수정</h2>
            </div>
            <div>
                이름: <input type="text" name="name" value={edited.name} onChange={onInputChange} />
            </div>
            <div>
                소속: <input type="text" name="info" value={edited.info} onChange={onInputChange} />
            </div>

            <label class="select">추가할 학생(중복선택 가능)</label>
            {studentList.map((option, idx) => (

                <div key={idx}>
                    <input type="checkbox" name="students" id={option.id} onChange={ (e) => checkHandler(e, option.id, option.name)} />
                    {option.name}
                </div>
            ))
            }

            <div style={{ width: "100%", textAlign: "center" }}>
                <button type="submit" style={{ backgroundColor: "#12B560", border: "none", borderRadius: "5PX" }}>수정하기</button>
            </div>
        </form >
    )
}