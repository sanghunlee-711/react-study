import createReducer from "./createReducer";

//아래 3가지의 공통기능 분리를 위한 파일
//배열과 관련된 액션타입과 액션생성자 함수
// 초기 상태값 빈배열로 정의
// 배열의 데이터 추가, 삭제, 수정하는 리듀서 코드
export default function createItemsLogic(name) {
  //배열 고유 이름을 매개변수로 받아서 액션타입을 상수로 지정
  const ADD = `${name}/ADD`;
  const REMOVE = `${name}/REMOVE`;
  const EDIT = `${name}/EDIT`;

  //액션생성자 함수 만들기
  const add = (item) => ({ type: ADD, item });
  const remove = (item) => ({ type: REMOVE, item });
  const edit = (item) => ({ type: EDIT, item });

  const reducer = createReducer(
    //초기상태값을 빈 배열로 넣는다
    { [name]: [] },

    //ADD, EDIT, REMOVE와 같은 기본처리로직을 만든다.
    {
      [ADD]: (state, action) => state[name].push(action.item),
      [REMOVE]: (state, action) => {
        const index = state[name].findIndex(
          (item) => item.id === action.item.id
        );
        //filter에서 splice로 바꾼 이유는 filter이용 시 매개변수의 값만 변경되고 실제의 값이 변경되지 않기 때문에 바꾼것.
        state[name].splice(index, 1);
      },
      [EDIT]: (state, action) => {
        const index = state[name].findIndex(
          (item) => item.id === action.item.id
        );
        if (index >= 0) {
          state[name][index] = action.item;
        }
      },
    }
  );

  //액션생성자 함수와 리듀서 함수를 내보낸다
  return { add, remove, edit, reducer };
}
