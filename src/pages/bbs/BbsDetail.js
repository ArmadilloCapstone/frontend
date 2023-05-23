import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import BbsUpdate from "./BbsUpdate";
// import CommentWrite from "../comment/CommentWrite";
// import CommentList from "../comment/CommentList";
// import { AuthContext } from "../context/AuthProvider";



function BbsDetail() {

    // const { auth, setAuth } = useContext(AuthContext)

    const [bbs, setBbs] = useState({});
    const { seq } = useParams(); // 파라미터 가져오기

    const navigate = useNavigate();

    const getBbsDetail = async () => {

        await axios.post(`/news/${bbs.id}`)
            .then((resp) => {
                console.log("[BbsDetail.js] getBbsDetail() success :D");
                console.log(resp.data);

                setBbs(resp.data);
            })
            .catch((err) => {
                console.log("[BbsDetail.js] getBbsDetail() error :<");
                console.log(err);
            });

    }

    const deleteBbs = async () => {

        await axios.delete(`/news/${bbs.id}`)
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
                            <button className="btn btn-outline-secondary" onClick={BbsUpdate(bbs.id)}><i className="fas fa-edit"></i> 수정</button> &nbsp;
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
                        <img src={bbs.file_url} style={{width:"500px", height:"500px", margin:"20px"}}></img>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div className="my-3 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/Bbslist"><i className="fas fa-list"></i> 글목록</Link>
            </div><br /><br />

        </div>
    );
}

export default BbsDetail;