import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

import "./gallerylist.css";
import "./gallerypage.css";

function ParentGalleryList() {

    // DB에 저장되어 있는 news 리스트 가져오기 위한 변수
    const [galleryList, setGalleryList] = useState([]);
    const [currentgalleryList, setCurrentgalleryList] = useState([]);

    // 검색용 Hook
    const [choiceVal, setChoiceVal] = useState("");
    const [searchVal, setSearchVal] = useState("");

    // Paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    // Link 용 (함수) 
    let navigate = useNavigate();

    /* [POST /gallery]: 게시글 목록 가져오기 */
    const loadGalleryList = async (choice, search) => {
        if (choice === "all" && search === "all") {
            await axios.post('http://dolbomi.site/GalleryList', {
                parent_id: localStorage.getItem('userid')
            })
                .then((res) => {
                    console.log("[GalleryList.js] useEffect() 성공");
                    console.log(res.data);

                    setGalleryList(res.data);
                    setTotalCnt(res.data.length);
                    console.log(res.data.length)
                    setCurrentgalleryList([]);
                    if (res.data.length >= 10) {
                        console.log("Hi")
                        res.data.map((el, idx) => {
                            console.log(idx)
                            if (idx < 10) {
                                setCurrentgalleryList((prev) => ([
                                    ...prev,
                                    el
                                ]));
                            }
                        })
                    }
                    else {
                        res.data.map((el) => {
                            setCurrentgalleryList((prev) => ([
                                ...prev,
                                el
                            ]));
                        })
                    }
                })
                .catch((err) => {
                    console.log("[GalleryList.js] useEffect() 실패");
                    console.log(err);

                });
        }

        else {
            console.log(searchVal, choiceVal)
            await axios.post(`http://dolbomi.site/GalleryList/search`, {
                parent_id: localStorage.getItem('userid'),
                keyword: searchVal,
                option: choiceVal
            })
                .then((res) => {
                    console.log("[GalleryList.js] useEffect() 성공");
                    console.log(res.data);

                    setGalleryList(res.data);
                    setTotalCnt((res.data.length));
                    console.log(res.data.length)
                    setCurrentgalleryList([]);
                    if (res.data.length >= 10) {
                        console.log("Hi")
                        res.data.map((el, idx) => {
                            console.log(idx)
                            if (idx < 10) {
                                setCurrentgalleryList((prev) => ([
                                    ...prev,
                                    el
                                ]));
                            }
                        })
                    }
                    else {
                        res.data.map((el) => {
                            setCurrentgalleryList((prev) => ([
                                ...prev,
                                el
                            ]));
                        })
                    }
                })
                .catch((err) => {
                    console.log("[GalleryList.js] useEffect() 실패");
                    console.log(err);

                });
        }
    }

    useEffect(() => {
        loadGalleryList("all", "all");
    }, []);

    galleryList.sort((a, b) => b.id - a.id);
    currentgalleryList.sort((a, b) => b.id - a.id); // 최신순 정렬

    const changeChoice = (event) => { setChoiceVal(event.target.value); }
    const changeSearch = (event) => { setSearchVal(event.target.value); }
    const search = () => {
        console.log("[GalleryList.js searchBtn()] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

        navigate("/ParentGallerylist");
        loadGalleryList(choiceVal, searchVal);
    }

    const changePage = (page) => {
        setPage(page);
        setCurrentgalleryList([]);
        for (let i = (page - 1) * 10; i < (page) * 10; i++) {
            console.log(i)
            if (galleryList[i] != null) {
                setCurrentgalleryList((prev) => ([
                    ...prev,
                    galleryList[i]
                ]));
            }
        }
    }


    return (

        <section class="BbListSection" style={{ fontFamily: "Eorinai" }}>
            <div className="BbSearchContainer">
                <select class="BbListSearch-1" value={choiceVal} onChange={changeChoice}>
                    <option>검색 옵션</option>
                    <option value="title">제목</option>
                    <option value="text">내용</option>
                </select>
                <input class="BbListSearch-2" type="text" placeholder="검색어" value={searchVal} onChange={changeSearch} />
                <div className="BbButton">
                    <button class="BbListSearch-3" type="button" onClick={search}>검색</button>
                </div>
            </div>

            <table class="BbList-0"  >
                <thead class="BbList-0" >
                    <tr class="BbList" >
                        <th >번호</th>
                        <th >제목</th>
                        <th >작성일시</th>
                    </tr>
                </thead>






                <tbody style={{ fontFamily: "Eorinai" }}>
                    {
                        currentgalleryList.map(function (bbs, idx) {
                            return (
                                <TableRow obj={bbs} key={idx} cnt={idx + 1} page={page} />
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


        </section>
    );
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
    const gallery = props.obj;

    return (
        <tr class="BbList">

            <th class="BbList">{props.cnt + ((props.page - 1) * 10)}</th>
            {
                <>
                    <td class="BbList" >

                        <Link to={{ pathname: `/ParentGalleryDetail/${gallery.id}` }}> { /* 게시글 상세 링크 */}
                            <span className="underline gallery-title" >{gallery.title} </span> { /* 게시글 제목 */}
                        </Link>
                    </td>
                    <td class="BbList">{gallery.date}</td>
                </>

            }


        </tr>

    );
}

export default ParentGalleryList;