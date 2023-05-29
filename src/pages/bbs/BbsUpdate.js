import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsUpdate() {

	// const { headers, setHeaders } = useContext(HttpHeadersContext);
	// const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [text, setText] = useState("");
	const [imageUrl, setImageUrl] = useState(null);
	const [fileChange, setFileChange] = useState(false);
	const imgRef = useRef();
	const param =  useParams(); // 파라미터 가져오기

	useEffect(() => {
		console.log(param.bbs_id);
		const getBoard = async () => {
		  const {data} = await axios.post(`http://dolbomi.site/news/${param.bbs_id}`);
		  return data;
		}
		getBoard().then((result) => {
		  setTitle(result.title);
		  setText(result.text);
		  // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
		  // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
		  setImageUrl({...imageUrl, preview_URL: `http://dolbomi.site/news/image/${param.bbs_id}`})
		});
		
        axios.post(`http://dolbomi.site/news/files/${param.bbs_id}`)
            .then((res) => {
                console.log("[BbsDetail.js] getBbsDetail() success :D");
                console.log(res.data);
                let arr = Array.from(res.data.map((el) =>{
					var returnObj = {}
					returnObj['name'] = el.originFileName;
					return returnObj;
				}));
                console.log(arr);
                setSelectedFiles([]);
                for(let i = 0; i < arr.length; i++){
                    console.log(arr[i].originFileName)
                    setSelectedFiles((prevMessage) => ([
                        ...prevMessage,
                        arr[i]
                    ]));
                }
            })
            .catch((err) => {
                console.log("[BbsDetail.js] getBbsDetail() error :<");
                console.log(err);
            });
	  }, [])

	  const selectFiles = (event) => {
		let arr = Array.from(event.target.files);
		setFileChange(true)
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
		let obj = e.target.files;
		let arr = [];

		for (let key in obj) {
		  if(obj.hasOwnProperty(key)) {
		    arr.push(obj[key]);
		  }
		}
		console.log(arr)
		setSelectedFiles([]);
		for(let i = 0; i < arr.length; i++){
			console.log("'" + arr[i].name + "' 업로드가 완료되었습니다!")
			setSelectedFiles((prevMessage) => ([
				...prevMessage,
				"'" + arr[i].name + "' 업로드가 완료되었습니다!",
			]));

		}
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
		let formData = new FormData();
		formData.append("news_id", param.bbs_id);
		formData.append("title", title);
		formData.append("text", text);
		if(fileChange){
			for(let i = 0; i < selectedFiles.length; i++){
				console.log(i);
				console.log(selectedFiles[i]);
				formData.append("files", selectedFiles[i]);
			}
			axios.post("http://dolbomi.site/BbsList/update/file", formData, {
			  headers: {
				"Content-Type": "multipart/form-data",
			  }
			})
			.then((resp) => {
				console.log("[BbsWrite.js] createBbs() success :D");
				console.log(resp.data);
				alert("새로운 게시글을 성공적으로 수정했습니다 :D");
				navigate(`/bbsdetail/${param.bbs_id}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[BbsWrite.js] createBbs() error :<");
				console.log(err);
			});
		}
		else{
			axios.post("http://dolbomi.site/BbsList/update/nofile", formData, {
			  headers: {
				"Content-Type": "multipart/form-data",
			  }
			})
			.then((resp) => {
				console.log("[BbsWrite.js] createBbs() success :D");
				console.log(resp.data);
				alert("새로운 게시글을 성공적으로 수정했습니다 :D");
				navigate(`/bbsdetail/${param.bbs_id}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[BbsWrite.js] createBbs() error :<");
				console.log(err);
			});
		}

	}


	return (
		<div class="bbswrapper" style={{ fontFamily: "Eorinai" }}>
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
            						<input type="file" multiple onChange={selectFiles} />
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
						<button type="submit" className="btn btn-outline-secondary"><i className="fas fa-pen"></i> 수정하기</button>
					</div>
				</form>

			</div>
		</div>
	);

}

export default BbsUpdate;