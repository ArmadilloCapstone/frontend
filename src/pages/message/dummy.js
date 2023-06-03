// import moment from "moment"

// /* 더미 데이터 */
// export const parentList = [{
//     id: 1,
//     name: "부모1",
//     phone_num: "010-1111-1111",
//     gender: "여자",
//     birth_date: "700115",
//     child_id: 1,
//     class_id: 1,
//     // disable : Long
// },
// {
//     id: 2,
//     name: "부모2",
//     phone_num: "010-2222-2222",
//     gender: "남자",
//     birth_date: "690328",
//     child_id: 2,
//     class_id: 1,
//     // disable : Long
// }]

// export const teacherList = [
//     {
//         id: 1,
//         name: "교사1",
//         phone_num: "010-3333-3333",
//         gender: "여자",
//         birth_date: "800112",
//         class_id: 1,
//         // disable : Long
//     },
//     {
//         id: 2,
//         name: "교사2",
//         phone_num: "010-4444-4444",
//         gender: "여자",
//         birth_date: "921218",
//         class_id: 1,
//         // disable : Long
//     }
// ]

// export const AllMsgOfT1 = [
//     {
//         id: 1,
//         sender_id: "P01",
//         sender_name: "부모1",
//         receiver_id: "T01",
//         receiver_name: "교사1",
//         text: "보낸사람: 부모1, 받은사람: 교사1, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 10:30:25")
//     },
//     {
//         id: 2,
//         sender_id: "P02",
//         sender_name: "부모2",
//         receiver_id: "T01",
//         receiver_name: "교사1",
//         text: "보낸사람: 부모2, 받은사람: 교사1, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 11:30:25")
//     },
//     {
//         id: 3,
//         sender_id: "T01",
//         sender_name: "교사1",
//         receiver_id: "P01",
//         receiver_name: "부모1",
//         text: "보낸사람: 교사1, 받은사람: 부모1, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 12:30:25")
//     },
//     {
//         id: 4,
//         sender_id: "T01",
//         sender_name: "교사1",
//         receiver_id: "P01",
//         receiver_name: "부모2",
//         text: "보낸사람: 교사1, 받은사람: 부모2, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 13:30:25")
//     }
// ]

// export const AllMsgOfT2 = [
//     {
//         id: 1,
//         sender_id: "P01",
//         sender_name: "부모1",
//         receiver_id: "T02",
//         receiver_name: "교사2",
//         text: "보낸사람: 부모1, 받은사람: 교사2, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 10:30:25")
//     },
//     {
//         id: 2,
//         sender_id: "P02",
//         sender_name: "부모2",
//         receiver_id: "T02",
//         receiver_name: "교사2",
//         text: "보낸사람: 부모2, 받은사람: 교사2, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 11:30:25")
//     },
//     {
//         id: 3,
//         sender_id: "T02",
//         sender_name: "교사2",
//         receiver_id: "P01",
//         receiver_name: "부모1",
//         text: "보낸사람: 교사2, 받은사람: 부모1, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 12:30:25")
//     },
//     {
//         id: 4,
//         sender_id: "T02",
//         sender_name: "교사2",
//         receiver_id: "P01",
//         receiver_name: "부모2",
//         text: "보낸사람: 교사2, 받은사람: 부모2, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 13:30:25")
//     }
// ]

// export const AllMsgOfP1 = [
//     {
//         id: 1,
//         sender_id: "P01",
//         sender_name: "부모1",
//         receiver_id: "T01",
//         receiver_name: "교사1",
//         text: "보낸사람: 부모1, 받은사람: 교사1, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 10:30:25")
//     },
//     {
//         id: 2,
//         sender_id: "P01",
//         sender_name: "부모1",
//         receiver_id: "T02",
//         receiver_name: "교사2",
//         text: "보낸사람: 부모1, 받은사람: 교사2, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 11:30:25")
//     },
//     {
//         id: 3,
//         sender_id: "T01",
//         sender_name: "교사1",
//         receiver_id: "P01",
//         receiver_name: "부모1",
//         text: "보낸사람: 교사1, 받은사람: 부모1, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 12:30:25")
//     },
//     {
//         id: 4,
//         sender_id: "T02",
//         sender_name: "교사2",
//         receiver_id: "P01",
//         receiver_name: "부모1",
//         text: "보낸사람: 교사2, 받은사람: 부모1, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 13:30:25")
//     }
// ]

// export const AllMsgOfP2 = [
//     {
//         id: 1,
//         sender_id: "P02",
//         sender_name: "부모2",
//         receiver_id: "T01",
//         receiver_name: "교사1",
//         text: "보낸사람: 부모2, 받은사람: 교사1, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 10:30:25")
//     },
//     {
//         id: 2,
//         sender_id: "P02",
//         sender_name: "부모2",
//         receiver_id: "T02",
//         receiver_name: "교사2",
//         text: "보낸사람: 부모2, 받은사람: 교사2, 부모가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 11:30:25")
//     },
//     {
//         id: 3,
//         sender_id: "T01",
//         sender_name: "교사1",
//         receiver_id: "P02",
//         receiver_name: "부모2",
//         text: "보낸사람: 교사1, 받은사람: 부모2, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 12:30:25")
//     },
//     {
//         id: 4,
//         sender_id: "T02",
//         sender_name: "교사2",
//         receiver_id: "P02",
//         receiver_name: "부모2",
//         text: "보낸사람: 교사2, 받은사람: 부모2, 교사가 첫번째 보낸 메시지",
//         date: moment("2023-06-01 13:30:25")
//     }
// ]