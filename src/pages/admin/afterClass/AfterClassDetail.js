import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import swal from 'sweetalert';

function AfterClassDetail() {
  const [record, setRecord] = useState([]);
  const [currentrecord, setCurrentrecord] = useState([]);

  // Paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const changePage = (page, copy) => {
    if (copy != undefined) {
      setPage(page);
      setCurrentrecord([]);
      for (let i = (page - 1) * 10; i < (page) * 10; i++) {
        console.log(i)
        if (copy[i] != null) {
          setCurrentrecord((prev) => ([
            ...prev,
            copy[i]
          ]));
        }
      }
    }
    else {
      setPage(page);
      setCurrentrecord([]);
      for (let i = (page - 1) * 10; i < (page) * 10; i++) {
        console.log(i)
        if (record[i] != null) {
          setCurrentrecord((prev) => ([
            ...prev,
            record[i]
          ]));
        }
      }
    }
  }

  // On Page load display all records 
  const loadAfterClassDetail = async () => {
    await axios.post('http://dolbomi.site/after_school_class')
      .then(function (response) {
        let item_list = response.data.map(function (el, idx) {
          console.log(el);

          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['class_name'] = el.class_name;
          returnObj['start_time'] = el.start_time;
          returnObj['end_time'] = el.end_time;
          returnObj['day'] = el.day;
          if (el.day === "월") returnObj['dayNum'] = 1;
          else if (el.day === "화") returnObj['dayNum'] = 2;
          else if (el.day === "수") returnObj['dayNum'] = 3;
          else if (el.day === "목") returnObj['dayNum'] = 4;
          else if (el.day === "금") returnObj['dayNum'] = 5;

          return returnObj;
        })
        console.log(item_list)
        setRecord(item_list);
        setTotalCnt(response.data.length);
        console.log(response.data.length)
        setCurrentrecord([]);
        if (response.data.length >= 10) {
          console.log("Hi")
          item_list.map((el, idx) => {
            console.log(idx)
            if (idx < 10) {
              setCurrentrecord((prev) => ([
                ...prev,
                el
              ]));
            }
          })
        }
        else {
          item_list.map((el) => {
            setCurrentrecord((prev) => ([
              ...prev,
              el
            ]));
          })
        };
      }).catch(function (reason) {
        console.log(reason);
      });
  }

  useEffect(() => {
    loadAfterClassDetail();
  }, []);

  // Delete After Class Record
  const deleteRecord = (productId) => {
    axios.delete(`http://dolbomi.site/after_school_class/${productId}`)
      .then((response) => {
        if (response.data === "success") {
          loadAfterClassDetail();
        }
        else {
          swal({
            text: response.data,
            icon: "error",
            timer: 3000,
            dangerMode: true,
            button: "확인"
          })
        }
      })
      .catch(() => {
        swal({
          title: "오류가 발생했습니다!",
          icon: "error",
          timer: 3000,
          dangerMode: true,
          button: "확인"
        })
      });
  };

  // 정렬 메소드
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
    changePage(page, copy)
  }
  const sortByAfterClassTime = () => {
    let copy = [...record];
    copy.sort((a, b) => a.start_time.toUpperCase() < b.start_time.toUpperCase() ? -1 : 1);
    setRecord(copy);
    changePage(page, copy)
  }
  const sortByDay = () => {
    let copy = [...record];
    copy.sort((a, b) => {
      if (a.dayNum > b.dayNum) return 1;
      else if (a.dayNum < b.dayNum) return -1;
      else if (a.class_name.toUpperCase() > b.class_name.toUpperCase()) return 1;
      else if (a.class_name.toUpperCase() < b.class_name.toUpperCase()) return -1;
      return 0;
    })
    setRecord(copy);
    changePage(page, copy)
  }

  return (
    <div>
      <div class="admin_sort">
        <button className="adminsortingButtons" onClick={() => sortByDay()}
        >요일순
        </button>
        <button className="adminsortingButtons" onClick={() => sortByAfterClassTime()}
        >시간순
        </button>
        <button className="adminsortingButtons" onClick={() => sortByAfterClassName()}
        >이름순
        </button>
      </div>
      <section class="tableSection">
        <table class="admin">
          <thead class="admin">
            <tr class="admin">
              <th class="admin">수업 이름</th>
              <th class="admin">시작 시간</th>
              <th class="admin">종료 시간</th>
              <th class="admin">요일</th>
              <th class="admin">Action</th>
            </tr>
          </thead>
          <tbody class="admin">

            {currentrecord.map((name) =>
              <tr class="admin">
                <td class="admin">{name.class_name}</td>
                <td class="admin">{name.start_time}</td>
                <td class="admin">{name.end_time}</td>
                <td class="admin">{name.day}</td>
                <td class="admin">
                  <button class="delete"
                    onClick={() => {
                      swal({
                        text: "'" + name.class_name + "'" + " 방과후수업을 정말 삭제하시겠습니까?",
                        icon: "warning",
                        closeOnClickOutside: false,
                        dangerMode: true,
                        buttons: ["취소", "확인"]
                      }).then((result) => {
                        if (result === true) {
                          deleteRecord(name.id)
                        }
                      })
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

      </section>
    </div>
  )
}

export default AfterClassDetail;