import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsUpdate(bbs_id) {

	// const { headers, setHeaders } = useContext(HttpHeadersContext);
	// const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [imageUrl, setImageUrl] = useState(null);
	const imgRef = useRef();

	useEffect(() => {
		const getBoard = async () => {
		  const {data} = await axios.post(`/news/${bbs_id}`);
		  return data;
		}
		getBoard().then((result) => {
		  setTitle(result.title);
		  setText(result.content);
		  // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
		  // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
		  setImageUrl({...imageUrl, preview_URL: `/image/${bbs_id}`})
		});
	  }, [])


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

	const updateBbs = async (e) => {

		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title)
		formData.append('text', text)
		formData.append('file', imageUrl)

		// await axios.patch(`/news/${bbs.id}`, formData)
		await axios.post(`/news/${bbs_id}`, formData)
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
								<img src={imageUrl ? imageUrl : "/img/profile.png"} style={{width:"500px", height:"500px", margin:"20px"}}></img>
									<input
										type="file"
										accept="image/*"
										ref={imgRef}
										onChange={changeFile}
										style={{ display: "none" }}
									></input>
									<button class="add"
										onClick={() => {
											onClickFileBtn();
										}}
									>
										추가
									</button>
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