import { useEffect, useRef, useState } from 'react';

import { useStockPriceWebSocket } from '../useStockPriceWebSocket/useStockPriceWebSocket';
import { buildNewFollowedStockValues } from '../../utils';

export interface FollowedStock {
  symbol: string;
  priceAlert: number;
}

export interface StockCardsInfo extends FollowedStock {
  currentPrice: number;
  previousPrice: number;
}

export const useStockInfoHandler = () => {
  const [followedStocks, setFollowedStocks] = useState<FollowedStock[]>([]);
  const [stockCardsInfo, setStockCardsInfo] = useState<StockCardsInfo[]>([]);
  const stocksRef = useRef<string[]>([]);
  const {
    socket: stockPriceSocket,
    followNewStock,
    getSocketMessages,
  } = useStockPriceWebSocket();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (stockPriceSocket?.readyState === 1) {
      const newStockSymbol = followedStocks[followedStocks.length - 1].symbol;

      if(!stocksRef.current.includes(newStockSymbol)) {
        stocksRef.current.push(newStockSymbol);
        followNewStock(newStockSymbol);
      }

      unsubscribe = getSocketMessages((message) => {
        if (message?.type === 'trade') {
          const updatedStocksInfo = buildNewFollowedStockValues(
            followedStocks,
            stockCardsInfo,
            message
          );
          setStockCardsInfo(updatedStocksInfo);
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followedStocks, stockCardsInfo]);

  return { setFollowedStocks, stockCardsInfo, followedStocks }
}