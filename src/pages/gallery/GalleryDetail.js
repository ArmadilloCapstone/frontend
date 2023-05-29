import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import CommentWrite from "../comment/CommentWrite";
// import CommentList from "../comment/CommentList";
// import { AuthContext } from "../context/AuthProvider";



function GalleryDetail() {

    // const { auth, setAuth } = useContext(AuthContext)

    const [gallery, setGallery] = useState({});
    const [files, setFiles] = useState([]);
    const { id } = useParams(); // 파라미터 가져오기

    const navigate = useNavigate();

    const getGalleryDetail = async () => {
        console.log("hi")
        await axios.post(`http://localhost:80/album/${id}`)
            .then((resp) => {
                console.log("[GalleryDetail.js] getGalleryDetail() success :D");
                console.log(resp.data);

                setGallery(resp.data);
                setFiles(resp.data.file_url);
            })
            .catch((err) => {
                console.log("[GalleryDetail.js] getGalleryDetail() error :<");
                console.log(err);
            });
        // await axios.post(`http://localhost:80/album/files/${id}`)
        //     .then((res) => {
        //         console.log("[GalleryDetail.js] getGalleryDetail() success :D");
        //         console.log(res.data);
        //         let arr = Array.from(res.data);
        //         console.log(arr);
        //         for(let i = 0; i < arr.length; i++){
        //             console.log(arr[i].originFileName)
        //             setFiles((prevMessage) => ([
        //                 ...prevMessage,
        //                 arr[i]
        //             ]));
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("[GalleryDetail.js] getGalleryDetail() error :<");
        //         console.log(err);
        //     });

    }

    const deleteGallery = async () => {

        await axios.delete(`http://localhost:80/album/${id}`)
            .then((resp) => {
                console.log("[GalleryDetail.js] deleteGallery() success :D");
                console.log(resp.data);

                alert("게시글을 성공적으로 삭제했습니다 :D");
                navigate("/gallerylist");

            }).catch((err) => {
                console.log("[GalleryDetail.js] deleteGallery() error :<");
                console.log(err);
            });

    }

    useEffect(() => {
        getGalleryDetail();
        console.log(id)
    }, []);

    // const updateGallery = {
    //     id: gallery.id,
    //     title: gallery.title,
    //     text: gallery.text,
    //     file_url: gallery.file_url
    // }

    // const parentGallery = {
    //     id: gallery.id,
    //     title: gallery.title
    // }

    return (
        <div>

            <div className="my-3 d-flex justify-content-end">

                {
                    /* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
                        <>                            
                            <Link to={{ pathname: `/GalleryUpdate/${id}` }}> { /* 게시글 상세 링크 */}
                                <span className="underline gallery-title" >수정 </span> { /* 게시글 제목 */}
                            </Link>
                            <button className="btn btn-outline-danger" onClick={deleteGallery}><i className="fas fa-trash-alt"></i> 삭제</button>
                        </>
                        
                }

            </div>

            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="col-3">번호</th>
                        <td>
                            <span>{gallery.id}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>제목</th>
                        <td>
                            <span>{gallery.title}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>작성일</th>
                        <td>
                            <span>{gallery.uploaded_date}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>내용</th>
                        <td>
                            <div>
                                {gallery.contents}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th className="col-3">첨부파일</th>
                        <td>
                            <div>
                                <img src={"http://localhost:80/download/album/"+gallery.file_url}/>
                                <div>{gallery.file_url}</div>
                                <div>
                                    <a
                                        href={"http://localhost:80/download/album/"+gallery.file_url}
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        >
                                            다운로드
                                    </a>
                                </div>
                            </div>
                            
                        </td>
                    </tr>

                </tbody>
            </table>

            <div className="my-3 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/GalleryList"><i className="fas fa-list"></i> 글목록</Link>
            </div><br /><br />

        </div>
    );
}

export default GalleryDetail;