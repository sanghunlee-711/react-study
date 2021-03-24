import { shallowEqual } from "reacut-redux";
import { useSelector } from "react-redux";

function useMyselector(selector) {
  //이렇게 하면 항상 shallowEqual이 입력된다.
  return useSelector(selector, shallowEqual);
}

function MyComponent() {
  const [value1, value2] = useMyselector((state) => [
    state.value1,
    state.value2,
  ]);

  //이 방법은 상태값을 하나만 반환하는 경우 비효율적으로 동작할 수 있다.
  //상태값이 하나라면 한번의 단순비교만으로도 충분하지만 아래와 같이 기입하면 value3내부의 모든 속성값을 비교하게된다.
  const value3 = useMyselector((state) => state.value3);

  //성능이 걱정된다면 상태값을 하나만 반환할때도 배열로 감싸면 된다.
  const [value4] = useMyselector((state) => [state.value4]);
}

export default function MyComponent2() {
  const [value1, value2, value3] = useSelector(
    (state) => [state.value1, state.valu2, state.value3],
    shallowEqual
  );
}
