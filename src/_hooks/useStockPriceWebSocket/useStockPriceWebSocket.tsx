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

  const followNewStock = (symbol: string) => {
    try {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: 'subscribe',
            symbol,
          })
        );
      }
    } catch (error) {
      console.error('Error folowwing new stock!', error);
    }
  };

  /**
   * Receives a callback to pass the messages from socket
   * Returns the unsubscribe function
   * @param callback
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSocketMessages = (callback: (message: any) => void) => {
    try {
      if (socket) {
        const messageHandler = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            callback(data);
          } catch (error) {
            console.error('Error parsing message data!', error);
          }
        };

        socket.addEventListener('message', messageHandler);

        return () => {
          socket.removeEventListener('message', messageHandler);
        };
      }
    } catch (error) {
      console.error('Error setting up message listener!', error);
    }
  };

  return { socket, followNewStock, getSocketMessages };
};
