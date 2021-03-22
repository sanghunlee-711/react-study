//redux-saga에서 부수효과 발생을 위해 사용하는 함수를 가져온다
import { all, call, put, take, fork, debounce } from "redux-saga/effects";
import { actions, types } from "./index";
//좋아요 이벤트를 서버로 전송하는 비동기 함수를 가져온다.
import { callApiLike } from "../../common/api";

export function* fetchData() {
  //REQUEST_LIKE액션을 처리하는 제너레이터 함수이며, 이를 사가함수라고 한다.
  while (true) {
    //이 함수는 무한반복한다.
    //take함수는 인수로 전달된 액션타입을 기다린다.
    //REQUEST_LIKE액션이 발생하면 다음줄의 코드가 실행되는 것이다.
    //yield take는 액션객체를 반환한다.
    //REQUEST_LIKE의 액션객체는 timeline객체가 들어있다.
    const { timeline } = yield take(types.REQUEST_LIKE);
    //put함수는 숫자를 증가시키는 액션을 '발생'시킨다.
    //put함수는 새로운 액션을 발생시킨다. 결과적으로는 store.dispatch()메서드를 호출한다.
    yield put(actions.setLoading(true));
    //put 함수를 통해 좋아요 숫자를 증가시키는 액션을 발생시킨다.
    yield put(actions.addLike(timeline.id, 1));
    //put함수를 통해 새로운 좋아요 오청이 들어오면 이전 에러정보를 초기화한다.
    yield put(actions.setError(""));
    try {
      //call 함수는 입력된 함수를 대신 호출해준다. 만약 입력된 함수가 promise를 반환하면
      //프로미스가 처리됨 상태가 될때까지 기다린다
      //여기서는 서버로부터 응답이 올때가지 기다린다.
      yield call(callApiLike);
    } catch (error) {
      //프로미스 객체가 거부됨 상태가 되면 에러 객체를 저장하는 액션을 발생시킨다.
      yield put(actions.setError(error));
      //미리 증가되었던 좋아요 숫자를 하나 감소시킨다.
      yield put(actions.addLike(timeline.id, -1));
    }

    //로딩이 끝났다는 것을 알리는 액션을 발생시킨다 with put
    //이것으로 하나의 REQUEST_LIKE액션이 발생했을 때 필요한 로직들이 정의된다.
    yield put(actions.setLoading(false));
  }
}

export function* trySetText(action) {
  const { text } = action;
  yield put(actions.setText(text));
}

// //두개이상의 액션을 조합해서 하나의 완성된 사가함수를 작성하기
// export function* loginFlow() {
//   while (true) {
//     //take함수를 이용해 로그인 액션이 발생될 떄까지 기다린다.
//     const { id, password } = yield take(types.LOGIN);
//     //로그인 액션 발생하면 서버로 로그인 요청을 보내는 callApiLogin함수를 실행한다.
//     const userInfo = yield call(callApiLogin, id, password);
//     //서버로 부터 사용자 정보가 도착하면 사용자 정보를 저장하는 액션을 발생시킨다.
//     yield put(types.SET_USER_INFO, userInfo);
//     //로그아웃 액션이 발생할 때 까지 기다린다.
//     yield take(types.LOGOUT);
//     //로그아웃 액션이 발생하면 서버로 로그아웃 요청을 보낸다
//     yield call(callApiLogOut, id);
//     //로그아웃에 성공하여 사용자 정보를 지우는 action을 실행시킨다.
//     yield put(types.SET_USER_INFO, null);
//     //다시 위로 올라가 로그인액션을 기다린다.
//   }
// }

//여러개의 saga함수를 모아놓은 함수이며 사가 미들웨어에 입력하기 위함이다.
export default function* watcher() {
  //saga함수를 추가하기 위한 방법이다
  // 통상적으로 사가 함수를 추가하기 위해서 yield all([fork(f1), fork(f2)]);로 진행한다.
  yield all([fork(fetchData), debounce(500, types.TRY_SET_TEXT, trySetText)]);
  //debounce함수를 이용하여 TRY_SET_TEXT액션이 발생하고 0.5초 동안 재발생하지 않으면 trySetText사가 함수를 실행하는 것이다.
}
