import { useCallback, useEffect, useRef, useState } from "react";

export default function useMountedState<T>(
  initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>];
export default function useMountedState<T = undefined>(
  initialState?: T | (() => T)
): [T | undefined, (state: T) => void] {
  const [state, setState] = useState<T | undefined>(initialState ?? undefined);
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  const setMountedState = useCallback((state: T) => {
    if (isMounted.current) {
      setState(state);
    }
  }, []);
  return [state, setMountedState];
}
