export const student = [
    {studentId: 1, name: "김예지", class_id: 1},
    {studentId: 2, name: "이아름", class_id: 1},
    {studentId: 3, name: "하현우", class_id: 1},
];

export const student_time = [
    {studentId: 1,
    entry1: "12:00", entry2: "12:00,", entry3: "12:00", entry4: "12:00,", entry5: "12:00",
    off1: "18:00", off2: "18:00,", off3: "18:00", off4: "18:00,", off5: "18:00"},
    {studentId: 2,
    entry1: "13:00", entry2: "13:00,", entry3: "13:00", entry4: "13:00,", entry5: "13:00",
    off1: "18:00", off2: "18:00,", off3: "18:00", off4: "18:00,", off5: "18:00"},
    {studentId: 3,
    entry1: "12:00", entry2: "12:00,", entry3: "12:00", entry4: "12:00,", entry5: "12:00",
    off1: "17:00", off2: "17:00,", off3: "17:00", off4: "17:00,", off5: "17:00"}
]

export const after_school_class = [
    {afterId: 1, class_name: "미술A", start_time: "14:00", end_time: "15:00", day: 0},
    {afterId: 2, class_name: "미술B", start_time: "14:00", end_time: "15:00", day: 1},
    {afterId: 3, class_name: "음악A", start_time: "13:00", end_time: "14:00", day: 0},
    {afterId: 4, class_name: "음악B", start_time: "13:00", end_time: "14:00", day: 4},
    {afterId: 5, class_name: "운동A", start_time: "15:00", end_time: "16:00", day: 3},
    {afterId: 6, class_name: "운동B", start_time: "15:00", end_time: "16:00", day: 0}
]

export const student_schedule = [
    {studentId: 1, afterId: 1},
    {studentId: 1, afterId: 2},
    {studentId: 1, afterId: 5},
    {studentId: 1, afterId: 6}, // 1번 학생 스케줄
    {studentId: 2, afterId: 3},
    {studentId: 2, afterId: 4}, // 2번 학생 스케줄
    {studentId: 3, afterId: 5},
    {studentId: 3, afterId: 6}  // 3번 학생 스케줄
]