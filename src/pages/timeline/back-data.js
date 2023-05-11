import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";

export const defaultTimeStart = moment().startOf('day');
export const defaultTimeEnd = moment().endOf('day');

export const studentList = []
export const Student = () => {
    const [student, setStudent] = useState([]);

    useEffect(async () => {
        await axios.post("/student")
            .then((response) => {
           //console.log(response.data);
           setStudent(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    studentList.push(...student)
}


export const Student_time = () => {
    const [student_time, setStudent_time] = useState([]);

    useEffect(async () => {
        await axios.post("/student_time")
            .then((response) => {
           //console.log(response.data);
           setStudent_time(response.data);
        });
    }, []);

    return student_time.map(obj => {
        let newList = {};
        newList['studentId'] = obj.student_id;
        newList['seed'] = 0;
        if(moment().day() === 1) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry1, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off1, 'h');
        }
        else if(moment().day() === 2) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry2, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off2, 'h');
        }
        else if(moment().day() === 3) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry3, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off3, 'h');
        }
        else if(moment().day() === 4) {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry4, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off4, 'h');
        }
        else {
          newList['start_time'] = moment(defaultTimeStart).add(obj.entry5, 'h');
          newList['end_time'] = moment(defaultTimeStart).add(obj.off5, 'h');
        }
        return newList;
      });
}


export const After_school_class = () => {
    const [after_school_class, setAfter_school_class] = useState([]);

    useEffect(async () => {
        await axios.post("/after_school_class")
            .then((response) => {
           //console.log(response.data);
           setAfter_school_class(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    return After_school_class.filter(obj => {
        if(moment().day() === obj.day) {
          return obj
        }
      })
}

export const Student_schedule = () => {
    const [student_schedule, setStudent_schedule] = useState([]);

    useEffect(async () => {
        await axios.post("/student")
            .then((response) => {
           //console.log(response.data);
           setStudent_schedule(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    return student_schedule;
}


// function BackendDate() {
//   const [student, setStudent] = useState(null);
//   const [student_time, setStudent_time] = useState([]);
//   const [after_school_class, setAfter_school_class] = useState([]);
//   const [student_schedule, setStudent_schedule] = useState([]);

//   useEffect(() => {
//           getStudent();
//           getStudent_time();
//           getafter_school_class();
//           getStudent_schedule();
//   },[]);

//   async function getStudent(){
//     await axios
//         .post("/student")
//         .then((response) => {
//            //console.log(response.data);
//            setStudent(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// async function getStudent_time(){
//     await axios
//         .post("/student_time")
//         .then((response) => {
//            //console.log(response.data);
//            setStudent_time(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// async function getafter_school_class(){
//     await axios
//         .post("/after_school_class")
//         .then((response) => {
//            //console.log(response.data);
//            setAfter_school_class(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// async function getStudent_schedule(){
//     await axios
//         .post("/student_schedule")
//         .then((response) => {
//            //console.log(response.data);
//            setStudent_schedule(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
// }

// return {student, student_time, after_school_class, student_schedule}
// }

// export default BackendDate

// export const Student = [
//     {id: 1, name: "김예지", class_id: 1},
//     {id: 2, name: "이아름", class_id: 1},
//     {id: 3, name: "하현우", class_id: 1},
// ];


// export const Student_time = [
//     {student_id: 1,
//     entry1: "12:00", entry2: "12:00", entry3: "12:00", entry4: "12:00", entry5: "12:00",
//     off1: "18:00", off2: "18:00", off3: "18:00", off4: "18:00", off5: "18:00"},
//     {student_id: 2,
//     entry1: "13:00", entry2: "13:00", entry3: "13:00", entry4: "13:00", entry5: "13:00",
//     off1: "18:00", off2: "18:00", off3: "18:00", off4: "18:00", off5: "18:00"},
//     {student_id: 3,
//     entry1: "12:00", entry2: "12:00", entry3: "12:00", entry4: "12:00", entry5: "12:00",
//     off1: "17:00", off2: "17:00", off3: "17:00", off4: "17:00", off5: "17:00"}
// ]

// export const After_school_class = [
//     {id: 1, class_name: "미술A", start_time: "14:00", end_time: "15:00", day: 1},
//     {id: 2, class_name: "미술B", start_time: "14:00", end_time: "15:00", day: 3},
//     {id: 3, class_name: "음악A", start_time: "13:00", end_time: "14:00", day: 2},
//     {id: 4, class_name: "음악B", start_time: "13:00", end_time: "14:00", day: 4},
//     {id: 5, class_name: "운동A", start_time: "15:00", end_time: "16:00", day: 1},
//     {id: 6, class_name: "운동B", start_time: "15:00", end_time: "16:00", day: 5}
// ]

// export const Student_schedule = [
//     {student_id: 1, class_id: 1},
//     {student_id: 1, class_id: 2},
//     {student_id: 1, class_id: 5},
//     {student_id: 1, class_id: 6}, // 1번 학생 스케줄
//     {student_id: 2, class_id: 3},
//     {student_id: 2, class_id: 4}, // 2번 학생 스케줄
//     {student_id: 3, class_id: 1},
//     {student_id: 3, class_id: 2}  // 3번 학생 스케줄
// ]