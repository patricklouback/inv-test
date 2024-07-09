import { useEffect } from 'react';

const useHandleMessage = (
  messageName: string,
  callback: (payload?: Record<string, string>) => void
) => {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const { name, payload } = event.data ?? {};
      if (name === messageName) {
        callback(payload);
      }
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, [callback, messageName]);
};

export { useHandleMessage };
