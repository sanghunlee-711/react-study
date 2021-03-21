// import { createStore, combineReducers } from "redux";
// import timeLineReducer, {
//   addTimeLine,
//   removeTimeLine,
//   editTimeLine,
//   increaseNextPage,
// } from "./timeline/state";

// import friendReducer, {
//   addFriend,
//   removeFriend,
//   editFriend,
// } from "./friend/state";

// //combineReducer를 이용하여 reducer 두가지를 합쳤다.
// const reducer = combineReducers({
//   timeline: timeLineReducer,
//   firend: friendReducer,
// });

// //스토어 생성
// const store = createStore(reducer);

// //디버깅을 위해 액션처리가 끝날때마다 상탯값을 로그로 출력한다.
// store.subscribe(() => {
//   const state = store.getState();
//   console.log(state);
// });

// store.dispatch(addTimeLine({ id: 1, desc: "즐코딩" }));
// store.dispatch(addTimeLine({ id: 2, desc: "즐 리덕스" }));
// store.dispatch(increaseNextPage());
// store.dispatch(increaseNextPage());

// store.dispatch(editTimeLine({ id: 2, desc: "리덕스 흠" }));
// store.dispatch(removeTimeLine({ id: 1, desc: "즐코딩" }));

// store.dispatch(addFriend({ id: 1, name: "아이유" }));
// store.dispatch(addFriend({ id: 2, name: "RONALDO" }));
// store.dispatch(editFriend({ id: 2, name: "BALE" }));
// store.dispatch(removeFriend({ id: 1, name: "아이유" }));

//Under is Refactored

import React from "react";
import ReactDOM from "react-dom";
import TimeLineMain from "./timeline/container/TimelineMain";
import FriendMain from "./friend/container/FriendMain";

ReactDOM.render(
  <div>
    <FriendMain />
    <TimeLineMain />
  </div>,
  document.getElementById("root")
);
