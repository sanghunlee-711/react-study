// import { createStore, combineReducers } from "redux";
// import timeLineReducer from "../timeline/state/index";
// import friendReducer from "../friend/state/index";

// const reducer = combineReducers({
//   timeline: timeLineReducer,
//   friend: friendReducer,
// });

// const store = createStore(reducer);

// export default store;

//Under is Refactored
import { createStore, combineReducers, applyMiddleware } from "redux";
import timeLineReducer from "../timeline/state/index";
import friendReducer from "../friend/state/index";
import createSagaMiddleware from "redux-saga";
import timelineSaga from "../timeline/state/saga";

const reducer = combineReducers({
  timeline: timeLineReducer,
  friend: friendReducer,
});

//사가 미들웨어 함수를 만든다
const sagaMiddleware = createSagaMiddleware();
// 스토어 생성시 주입한다.
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

export default store;
//saga middleware에 saga.js에 작성한 함수를 넣는다.
sagaMiddleware.run(timelineSaga);
