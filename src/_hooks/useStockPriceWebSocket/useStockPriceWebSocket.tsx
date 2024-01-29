import { useEffect, useState } from 'react';

const WEB_SOCKET_URL = `wss://ws.finnhub.io?token=${
  import.meta.env.VITE_API_KEY
}`;

export const useStockPriceWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(WEB_SOCKET_URL);

      newSocket.addEventListener('open', () => {
        console.info('WebSocket connected');
      });

      newSocket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });

      newSocket.addEventListener('close', () => {
        console.log('WebSocket closed');
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socket;
};
