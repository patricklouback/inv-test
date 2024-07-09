type Payload = Record<string, string> | undefined;

const useSendMessage = () => {
  const sendMessage = (name: string, payload?: Payload) => {
    const event = new MessageEvent('message', { data: { name, payload } });
    window.dispatchEvent(event);
  };

  return sendMessage;
};

export { useSendMessage };
