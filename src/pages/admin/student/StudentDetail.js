import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

function StudentDetail() {
  const [record, setRecord] = useState([]);
  const [currentrecord, setCurrentrecord] = useState([]);

    // Paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const changePage = (page, copy) => {
      if(copy != undefined){
        setPage(page);
        setCurrentrecord([]);
        for(let i = (page-1) * 10; i < (page) * 10; i++){
            console.log(i)
            if(copy[i] != null){
                setCurrentrecord((prev) => ([
                    ...prev,
                    copy[i]
                ]));
            }
        }
      }
      else{
        setPage(page);
        setCurrentrecord([]);
        for(let i = (page-1) * 10; i < (page) * 10; i++){
            console.log(i)
            if(record[i] != null){
                setCurrentrecord((prev) => ([
                    ...prev,
                    record[i]
                ]));
            }
        }
      }
  }
  // On Page load display all records 
  const loadStudentDetail = async () => {
    await axios.post('http://dolbomi.site/student') // student와 parent를 연결해서 어떻게 데이터를 가져오는 거지? db 쿼리로 처리하는 건가?
      .then(function (response) {
        let item_list = response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['name'] = el.name;
          returnObj['grade'] = el.grade;
          returnObj['phone_num'] = el.phone_num;
          returnObj['gender'] = el.gender;
          returnObj['class_name'] = el.class_name;
          returnObj['original_class_num'] = el.original_class_num;
          returnObj['birth_date'] = el.birth_date;

          return returnObj;
        })
        console.log(item_list)
        setRecord(item_list);
        setTotalCnt(response.data.length);
        console.log(response.data.length)
        setCurrentrecord([]);
        if(response.data.length >= 10){
            console.log("Hi")
            item_list.map((el, idx) => {
                console.log(idx)
                if(idx < 10){
                  setCurrentrecord((prev) => ([
                        ...prev,
                        el
                    ]));
                }
            })
        }
        else{
          item_list.map((el) => {
            setCurrentrecord((prev) => ([
                    ...prev,
                    el
                ]));
            })
        }
      }).catch(function (reason) {
        console.log(reason);
      });

  }
  useEffect(() => {
    loadStudentDetail();
  }, []);

  // Delete Student Record
  const deleteRecord = (productId) => {
    axios.delete(`http://dolbomi.site/student/${productId}`)
      .then((result) => {
        loadStudentDetail();
      })
      .catch(() => {
        alert('오류가 발생했습니다!');
      });
  };

  // 정렬 메소드
  const sortByName = () => {
    let copy = [...record];
    copy.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1);
    setRecord(copy);
    changePage(page, copy)
  }
  const sortByGrade = () => {
    let copy = [...record];
    copy.sort((a, b) => a.grade < b.grade ? -1 : 1);
    setRecord(copy);
    changePage(page, copy)
  }
  const sortByDolbom = () => {
    let copy = [...record];
    copy.sort((a, b) => a.class_name.toUpperCase() < b.class_name.toUpperCase() ? -1 : 1);
    setRecord(copy);
    changePage(page, copy)
  }
  const sortByOriginal = () => {
    let copy = [...record];
    copy.sort((a, b) => a.original_class_num < b.original_class_num ? -1 : 1);
    setRecord(copy);
    changePage(page, copy)
  }

  return (
    <div>
      <div class="admin_sort">
        <button className="adminsortingButtons" onClick={() => sortByOriginal()}
        >기존학급순
        </button>
        <button className="adminsortingButtons" onClick={() => sortByDolbom()}
        >돌봄학급순
        </button>
        <button className="adminsortingButtons" onClick={() => sortByGrade()}
        >학년순
        </button>
        <button className="adminsortingButtons" onClick={() => sortByName()}
        >이름순
        </button>
      </div>
      <section class="tableSection">
        <table class="admin">
          <thead class="admin">
            <tr class="admin">
              <th class="admin">이름</th>
              <th class="admin">학년</th>
              <th class="admin">연락처</th>
              <th class="admin">성별</th>
              <th class="admin">돌봄 반</th>
              <th class="admin">기존 반</th>
              <th class="admin">생년월일</th>
              <th class="admin">Action</th>
            </tr>
          </thead>
          <tbody>

            {currentrecord.map((name) =>
              <tr class="admin">
                <td class="admin">{name.name}</td>
                <td class="admin">{name.grade}</td>
                <td class="admin">{name.phone_num}</td>
                <td class="admin">{name.gender}</td>
                <td class="admin">{name.class_name}</td>
                <td class="admin">{name.original_class_num}</td>
                <td class="admin">{name.birth_date}</td>
                <td class="admin">
                  <button class="delete"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "'" + name.name + "'" + " 돌봄학생을 정말 삭제하시겠습니까?"
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
        <Pagination className="pagination"
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={changePage} />

      </section >
    </div>
  )
}

export default StudentDetail;