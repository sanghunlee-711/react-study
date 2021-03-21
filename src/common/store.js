import { createStore, combineReducers } from "redux";
import timeLineReducer from "../timeline/state";
import friendReducer from "../friend/state";

const reducer = combineReducers({
  timeline: timeLineReducer,
  friend: friendReducer,
});

const store = createStore(reducer);

export default store;
