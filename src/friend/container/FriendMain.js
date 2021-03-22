import React, { useEffect, useReducer, useMemo } from "react";
import store from "../../common/store";
import { getNextFriend, getNextTimeLine } from "../../common/mockData";
import {
  addFriend,
  removeFriend,
  editFriend,
  setAgeLimit,
  setShowLimit,
} from "../state/index";
import FriendList from "../component/FriendList";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import NumberSelect from "../component/NumberSelect";
import { MAX_AGE_LIMIT, MAX_SHOW_LIMIT } from "../common";
import {
  getAgeLimit,
  getShowLimit,
  getFriendsWithAgeLimit,
  getFriendsWithAgeShowLimit,
  makeGetFriendsWithAgeLimit,
} from "../state/selector";

//아래의 케이스의 경우 FriendMain과 TimeLineMain이 모두 렌더됬다(이벤트 발생시)
// export default function FriendMain() {
//   const [, forceUpdate] = useReducer((v) => v + 1, 0);
//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => forceUpdate());
//     return () => unsubscribe();
//   }, []);

//   function onAdd() {
//     const friend = getNextFriend();
//     store.dispatch(addFriend(friend));
//   }
//   console.log("FriendMain render");
//   const friends = store.getState().friend.friends;
//   return (
//     <div>
//       <button onClick={onAdd}>Add Friends</button>
//       <FriendList friends={friends} />
//     </div>
//   );
// }

//Under is Reactored 1
//이렇게 변경하면 timeline이 리렌더 될때 friendMain이 rerender되는 현상을 방지 할 수 있다.
// export default function FriendMain() {
//   const [, forceUpdate] = useReducer((v) => v + 1, 0);

//   useEffect(() => {
//     //이전 상태값 저장을 위해 변수에 선언
//     let prevFriends = store.getState().friend.friends;
//     const unsubscribe = store.subscribe(() => {
//       const friends = store.getState().friend.friends;
//       //변경되지 않았다면 rerender되지 않는다.
//       if (prevFriends !== friends) {
//         forceUpdate();
//       }
//       prevFriends = friends;
//     });
//     return () => unsubscribe();
//   }, []);

//   function onAdd() {
//     const friend = getNextFriend();
//     store.dispatch(addFriend(friend));
//   }
//   console.log("FriendMain render");
//   const friends = store.getState().friend.friends;
//   return (
//     <div>
//       <button onClick={onAdd}>Add Friends</button>
//       <FriendList friends={friends} />
//     </div>
//   );
// }

//Under is Refactored2

// export default function FriendMain() {
//   //useSelector훅에 입력하는 함수를 선택자 함수라고 하며 이 함수가 반환하는 값이 그대로 훅의 반환값으로 사용된다.
//   //store에 있는 state에 access할 수 있는 hook이다.
//   //useSelector훅은 이전반환값과 새로운반환값을 비교한다. 두 값이 다른 경우에만 컴포넌트를 다시 렌더링 한다.
//   const friends = useSelector((state) => state.friend.friends, shallowEqual);
//   //useDispatch()훅은 store의 dispatch메서드에 접근할 수 있는 훅이다.
//   const dispatch = useDispatch();
//   function onAdd() {
//     const friend = getNextFriend();
//     //friend/state.js에 접근하여 addFriend라는 dispatch함수를 사용한다.
//     dispatch(addFriend(friend));
//   }
//   console.log("FriendMain is Rendered!");

//   return (
//     <div>
//       <button onClick={onAdd}>Add Friend</button>
//       <FriendList friends={friends} />
//     </div>
//   );
// }

//Under is Refactored3

// export default function FriendMain() {
//   const [
//     ageLimit,
//     showLimit,
//     friendsWithAgeLimit,
//     friendsWithAgeShowLimit,
//   ] = useSelector((state) => {
//     const { friends, ageLimit, showLimit } = state.friend;

//     //친구목록에 연령제한을 적용해 새로운 목록을     생성한다.
//     const friendsWithAgeLimit = friends.filter((friend) => friend <= ageLimit);

//     return [
//       ageLimit,
//       showLimit,
//       friendsWithAgeLimit,
//       //연령제한이 적용된 목록에 개수제한을 적용해서 새로운 목록을 만든다.
//       friendsWithAgeLimit.slice(0, showLimit),
//     ];
//   }, shallowEqual);

