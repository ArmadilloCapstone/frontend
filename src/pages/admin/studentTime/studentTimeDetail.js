import '../adminPages.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import swal from 'sweetalert';

function StudentTimeDetail() {
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
                // console.log(i)
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
                // console.log(i)
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
    const loadStudentTimeDetail = async () => {
        await axios.post('http://dolbomi.site/student_time')
            .then(function (response) {
                let item_list = response.data.map(function (el, idx) {
                    // console.log(el);

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
                })
                // console.log(item_list)
                setRecord(item_list);
                setTotalCnt(response.data.length);
                // console.log(response.data.length)
                setCurrentrecord([]);
                if (response.data.length >= 10) {
                    // console.log("Hi")
                    item_list.map((el, idx) => {
                        // console.log(idx)
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
                // console.log(reason);
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
        copy.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1);
        setRecord(copy);
        changePage(page, copy)
    }
    const sortByMon = () => {
        let copy = [...record];
        copy.sort((a, b) => a.entry_1.toUpperCase() < b.entry_1.toUpperCase() ? -1 : 1);
        setRecord(copy);
        changePage(page, copy)
    }
    const sortByTue = () => {
        let copy = [...record];
        copy.sort((a, b) => a.entry_2.toUpperCase() < b.entry_2.toUpperCase() ? -1 : 1);
        setRecord(copy);
        changePage(page, copy)
    }
    const sortByWed = () => {
        let copy = [...record];
        copy.sort((a, b) => a.entry_3.toUpperCase() < b.entry_3.toUpperCase() ? -1 : 1);
        setRecord(copy);
        changePage(page, copy)
    }
    const sortByThu = () => {
        let copy = [...record];
        copy.sort((a, b) => a.entry_4.toUpperCase() < b.entry_4.toUpperCase() ? -1 : 1);
        setRecord(copy);
        changePage(page, copy)
    }
    const sortByFri = () => {
        let copy = [...record];
        copy.sort((a, b) => a.entry_5.toUpperCase() < b.entry_5.toUpperCase() ? -1 : 1);
        setRecord(copy);
        changePage(page, copy)
    }


    return (
        <div>
            <div class="admin_sort">
                <button className="adminsortingButtons" onClick={() => sortByFri()}
                >시간순(금)
                </button>
                <button className="adminsortingButtons" onClick={() => sortByThu()}
                >시간순(목)
                </button>
                <button className="adminsortingButtons" onClick={() => sortByWed()}
                >시간순(수)
                </button>
                <button className="adminsortingButtons" onClick={() => sortByTue()}
                >시간순(화)
                </button>
                <button className="adminsortingButtons" onClick={() => sortByMon()}
                >시간순(월)
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

                        {currentrecord.map((name) =>
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
                                            swal({
                                                text: "'" + name.name + "'" + "의 출입시간을 정말 삭제하시겠습니까?",
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

export default StudentTimeDetail;