import { useCallback } from 'react';

export const useHaptic = () => {
  const trigger = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // Light vibration for 50ms
    }
  }, []);

  return { trigger };
};