//   const dispatch = useDispatch();
//   function onAdd() {
//     const friend = getNextFriend();
//     dispatch(addFriend(friend));
//   }
//   return (
//     <div>
//       <button onClick={onAdd}>Add Friend</button>
//       {/* //연령제한 옵션을 보여주고 연령제한 옵션이 선택하면 setAgeLimit액션이
//       생성되고 리덕스의 상태값이 변경된다. */}
//       <NumberSelect
//         onChange={(v) => dispatch(setAgeLimit(v))}
//         value={ageLimit}
//         options={AGE_LIMIT_OPTIONS}
//         postfix="세 이하만 보기"
//       />
//       {/* 연령제한으로 필터링된 친구목록을 보여준다. */}
//       <FriendList friends={friendsWithAgeLimit} />
//       {/* 개수 제한 옵션을 보여준다. 개수제한옵션을 선택하면 setShowLimit액션이 생성되고 리덕스의 상태값을 보여준다 */}
//       <NumberSelect
//         onChange={(v) => dispatch(setAgeLimit(v))}
//         value={ageLimit}
//         options={SHOW_LIMIT_OPTIONS}
//         postfix="몇명이하만 보기(연령 제한 적용)"
//       />
//       {/* 연령제한과 개수제한이 모두 적용된 친구목록을 보여준다 */}
//       <FriendList friends={friendsWithAgeShowLimit} />
//     </div>
//   );
// }

// // 연령제한과 개수제한을 위한 옵션
// const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
// const SHOW_LIMIT_OPTIONS = [2, 4, 6, MAX_SHOW_LIMIT];

//Under is Refactored4

export default function FriendMain({ ageLimit }) {
  // const [
  //   ageLimit,
  //   showLimit,
  //   friendsWithAgeLimit,
  //   friendsWithAgeShowLimit,
  // ] = useSelector(
  //   (state) => [
  //     getAgeLimit(state),
  //     getShowLimit(state),
  //     getFriendsWithAgeLimit(state),
  //     getFriendsWithAgeShowLimit(state),
  //   ],
  //   shallowEqual
  // );
  //Under is refactored useSelector
  // const ageLimit = useSelector(getAgeLimit);
  const showLimit = useSelector(getShowLimit);
  // const friendsWithAgeLimit = useSelector((state) =>
  //   getFriendsWithAgeLimit(state, ageLimit)
  // );
  const friendsWithAgeShowLimit = useSelector(getFriendsWithAgeShowLimit);
  //useMemo훅을 이용해서 getFriendsWithAgeLimit함수의 참조값이 변경되지 않도록 만든다.
  //결과적으로는 각 컴포넌트 인스턴스는 각자의 getFriendsWithAgeLimit함수를 확보하는 셈이다.
  const getFriendsWithAgeLimit = useMemo(makeGetFriendsWithAgeLimit, []);
  const friendsWithAgeLimit = useSelector((state) =>
    getFriendsWithAgeLimit(state, ageLimit)
  );
  const dispatch = useDispatch();
  function onAdd() {
    const friend = getNextFriend();
    dispatch(addFriend(friend));
  }
  return (
    <div>
      <button onClick={onAdd}>Add Friend</button>
      {/* //연령제한 옵션을 보여주고 연령제한 옵션이 선택하면 setAgeLimit액션이
      생성되고 리덕스의 상태값이 변경된다. */}
      <NumberSelect
        onChange={(v) => dispatch(setAgeLimit(v))}
        value={ageLimit}
        options={AGE_LIMIT_OPTIONS}
        postfix="세 이하만 보기"
      />
      {/* 연령제한으로 필터링된 친구목록을 보여준다. */}
      <FriendList friends={friendsWithAgeLimit} />
      {/* 개수 제한 옵션을 보여준다. 개수제한옵션을 선택하면 setShowLimit액션이 생성되고 리덕스의 상태값을 보여준다 */}
      <NumberSelect
        onChange={(v) => dispatch(setAgeLimit(v))}
        value={ageLimit}
        options={SHOW_LIMIT_OPTIONS}
        postfix="몇명이하만 보기(연령 제한 적용)"
      />
      {/* 연령제한과 개수제한이 모두 적용된 친구목록을 보여준다 */}
      <FriendList friends={friendsWithAgeShowLimit} />
    </div>
  );
}

// 연령제한과 개수제한을 위한 옵션
const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
const SHOW_LIMIT_OPTIONS = [2, 4, 6, MAX_SHOW_LIMIT];
