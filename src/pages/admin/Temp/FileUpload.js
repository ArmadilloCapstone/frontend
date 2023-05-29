import React, { useState, useEffect, useRef } from "react";
import UploadService from "./FileUploadService";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const progressInfosRef = useRef(null)

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    setProgressInfos({ val: [] });
  };

  const IndividualUpload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        setMessage((prevMessage) => ([
          ...prevMessage,
          "'" + file.name + "' 업로드가 완료되었습니다!",
        ]));
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => ([
          ...prevMessage,
          "''" + file.name + "' 업로드에 실패했습니다!",
        ]));
      });
  };

  const uploadFiles = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));

    progressInfosRef.current = {
      val: _progressInfos,
    }

    const uploadPromises = files.map((file, i) => IndividualUpload(i, file));

    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then((files) => {
        setFileInfos(files.data);
      });

    setMessage([]);
  };

  return (
    <div className="my-3" style={{ color: "#555555", fontSize: "35px", fontWeight: "bold",  backgroundColor: "#ffffff", paddingLeft: "20px", paddingTop: "40px" }}>
      {progressInfos && progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

      <div className="row my-3" style={{ borderRadius: "0px"}}>
        <div className="col-8" >
          <label className="btn btn-default p-0">     
            <input type="file" accept=".csv" multiple onChange={selectFiles} />
          </label>
        </div>

        <div className="col my-5">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={uploadFiles}
          >
            파일추가
          </button>
        </div>
      </div>

      {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}

      {/* <div className="card">
        <div className="card-header">추가된 파일 리스트</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
};

export default FileUpload;