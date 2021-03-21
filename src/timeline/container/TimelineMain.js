import React, { useEffect, useReducer } from "react";

//합쳐진 store객체를 가져온다
import store from "../../common/store";
//getNextTimeLine함수를 이용해 필요할 때마다 타임라인 데이터를 가져온다(서버 흉내 위함)
import { getNextTimeLine } from "../../common/mockData";
//타임라인 데이터를 추가하기 위한 액션생성자 함수를 가져온다
import { addTimeLine } from "../state";
import TimeLineList from "../component/TimeLineList";

export default function TimeLineMain() {
  const [, forceUpdate] = useReducer((v) => v + 1, 0);

  useEffect(() => {
    //액션이 처리될 때 마다 화면을 다시 그리기 위해 subscribe메서드를 사용한다,
    //리덕스 상태가 변경되면 무조건 컴포넌트를 렌더링 하기 위해 forceUpdate를 사용한다.
    const unsubscribe = store.subscribe(() => forceUpdate());
    //컴포넌트가 언마운트될때 subscribe메서드에 등록한 이벤트 함수를 해제한다.
    return () => unsubscribe();
  }, []);

  function onAdd() {
    const timeline = getNextTimeLine();
    //타임라인 추가 버튼을 누르면 타임라인을 추가하는 액션이 발생한다.
    store.dispatch(addTimeLine(timeline));
  }
  //렌더링 시점 확인을 위한 console
  console.log("TimeLineMain Render");

  //store에서 타임라인 배열을 가져온다.
  const timelines = store.getState().timeline.timelines;
  return (
    <div>
      <button onClick={onAdd}>Add Time Line</button>
      <TimeLineList timelines={timelines} />
    </div>
  );
}
