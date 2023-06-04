import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function GalleryUpdate() {

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
		console.log(param.gallery_id);
		const getBoard = async () => {
		  const {data} = await axios.post(`http://dolbomi.site/album/${param.gallery_id}`);
		  return data;
		}
		getBoard().then((result) => {
		  setTitle(result.title);
		  setText(result.contents);
		  // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
		  // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
		});
		
        axios.post(`http://dolbomi.site/album/files/${param.gallery_id}`)
            .then((res) => {
                console.log("[GalleryDetail.js] getGalleryDetail() success :D");
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
                console.log("[GalleryDetail.js] getGalleryDetail() error :<");
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

	const updateGallery = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append("album_id", param.gallery_id);
		formData.append("title", title);
		formData.append("text", text);
		if(fileChange){
			for(let i = 0; i < selectedFiles.length; i++){
				console.log(i);
				console.log(selectedFiles[i]);
				formData.append("files", selectedFiles[i]);
			}
			axios.post("http://dolbomi.site/GalleryList/update/file", formData, {
			  headers: {
				"Content-Type": "multipart/form-data",
			  }
			})
			.then((resp) => {
				console.log("[GalleryWrite.js] createGallery() success :D");
				console.log(resp.data);
				alert("새로운 게시글을 성공적으로 수정했습니다 :D");
				navigate(`/gallerydetail/${param.gallery_id}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[GalleryWrite.js] createGallery() error :<");
				console.log(err);
			});
		}
		else{
			axios.post("http://dolbomi.site/GalleryList/update/nofile", formData, {
			  headers: {
				"Content-Type": "multipart/form-data",
			  }
			})
			.then((resp) => {
				console.log("[GalleryWrite.js] createGallery() success :D");
				console.log(resp.data);
				alert("새로운 게시글을 성공적으로 수정했습니다 :D");
				navigate(`/gallerydetail/${param.gallery_id}`); // 새롭게 등록한 글 상세로 이동
			})
			.catch((err) => {
				console.log("[GalleryWrite.js] createGallery() error :<");
				console.log(err);
			});
		}

	}


	return (
		<div class="gallerywrapper" style={{ fontFamily: "Eorinai" }}>
			<div class="form_container">
				<form onSubmit={updateGallery}>
					<table>
						<tbody>

							<tr>
								<th className="table-primary">제목</th>
								<td class="input_container">
									<input type="text" class="galleryWrite" value={title} onChange={changeTitle} size="50px" />
								</td>
							</tr>

							<tr>
								<th className="table-primary">내용</th>
								<td>
									<textarea class="galleryWrite" value={text} onChange={changeText} rows="10"></textarea>
								</td>
							</tr>

							<tr>
								<th className="table-primary">첨부</th>
								<td>
									{
										selectedFiles.map((el, idx) => {
											return <img src={imageUrl? imageUrl : "http://dolbomi.site/download/album/" + title + "/" + el.name}/>
										})
									}
									<br></br>
            						<input type="file" onChange={selectFiles} />
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
						<button type="submit" className="bbsWrite-submit-button"><i className="fas fa-pen"></i> 수정하기</button>
					</div>
				</form>

			</div>
		</div>
	);

}

export default GalleryUpdate;