import { useRef, useEffect } from "react";
import isEqual from "fast-deep-equal";

export function useDeepCompareEffect(fn, deps) {
  const trigger = useRef(0);
  const prevDeps = useRef(deps);
  if (!isEqual(prevDeps.current, deps)) {
    trigger.current++;
  }
  prevDeps.current = deps;
  return useEffect(fn, [trigger.current]);
}
