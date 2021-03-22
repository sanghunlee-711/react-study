// import createReducer from "../common/createReducer";

// //액션타입 정의
// const ADD = "timeline/ADD";
// const REMOVE = "timeline/REMOVE";
// const EDIT = "timeline/EDIT";
// const INCREASE_NEXT_PAGE = "timeline/INCREASE_NEXT_PAGE";

// //액션생성자 함수
// export const addTimeLine = (timeline) => ({ type: ADD, timeline });
// export const removeTimeLine = (timeline) => ({ type: REMOVE, timeline });
// export const editTimeLine = (timeline) => ({ type: EDIT, timeline });
// export const increaseNextPage = (timeline) => ({
//   type: INCREASE_NEXT_PAGE,
//   timeline,
// }); //타임라인의 마지막에 서버에게 요처알 페이지 번호 관리하는 액션생성자 함수

// //리덕스는 store생성 할 때 상태값이 없는 상태로 리듀서를 호출하므로 매개변수의 기본값을 사용해서 초기상태값을 정의한다.
// const INITIAL_STATE = { timelines: [], nextpage: 0 };
// //타임라인의 상태값에 다음 페이지 번호도 저장된다

// //reducer생성
// const timeLineReducer = createReducer(INITIAL_STATE, {
//   [ADD]: (state, action) => state.timelines.push(action.timeline),
//   [REMOVE]: (state, action) =>
//     (state.timelines = state.timelines.filter(
//       (timeline) => timeline.id !== action.timeline.id
//     )),
//   [EDIT]: (state, action) => {
//     const index = state.timelines.findIndex(
//       (timeline) => timeline.id === action.timeline.id
//     );
//     if (index >= 0) {
//       state.timelines[index] = action.timeline;
//     }
//   },
//   [INCREASE_NEXT_PAGE]: (state, action) => (state.nextpage += 1),
// });

// export default timeLineReducer;

//Under is Refactored;

import createReducer from "../../common/createReducer";
import createItemsLogic from "../../common/createItemsLogic";
//공통로직 사용을 위한 mergeReducer함수
import mergeReducers from "../../common/mergeReducer";

// //timelines라는 이름으로 공통로직 생성
// const { add, remove, edit, reducer: timeLineReducer } = createItemsLogic(
//   "timelines"
// );

// // 공통로직에 포함되지 않은 액션타입
// const INCREASE_NEXT_PAGE = "timeline/INCREASE_NEXT_PAGE";

// export const addTimeLine = add;
// export const removeTimeLine = remove;
// export const editTimeLine = edit;
// // 공통로직에 포함되지 않은 액션생성함수
// export const increaseNextPage = () => ({ type: INCREASE_NEXT_PAGE });

// // 공통로직에 포함되지 않은 초기값
// const INITIAL_STATE = { nextPage: 0 };

// // 공통로직에 포함되지 않은 리듀서함수
// const reducer = createReducer(INITIAL_STATE, {
//   [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
// });

// //mergeReducers를 활용한 리듀서 합치기
// const reducers = [reducer, timeLineReducer];
// export default mergeReducers(reducers);

//Under is refactored2
const { add, remove, edit, reducer: timeLineReducer } = createItemsLogic(
  "timelines"
);

export const types = {
  //redux saga에서 사용하기 위해 모든 액션타입을 하나의 객체에 담아서 내보낸다.
  INCREASE_NEXT_PAGE: "timeline/INCREASE_NEXT_PAGE",
  //좋아요 버튼 클릭 시 발생하는 액션타입이다. 아래액션타입은 사가에서만 사용되고 리듀서함수에는 사용되지않는다.
  REQUEST_LIKE: "timeline/REQUEST_LIKE",
  //좋아요 숫자 변경을 위한 action 타입이다.
  ADD_LIKE: "timeline/ADD_LIKE",
  //로딩 여부를 알려줄 액션타입이다.
  SET_LOADING: "timeline/SET_LOADING",
  //에러 정보를 저장하는 액션타입 설정
  SET_ERROR: "timeline/SET_ERROR",
  //리덕스의 text상태값을 변경하는 액션타입 추가
  SET_TEXT: "timeline/SET_TEXT",
  //리덕스의 상태값변경을 시도하는 액션타입 TRY_SET_TEXT액션타입은 사가함수에서만 사용된다.
  TRY_SET_TEXT: "timeline/TRY_SET_TEXT",
};

export const actions = {
  //액션생성자 함수도 하나의 객체에 담아서 내보낸다 for redux-saga
  addTimeLine: add,
  removeTimeLine: remove,
  editTimeLine: edit,
  //액션 생성자 함수를 추가한다.
  increaseNextPage: () => ({ type: types.INCREASE_NEXT_PAGE }),
  requestLike: (timeline) => ({ type: types.REQUEST_LIKE, timeline }),
  addLike: (timelineId, value) => ({ type: types.ADD_LIKE, timelineId, value }),
  setLoading: (isLoading) => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setError: (error) => ({
    type: types.SET_ERROR,
    error,
  }),
  //디바운스를 위해 구현
  setText: (text) => ({ type: types.SET_TEXT, text }),
  trySetText: (text) => ({ type: types.TRY_SET_TEXT, text }),
};

//로딩 상태값을 추가한다.
const INITIAL_STATE = { nextPage: 0, isLoading: false, error: "", text: "" };
//추가된 액션생성자와 로딩상태값을 이용해 리듀서코드를 추가한다.
const reducer = createReducer(INITIAL_STATE, {
  [types.INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
  [types.ADD_LIKE]: (state, action) => {
    const timeline = state.timelines.find(
      (item) => item.id === action.timelineId
    );
    if (timeline) {
      timeline.likes += action.value;
    }
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_ERROR]: (state, action) => (state.error = action.error),
  [types.SET_TEXT]: (state, action) => (state.text = action.text),
});

//mergeReducers를 활용한 리듀서 합치기
const reducers = [reducer, timeLineReducer];
export default mergeReducers(reducers);
