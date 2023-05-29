import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

import "./bbslist.css";
import "./bbspage.css";

function BbsList() {

    // DB에 저장되어 있는 news 리스트 가져오기 위한 변수
    const [bbsList, setBbsList] = useState([]);
    const [currentbbsList, setCurrentbbsList] = useState([]);

    // 검색용 Hook
    const [choiceVal, setChoiceVal] = useState("");
    const [searchVal, setSearchVal] = useState("");

    // Paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    // Link 용 (함수) 
    let navigate = useNavigate();

    /* [POST /bbs]: 게시글 목록 가져오기 */
    const loadBbsList = async (choice, search) => {
        if (choice === "all" && search === "all") {
            await axios.post('http://dolbomi.site/BbsList', {
                id : localStorage.getItem('userid')
            })
                .then((res) => {
                    console.log("[BbsList.js] useEffect() 성공");
                    console.log(res.data);

                    setBbsList(res.data);
                    setTotalCnt(res.data.length);
                    console.log(res.data.length)
                    setCurrentbbsList([]);
                    if(res.data.length >= 10){
                        console.log("Hi")
                        res.data.map((el, idx) => {
                            console.log(idx)
                            if(idx < 10){
                                setCurrentbbsList((prev) => ([
                                    ...prev,
                                    el
                                ]));
                            }
                        })
                    }
                    else{
                        res.data.map((el) => {
                            setCurrentbbsList((prev) => ([
                                ...prev,
                                el
                            ]));
                        })
                    }
                })
                .catch((err) => {
                    console.log("[BbsList.js] useEffect() 실패");
                    console.log(err);

                });
        }

        else {
            console.log(searchVal, choiceVal)
            await axios.post(`http://dolbomi.site/BbsList/search`, {
                teacher_id : localStorage.getItem('userid'),
                keyword : searchVal,
                option : choiceVal
            })
                .then((res) => {
                    console.log("[BbsList.js] useEffect() 성공");
                    console.log(res.data);

                    setBbsList(res.data);
                    setTotalCnt((res.data.length));
                    console.log(res.data.length)
                    setCurrentbbsList([]);
                    if(res.data.length >= 10){
                        console.log("Hi")
                        res.data.map((el, idx) => {
                            console.log(idx)
                            if(idx < 10){
                                setCurrentbbsList((prev) => ([
                                    ...prev,
                                    el
                                ]));
                            }
                        })
                    }
                    else{
                        res.data.map((el) => {
                            setCurrentbbsList((prev) => ([
                                ...prev,
                                el
                            ]));
                        })
                    }
                })
                .catch((err) => {
                    console.log("[BbsList.js] useEffect() 실패");
                    console.log(err);

                });
        }
    }

    useEffect(() => {
        loadBbsList("all", "all");
    }, []);


    const changeChoice = (event) => { setChoiceVal(event.target.value); }
    const changeSearch = (event) => { setSearchVal(event.target.value); }
    const search = () => {
        console.log("[BbsList.js searchBtn()] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

        navigate("/Bbslist");
        loadBbsList(choiceVal, searchVal);
    }

    const changePage = (page) => {
        setPage(page);
        setCurrentbbsList([]);
        for(let i = (page-1) * 10; i < (page) * 10; i++){
            console.log(i)
            if(bbsList[i] != null){
                setCurrentbbsList((prev) => ([
                    ...prev,
                    bbsList[i]
                ]));
            }
        }
    }


    return (

        <section class="BbListSection" style={{ fontFamily: "Eorinai" }}>

            <table class="BbListSearch">
                <tbody class="BbListSearch">
                    <tr class="BbListSearch">
                        <td class="BbListSearch">
                            <select class="BbListSearch" value={choiceVal} onChange={changeChoice}>
                                <option>검색 옵션</option>
                                <option value="title">제목</option>
                                <option value="text">내용</option>

                            </select>
                        </td>
                        <td class="BbListSearch">
                            <input class="BbList" type="text" placeholder="검색어" value={searchVal} onChange={changeSearch} />
                        </td>
                        <td class="BbListSearch">
                            <button class="BbList" type="button" onClick={search}><i className="fas fa-search"></i>검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table class="BbList" >
                <thead class="BbList">
                    <tr class="BbList">
                        <th class="BbList">번호</th>
                        <th class="BbList">제목</th>
                        <th class="BbList">작성일시</th>
                    </tr>
                </thead>

                <tbody class="BbList" style={{ fontFamily: "Eorinai" }}>
					{
						currentbbsList.map(function (bbs, idx) {
							return (
								<TableRow obj={bbs} key={idx} cnt={idx + 1} />
							)
						})
					}
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

            <div className="my-5 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/Bbswrite"><i className="fas fa-pen"></i>글쓰기</Link>
            </div>

        </section>
    );
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
    const bbs = props.obj;

    return (
        <tr class="BbList">

            <th class="BbList">{props.cnt}</th>
            {
                    <>
                        <td class="BbList" >

                            <Link to={{ pathname: `/BbsDetail/${bbs.id}` }}> { /* 게시글 상세 링크 */}
                                <span className="underline bbs-title" >{bbs.title} </span> { /* 게시글 제목 */}
                            </Link>
                        </td>
                        <td class="BbList">{bbs.date}</td>
                    </>
                    
            }


        </tr>

    );
}

export default BbsList;