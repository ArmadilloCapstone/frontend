import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./bbslist.css";
import "./bbspage.css";
import { useHistory } from 'react-router-dom';


function BbsDetail() {
    const [bbs, setBbs] = useState({});
    const [files, setFiles] = useState([]);
    const { id } = useParams(); // 파라미터 가져오기

    const navigate = useNavigate();

    const getBbsDetail = async () => {
        console.log("hi")
        await axios.post(`http://localhost/news/${id}`)
            .then((resp) => {
                console.log("[BbsDetail.js] getBbsDetail() success :D");
                console.log(resp.data);

                setBbs(resp.data);
            })
            .catch((err) => {
                console.log("[BbsDetail.js] getBbsDetail() error :<");
                console.log(err);
            });
        await axios.post(`http://localhost/news/files/${id}`)
            .then((res) => {
                console.log("[BbsDetail.js] getBbsDetail() success :D");
                console.log(res.data);
                let arr = Array.from(res.data);
                console.log(arr);
                setFiles([]);
                for (let i = 0; i < arr.length; i++) {
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

        await axios.delete(`http://localhost/news/${id}`)
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

    return (
        <div className="detailPage" style={{ fontFamily: "Eorinai" }}>


                <Link className="change-detail" to={{ pathname: `/BbsUpdate/${id}` }}>
                    <span  >수정 </span>
                </Link>
                



                <button className="delete-detail" onClick={deleteBbs}><i className="fas fa-trash-alt"></i> 삭제</button>
            <table className="table table-striped" style={{ fontFamily: "Eorinai" }} >
                <tbody style={{ color: "#555555" }} >
                    <tr>
                        <th>번호</th>
                        <td>
                            <span>{bbs.id}</span>a
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
                                                href={"http://dolbomi.site/download/news/" + el.originFileName}
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