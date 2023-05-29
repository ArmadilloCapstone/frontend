import axios from "axios";
import "./bbswrite.css";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";
// import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsWrite() {

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
	};

	const changeTitle = (e) => {
		e.preventDefault();
		setTitle(e.target.value);
	}

	const changeText = (e) => {
		e.preventDefault();
		setText(e.target.value);
	}

	const changeFile = (e) => {
		e.preventDefault();
		const reader = new FileReader();
		const file = imgRef.current.files[0];
		console.log(file);

		// const formData = new FormData();
		// formData.append('file', e.target.files[0]);

		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImageUrl(reader.result);
			console.log("이미지주소", reader.result);
		};
	}

	const onClickFileBtn = (e) => {
		imgRef.current.click();
	};

	/* [POST /bbs]: 게시글 작성 */
	const createBbs = async (e) => {
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
			axios.post("http://dolbomi.site/BbsList/create/nofile", formData, {
			  headers: {
				"Content-Type": "multipart/form-data",
			  }
			})
			.then((resp) => {
				console.log("[BbsWrite.js] createBbs() success :D");
				console.log(resp.data);
				alert("새로운 게시글을 성공적으로 등록했습니다 :D");
				navigate(`/bbsdetail/${resp.data.id}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[BbsWrite.js] createBbs() error :<");
				console.log(err);
			});

		}
		else{
			axios.post("http://dolbomi.site/BbsList/create/file", formData, {
			  headers: {
				"Content-Type": "multipart/form-data",
			  }
			})
			.then((resp) => {
				console.log("[BbsWrite.js] createBbs() success :D");
				console.log(resp.data);
				alert("새로운 게시글을 성공적으로 등록했습니다 :D");
				navigate(`/bbsdetail/${resp.data.id}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[BbsWrite.js] createBbs() error :<");
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
		// 	<BbsEditor />
		// </div>onSubmit={submitTeacherRecord}

		<div class="bbswrapper" style={{ fontFamily: "Eorinai" }}>
			<div class="form_container">
				<form onSubmit={createBbs}>
					<table class="bbsWrite">
						<tbody class="bbsWrite">

							<tr>
								<th class="bbsWrite">제목</th>
								<td class="bbsWrite">
									<input class="bbsWrite" type="text" value={title} onChange={changeTitle} size="50px" />
								</td>
							</tr>

							<tr>
								<th class="bbsWrite">내용</th>
								<td class="bbsWrite">
									<textarea class="bbsWrite" value={text} onChange={changeText} rows="10"></textarea>
								</td>
							</tr>

							<tr>
								<th class="bbsWrite">첨부파일</th>
								<td class="bbsWrite">
            						<input class="bbsWrite" type="file" multiple onChange={selectFiles} />
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
						<button type="submit" className="bbsWrite-submit-button"><i className="fas fa-pen"></i> 등록하기</button>
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
		// 		<button className="btn btn-outline-secondary" onClick={createBbs}><i className="fas fa-pen"></i> 등록하기</button>
		// 	</div>
		// </div>
	);
}

export default BbsWrite;