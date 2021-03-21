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

import createReducer from "../common/createReducer";
import createItemsLogic from "../common/createItemsLogic";
//공통로직 사용을 위한 mergeReducer함수
import mergeReducers from "../common/mergeReducer";

//timelines라는 이름으로 공통로직 생성
const { add, remove, edit, reducer: timeLineReducer } = createItemsLogic(
  "timelines"
);

// 공통로직에 포함되지 않은 액션타입
const INCREASE_NEXT_PAGE = "timeline/INCREASE_NEXT_PAGE";

export const addTimeLine = add;
export const removeTimeLine = remove;
export const editTimeLine = edit;
// 공통로직에 포함되지 않은 액션생성함수
export const increaseNextPage = () => ({ type: INCREASE_NEXT_PAGE });

// 공통로직에 포함되지 않은 초기값
const INITIAL_STATE = { nextPage: 0 };

// 공통로직에 포함되지 않은 리듀서함수
const reducer = createReducer(INITIAL_STATE, {
  [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
});

//mergeReducers를 활용한 리듀서 합치기
const reducers = [reducer, timeLineReducer];
export default mergeReducers(reducers);
