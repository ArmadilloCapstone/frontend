import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import CommentWrite from "../comment/CommentWrite";
// import CommentList from "../comment/CommentList";
// import { AuthContext } from "../context/AuthProvider";



function BbsDetail() {

    // const { auth, setAuth } = useContext(AuthContext)

    const [bbs, setBbs] = useState({});
    const [files, setFiles] = useState([]);
    const { id } = useParams(); // 파라미터 가져오기

    const navigate = useNavigate();

    const getBbsDetail = async () => {
        console.log("hi")
        await axios.post(`http://dolbomi.site/news/${id}`)
            .then((resp) => {
                console.log("[BbsDetail.js] getBbsDetail() success :D");
                console.log(resp.data);

                setBbs(resp.data);
            })
            .catch((err) => {
                console.log("[BbsDetail.js] getBbsDetail() error :<");
                console.log(err);
            });
        await axios.post(`http://dolbomi.site/news/files/${id}`)
            .then((res) => {
                console.log("[BbsDetail.js] getBbsDetail() success :D");
                console.log(res.data);
                let arr = Array.from(res.data);
                console.log(arr);
                setFiles([]);
                for(let i = 0; i < arr.length; i++){
                    console.log(arr[i].originFileName)
                    setFiles((prevMessage) => ([
                        ...prevMessage,
                        arr[i]
                    ]));
                }
            })
            .catch((err) => {
                console.log("[BbsDetail.js] getBbsDetail() error :<");
                console.log(err);
            });

    }

    const deleteBbs = async () => {

        await axios.delete(`http://dolbomi.site/news/${id}`)
            .then((resp) => {
                console.log("[BbsDetail.js] deleteBbs() success :D");
                console.log(resp.data);

                alert("게시글을 성공적으로 삭제했습니다 :D");
                navigate("/bbslist");

            }).catch((err) => {
                console.log("[BbsDetail.js] deleteBbs() error :<");
                console.log(err);
            });

    }

    useEffect(() => {
        getBbsDetail();
        console.log(id)
    }, []);

    // const updateBbs = {
    //     id: bbs.id,
    //     title: bbs.title,
    //     text: bbs.text,
    //     file_url: bbs.file_url
    // }

    // const parentBbs = {
    //     id: bbs.id,
    //     title: bbs.title
    // }

    return (
        <div>

            <div className="my-3 d-flex justify-content-end">

                {
                    /* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
                        <>                            
                            <Link to={{ pathname: `/BbsUpdate/${id}` }}> { /* 게시글 상세 링크 */}
                                <span className="underline bbs-title" >수정 </span> { /* 게시글 제목 */}
                            </Link>
                            <button className="btn btn-outline-danger" onClick={deleteBbs}><i className="fas fa-trash-alt"></i> 삭제</button>
                        </>
                        
                }

            </div>

            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="col-3">번호</th>
                        <td>
                            <span>{bbs.id}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>제목</th>
                        <td>
                            <span>{bbs.title}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>작성일</th>
                        <td>
                            <span>{bbs.date}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>내용</th>
                        <td>
                            <div>
                                {bbs.text}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th className="col-3">첨부파일</th>
                        <td>
                            {
                                files.map((el) => {
                                    return <div>
                                                <div>{el.originFileName}</div>
                                                <div>
                                                    <a
                                                        href={"http://dolbomi.site/download/news/"+el.originFileName}
                                                        download
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        >
                                                            다운로드
                                                    </a>
                                                </div>
                                            </div>
                                })
                            }
                        </td>
                    </tr>

                </tbody>
            </table>

            <div className="my-3 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/BbsList"><i className="fas fa-list"></i> 글목록</Link>
            </div><br /><br />

        </div>
    );
}

export default BbsDetail;