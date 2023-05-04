import moment from "moment";
import randomColor from "randomcolor";

// let randomSeed = Math.floor(Math.random() * 1000);

let id = 1;

export const groupIds = {
  전호윤: 3,
  김예지: 1,
  이아름: 2
};

const setGroup = (el, i, ary, groupId) =>
  new Object({
    id: id++,
    group: groupId,
    canMove: false,
    //end_time: i + 1 in ary ? ary[i + 1].start_time : moment(),
    itemProps: {
      style: {
        color: "black",
        background: ary[i].title === "돌봄교실" ? "rgb(251, 103, 128)"
          : ary[i].title === "미술" ? "rgba(46, 133, 248, 0.932)"
          : ary[i].title === "요리" ? " rgb(91, 227, 67)"
          : "rgb(243, 252, 0)",
        textAlign: "center"
        },
        //randomColor({ luminosity: "light", seed: el.title }),
      
    },
    ...el
  });

export let items = [
  {
    title: "돌봄교실",
    start_time: moment("2023-05-01 13:00"),
    end_time: moment("2023-05-01 18:00"),
    day: "월 or 1" //둘 중 하나로 선택해서 수정 필요!
  },
  {
    title: "돌봄교실",
    start_time: moment("2023-05-02 13:00"),
    end_time: moment("2023-05-02 17:00"),
    day: "화 or 2"
  },
  {
    title: "돌봄교실",
    start_time: moment("2023-05-03 13:00"),
    end_time: moment("2023-05-03 17:00"),
    day: "수 or 3"
  },
  {
    title: "돌봄교실",
    start_time: moment("2023-05-04 13:00"),
    end_time: moment("2023-05-04 16:00"),
    day: "목 or 4"
  },
  {
    title: "돌봄교실",
    start_time: moment("2023-05-05 13:00"),
    end_time: moment("2023-05-05 15:00"),
    day: "금 or 5"
  }
].map((el, i, ary) => setGroup(el, i, ary, groupIds.전호윤));

items = [
  ...items,
  ...[
    {
      title: "돌봄교실",
      start_time: moment("2023-05-01 13:00"),
      end_time: moment("2023-05-01 18:00"),
      day: "월 or 1" //둘 중 하나로 선택해서 수정 필요!
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-02 13:00"),
      end_time: moment("2023-05-02 17:00"),
      day: "화 or 2"
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-03 13:00"),
      end_time: moment("2023-05-03 15:00"),
      day: "수 or 3"
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-04 13:00"),
      end_time: moment("2023-05-04 18:00"),
      day: "목 or 4"
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-05 13:00"),
      end_time: moment("2023-05-05 18:00"),
      day: "금 or 5"
    }
  ].map((el, i, ary) => setGroup(el, i, ary, groupIds.김예지))
];

items = [
  ...items,
  ...[
    {
      title: "돌봄교실",
      start_time: moment("2023-05-01 13:00"),
      end_time: moment("2023-05-01 18:00"),
      day: "월 or 1" //둘 중 하나로 선택해서 수정 필요!
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-02 13:00"),
      end_time: moment("2023-05-02 17:00"),
      day: "화 or 2"
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-03 13:00"),
      end_time: moment("2023-05-03 17:00"),
      day: "수 or 3"
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-04 13:00"),
      end_time: moment("2023-05-04 18:00"),
      day: "목 or 4"
    },
    {
      title: "돌봄교실",
      start_time: moment("2023-05-05 13:00"),
      end_time: moment("2023-05-05 15:00"),
      day: "금 or 5"
    }
  ].map((el, i, ary) => setGroup(el, i, ary, groupIds.이아름))
];

items = items.sort((a, b) => b - a)