import React, { useEffect, useReducer } from "react";
import store from "../../common/store";
import { getNextFriend, getNextTimeLine } from "../../common/mockData";
import { addFriend } from "../state";
import FriendList from "../component/FriendList";

export default function FriendMain() {
  const [, forceUpdate] = useReducer((v) => v + 1, 0);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate());
    return () => unsubscribe();
  }, []);

  function onAdd() {
    const friend = getNextFriend();
    store.dispatch(addFriend(friend));
  }
  console.log("FriendMain render");
  const friends = store.getState().friend.friends;
  return (
    <div>
      <button onClick={onAdd}>Add Friends</button>
      <FriendList friends={friends} />
    </div>
  );
}
