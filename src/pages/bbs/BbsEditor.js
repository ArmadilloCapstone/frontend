// import { useRef, useState, useMemo } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import styled from "styled-components";

// // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀림
// const modules = useMemo(
//   () => ({
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, false] }],
//         ["bold", "italic", "underline", "strike", "blockquote"],
//         [{ size: ["small", false, "large", "huge"] }, { "align": [] }, { color: [] }, { "background": [] }],
//         [
//           { list: "ordered" },
//           { list: "bullet" },
//           { indent: "-1" },
//           { indent: "+1" },
//           { align: [] },
//         ],
//         ["image", "link"],
//         ["clean"],
//       ],
//       handlers: {
//         image: imageHandler,
//       },
//     },
//   }),
//   []
// );



// //     //[{ 'font': [] }],
// //     [{ header: [1, 2, 3, false] }],
// //     ["bold", "italic", "underline", "strike", "blockquote"],
// //     [
// //       { list: "ordered" },
// //       { list: "bullet" },
// //       { indent: "-1" },
// //       { indent: "+1" },
// //     ],
// //     ["link", "image"],
// //     [{ "align": [] }, { "color": [] }, { "background": [] }], // dropdown with defaults from theme
// //     ["clean"],
// //   ],
// // };

// const formats = [
//   //'font',
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "small", 
//   "large", 
//   "huge",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "align",
//   "color",
//   "background",
// ];

// function BbsEditor() {
//   const [value, setValue] = useState("");

//   const handleChange = (content, delta, source, editor) => {
//     console.log(editor.getHTML()); // html 사용시
//     // console.log(JSON.stringify(editor.getContents())); // delta 사용시
//     setValue(editor.getHTML());
//   };

//   return (
//     <Container>
//       <ReactQuill
//         style={{ height: "100%", width: "100%" }}
//         theme="snow"
//         modules={modules}
//         formats={formats}
//         value={value}
//         onChange={handleChange}
//         placeholder="내용을 입력해주세요."
//       />
//     </Container>
//   );
// }

// const Container = styled.div`
//   height: 650px;
//   width: 1200px;
//   margin: 20px auto 0;
//   padding: 10px;
// `;

// export default BbsEditor;