import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsUpdate() {

	// const { headers, setHeaders } = useContext(HttpHeadersContext);
	// const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [file, setFile] = useState([]);

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

		const formData = new FormData();
		if (e.target.files) {
			const uploadFile = e.target.files[0]
			formData.append('file', uploadFile)
			setFile(uploadFile)
		}
	}

	const updateBbs = async (e) => {

		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title)
		formData.append('text', text)
		formData.append('file', file)

		// await axios.patch(`/news/${bbs.id}`, formData)
		await axios.patch(`/news/update`, formData)
		.then((resp) => {
			console.log("[BbsUpdate.js] updateBbs() success");
			console.log(resp.data);

			if (resp.data.updatedRecordCount == 1) {
				alert("게시글을 성공적으로 수정했습니다.");
				navigate(`/bbsdetail`); // 글 상세로 이동
			}

		})
		.catch((err) => {
			console.log("[BbsUpdate.js] updateBbs() error");
			console.log(err);
		});

	}


	return (
		<div class="bbswrapper">
			<div class="form_container">
				<form onSubmit={updateBbs}>
					<table>
						<tbody>

							<tr>
								<th>제목</th>
								<td class="input_container">
									<input type="text" class="bbsWrite" value={title} onChange={changeTitle} size="50px" />
								</td>
							</tr>

							<tr>
								<th className="table-primary">내용</th>
								<td>
									<textarea class="bbsWrite" value={text} onChange={changeText} rows="10"></textarea>
								</td>
							</tr>

							<tr>
								<th className="table-primary">첨부파일</th>
								<td>
									<input type="file" class="bbsWrite" accept="image/*" multiple onChange={changeFile} />
								</td>

							</tr>
						</tbody>
					</table>
				</form>

				<div className="my-5 d-flex justify-content-center">
					<button type="submit" className="btn btn-outline-secondary"><i className="fas fa-pen"></i> 등록하기</button>
				</div>
			</div>
		</div>
	);

}

export default BbsUpdate;