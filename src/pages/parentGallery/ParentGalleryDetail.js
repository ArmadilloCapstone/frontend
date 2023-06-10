import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ParentGalleryDetail() {

    const [gallery, setGallery] = useState({});
    const [files, setFiles] = useState([]);
    const { id } = useParams(); 

    const navigate = useNavigate();

    const getGalleryDetail = async () => {
        console.log("hi")
        await axios.post(`http://dolbomi.site/album/${id}`)
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
    }

    useEffect(() => {
        getGalleryDetail();
        console.log(id)
    }, []);

    return (

        <div className="detailPage" style={{ fontFamily: "Eorinai" }}>
            <table className="table table-striped" style={{ fontFamily: "Eorinai" }}>
                <tbody style={{ color: "#555555" }}>

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
                                <img src={"http://dolbomi.site/download/album/" + gallery.title + "/" + gallery.file_url} />
                                <div>{gallery.file_url}</div>
                                <div>
                                    <a
                                        href={"http://dolbomi.site/download/album/" + gallery.title + "/" + gallery.file_url}
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
                <Link className="btn btn-outline-secondary" to="/ParentGalleryList"><i className="fas fa-list"></i> 글목록</Link>
            </div><br /><br />

        </div>
    );
}

export default ParentGalleryDetail;