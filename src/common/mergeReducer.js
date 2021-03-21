export default function mergeReducers(reducers) {
  //mergeReducers함수는 리듀서를 반환한다
  return function (state, action) {
    if (!state) {
      //초기 상태값을 계산할 때는 모든 리듀서 함수의 결과값을 합친다.
      return reducers.reduce((acc, r) => ({ ...acc, ...r(state, action) }), {});
    } else {
      //초기화 단계가 아니라면 입력된 모든 리듀서를 호출해서 다음 상태값을 반환한다.
      let nextState = state;
      for (const r of reducers) {
        nextState = r(nextState, action);
      }
      return nextState;
    }
  };
}
