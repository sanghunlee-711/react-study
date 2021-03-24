import React from "react";
//해당 컴포넌트는 타임라인 배열을받아서 화면에 그리는 프레젠테이션 컴포넌트이다.
function TimeLineList({ timelines, onLike }) {
  //좋아요 버튼에 반응하는 이벤트 처리함수를 속성값으로 받는다.
  return (
    <ul>
      {timelines.map(({ id, desc, likes }) => (
        <li key={id}>
          {desc}
          {/* 좋아요 버튼추가
          이벤트 처리함수에 타임라인 객체의 id정보를 넘기기위해 dataset를 이용한다.
          */}
          <button data-id={id} onClick={onLike}>{`Likes : ${likes}`}</button>
        </li>
      ))}
    </ul>
  );
}
export default TimeLineList;
