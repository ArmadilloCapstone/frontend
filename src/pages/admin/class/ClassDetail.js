import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import swal from 'sweetalert';

function ClassDetail() {
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
  const loadClassDetail = async () => {
    await axios.post('http://dolbomi.site/dolbom_class')
      .then(function (response) {
        let item_list = response.data.map(function (el, idx) {
          console.log(el);


          var returnObj = {}
          returnObj['id'] = el.id;
          returnObj['class_name'] = el.class_name;
          returnObj['class_num'] = el.class_num;
          returnObj['year_seme'] = el.year_seme;

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
    loadClassDetail();
  }, []);

  // Delete Class Record
  const deleteRecord = (productId) => {
    axios.delete(`http://dolbomi.site/dolbom_class/${productId}`)
      .then((result) => {
        loadClassDetail();
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
  const sortByName = () => {
    let copy = [...record];
    copy.sort((a, b) => a.class_name.toUpperCase() < b.class_name.toUpperCase() ? -1 : 1);
    setRecord(copy);
    changePage(page, copy)
  }
  const sortByNum = () => {
    let copy = [...record];
    copy.sort((a, b) => a.class_num < b.class_num ? -1 : 1);
    setRecord(copy);
    changePage(page, copy)
  }


  return (
    <div>
      <div class="admin_sort">
        <button className="adminsortingButtons" onClick={() => sortByNum()}
        >번호순
        </button>
        <button className="adminsortingButtons" onClick={() => sortByName()}
        >이름순
        </button>
      </div>
      <section class="tableSection">
        <table class="admin">
          <thead class="admin">
            <tr class="admin">
              <th class="admin">학급 이름</th>
              <th class="admin">학급 번호</th>
              <th class="admin">년도-학기</th>
              <th class="admin">Action</th>
            </tr>
          </thead>
          <tbody class="admin">
            {currentrecord.map((name, idx) =>
              <tr class="admin" key={idx}>
                <td class="admin">{name.class_name}</td>
                <td class="admin">{name.class_num}</td>
                <td class="admin">{name.year_seme}</td>
                <td class="admin">
                  <button class="delete"
                    onClick={() => {
                      swal({
                        text: "'" + name.class_name + "'" + " 학급을 정말 삭제하시겠습니까?",
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

      </section >
    </div>
  )
}

export default ClassDetail;