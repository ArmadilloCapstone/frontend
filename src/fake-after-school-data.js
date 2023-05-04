import moment from "moment";

export const afterSchoolIds = {
    미술: 1,
    요리: 2,
    음악: 3
  };

  let id = 1;

  const setGroup = (el, i, ary, studentId) =>
  new Object({
    id: id++,
    student: studentId,
    canMove: false,
    //end_time: i + 1 in ary ? ary[i + 1].start_time : ary[i].start_time, // ary에 i+1번째 요소 있으면 그게 끝나는 시간, 아니면 현재가 끝나는 시간
    // itemProps: {
    //   style: {
    //     color: "black",
    //     background: randomColor({ luminosity: "light", seed: el.title }),
    //     textAlign: "center"
    //   }
    // },
    ...el
  });


  export let afterSchoolItems = [
    ...items,
    ...[
      {
        title: "미술",
        start_time: moment("2023-05-01 13:00"), //월, 수 13:00-15:00
        end_time: moment("2023-05-01 15:00")
      },
      {
        title: "미술",
        start_time: moment("2023-05-03 13:00"),
        end_time: moment("2023-05-03 15:00")
      }
    ].map((el, i, ary) => setGroup(el, i, ary, afterSchoolIds.요리))
  ];


  items = [
    ...items,
    ...[
      {
        title: "요리",
        start_time: moment("2023-05-02 14:00"), //화, 목 14:00-16:00
        end_time: moment("2023-05-02 16:00")
      },
      {
        title: "요리",
        start_time: moment("2023-05-04 14:00"),
        end_time: moment("2023-05-04 16:00")
      }
    ].map((el, i, ary) => setGroup(el, i, ary, afterSchoolIds.요리))
  ];

  items = [
    ...items,
    ...[
      {
        title: "음악",
        start_time: moment("2023-05-01 13:00"), //월, 금 13:00-15:00
        end_time: moment("2023-05-01 15:00")
      },
      {
        title: "음악",
        start_time: moment("2023-05-05 13:00"),
        end_time: moment("2023-05-05 15:00")
      }
    ].map((el, i, ary) => setGroup(el, i, ary, afterSchoolIds.음악))
  ];