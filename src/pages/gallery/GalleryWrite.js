import axios from "axios";
import "./gallerywrite.css";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";
// import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function GalleryWrite() {

	// const { auth, setAuth } = useContext(AuthContext)
	// const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [imageUrl, setImageUrl] = useState(null);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const imgRef = useRef();

	const selectFiles = (event) => {
		let arr = Array.from(event.target.files);
		setSelectedFiles([]);
		for(let i = 0; i < arr.length; i++){
			console.log(arr[i].name)
			setSelectedFiles((prevMessage) => ([
				...prevMessage,
				arr[i]
			]));
		}
		const reader = new FileReader();
		const file = event.target.files[0];
		console.log(file);

		// const formData = new FormData();
		// formData.append('file', e.target.files[0]);

		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImageUrl(reader.result);
			console.log("이미지주소", reader.result);
		};
	};

	const changeTitle = (e) => {
		e.preventDefault();
		setTitle(e.target.value);
	}

	const changeText = (e) => {
		e.preventDefault();
		setText(e.target.value);
	}

	/* [POST /gallery]: 게시글 작성 */
	const createGallery = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append("teacher_id", localStorage.getItem('userid'));
		formData.append("title", title);
		formData.append("text", text);
		for(let i = 0; i < selectedFiles.length; i++){
		  console.log(i);
		  console.log(selectedFiles[i]);
		  formData.append("files", selectedFiles[i]);
		}
		if(selectedFiles.length == 0){
			alert("사진이 없습니다.")
		}
		else{
			axios.post("http://localhost:80/GalleryList/create/file", formData, {
			  headers: {
				"Content-Type": "multipart/form-data",
			  }
			})
			.then((resp) => {
				console.log("[GalleryWrite.js] createGallery() success :D");
				console.log(resp.data);
				alert("새로운 게시글을 성공적으로 등록했습니다 :D");
				navigate(`/gallerydetail/${resp.data.id}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[GalleryWrite.js] createGallery() error :<");
				console.log(err);
			});

		}
	}

	// useEffect(() => {
	// 	if (!auth) {
	// 		alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
	// 		navigate(-1);
	// 	}
	// }, []);


	return (
		// <div style={{ padding: "20px" }}>
		// 	<GalleryEditor />
		// </div>onSubmit={submitTeacherRecord}

		<div class="gallerywrapper">
			<div class="form_container">
				<form onSubmit={createGallery}>
					<table>
						<tbody>

							<tr>
								<th class="input_header">제목</th>
								<td class="input_container">
									<input type="text" class="galleryWrite" value={title} onChange={changeTitle} size="50px" />
								</td>
							</tr>

							<tr>
								<th class="input_header">내용</th>
								<td class="input_container">
									<textarea class="galleryWrite" value={text} onChange={changeText} rows="10"></textarea>
								</td>
							</tr>

							<tr>
								<th class="input_header">첨부파일</th>
								<td class="input_container">
									<img style={{width: "700px", margin: "10px"}} src={imageUrl}/>
            						<input class="galleryWrite" type="file" onChange={selectFiles} />
									{
										selectedFiles.map((el, idx) => {
											return <div key={idx}> {el.name} </div>
										})
									}
								</td>

							</tr>
						</tbody>
					</table>
					<div className="my-5 d-flex justify-content-center">
						<button type="submit" className="galleryWrite-submit-button"><i className="fas fa-pen"></i> 등록하기</button>
					</div>
				</form>

			</div>
		</div>




		// <div>
		// 	<form>
		// 		<table>
		// 			<tbody>

		// 				<tr>
		// 					<th className="table-primary">제목</th>
		// 					<td>
		// 						<input type="text" className="form-control" value={title} onChange={changeTitle} size="50px" />
		// 					</td>
		// 				</tr>

		// 				<tr>
		// 					<th className="table-primary">내용</th>
		// 					<td>
		// 						<textarea className="form-control" value={text} onChange={changeText} rows="10"></textarea>
		// 					</td>
		// 				</tr>

		// 				<tr>
		// 					<th className="table-primary">첨부파일</th>
		// 					<td>
		// 						<input type="file" className="form-control" accept="image/*" multiple onChange={changeFile} />
		// 					</td>

		// 				</tr>
		// 			</tbody>
		// 		</table>
		// 	</form>

		// 	<div className="my-5 d-flex justify-content-center">
		// 		<button className="btn btn-outline-secondary" onClick={createGallery}><i className="fas fa-pen"></i> 등록하기</button>
		// 	</div>
		// </div>
	);
}

export default GalleryWrite;