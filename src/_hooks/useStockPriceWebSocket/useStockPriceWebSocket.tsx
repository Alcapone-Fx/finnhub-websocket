import { useEffect, useState } from 'react';

const WEB_SOCKET_URL = `wss://ws.finnhub.io?token=${import.meta.env.VITE_API_KEY}`;

export const useStockWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(WEB_SOCKET_URL);

      newSocket.addEventListener('open', () => {
        console.info('WebSocket connected');
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [socket]);

  return socket;
};
