import { useCallback, useRef } from 'react';

export const useLongPress = (callback: (index: number) => void, ms = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const start = useCallback((index: number) => {
    timeoutRef.current = setTimeout(() => callback(index), ms);
  }, [callback, ms]);

  const stop = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return (index: number) => ({
    onMouseDown: () => start(index),
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: () => start(index),
    onTouchEnd: stop,
  });
};