import React from "react";
//해당 컴포넌트는 타임라인 배열을받아서 화면에 그리는 프레젠테이션 컴포넌트이다.
function TimeLineList({ timelines }) {
  return (
    <ul>
      {timelines.map((timeline) => (
        <li key={timeline.id}>{timeline.desc}</li>
      ))}
    </ul>
  );
}
export default TimeLineList;
