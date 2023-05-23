import http from "./http-common";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("http://13.209.104.24:8080/student_submit_csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.post("http://13.209.104.24:8080/files");
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService; 