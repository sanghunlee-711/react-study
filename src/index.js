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
import store from "./common/store";
import { Provider } from "react-redux";

ReactDOM.render(
  //store객체를 Provider컴포넌트의 속성값으로 넣는다.
  //Provider 컴포넌트는 전달받은 스토어 객체의 subscribe메서드를 호출해서 액션처리가 끝날 때마다 알림을 받는다.
  // 그 다음 컨텍스트API를 사용해서 리덕스의 상태값을 하위 컴포넌트로 전달한다.
  <Provider store={store}>
    <div>
      <FriendMain ageLimit={30} />
      <FriendMain ageLimit={15} />
      <TimeLineMain />
    </div>
  </Provider>,
  document.getElementById("root")
);
