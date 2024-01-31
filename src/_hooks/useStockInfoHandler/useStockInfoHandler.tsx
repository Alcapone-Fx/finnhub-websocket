import { useEffect, useRef } from 'react';

import { LOCAL_STORAGE_KEYS } from '../../constants';
import { useStockPriceWebSocket } from '../useStockPriceWebSocket/useStockPriceWebSocket';
import { useCachedState } from '../useCachedState/useCachedState';
import { buildNewFollowedStockValues } from '../../utils';

export interface FollowedStock {
  symbol: string;
  priceAlert: number;
}

export interface StockCardsInfo extends FollowedStock {
  currentPrice: number;
  previousPrice: number;
}

const { FOLLOWED_STOCKS, STOCK_CARDS_INFO } = LOCAL_STORAGE_KEYS;

export const useStockInfoHandler = () => {
  const [followedStocks, setFollowedStocks] = useCachedState<FollowedStock[]>(
    FOLLOWED_STOCKS,
    []
  );
  const [stockCardsInfo, setStockCardsInfo] = useCachedState<StockCardsInfo[]>(
    STOCK_CARDS_INFO,
    []
  );
  const stocksRef = useRef<string[]>([]);
  const { followNewStock, getSocketMessages, isSubscribedFromCache } =
    useStockPriceWebSocket(followedStocks);

  useEffect(() => {
    if (followedStocks.length > 0) {
      const newStockSymbol = followedStocks[followedStocks.length - 1].symbol;

      if (!stocksRef.current.includes(newStockSymbol)) {
        stocksRef.current.push(newStockSymbol);
        followNewStock(newStockSymbol);
      }
    }

    const unsubscribe = getSocketMessages((message) => {
      if (message?.type === 'trade') {
        const updatedStocksInfo = buildNewFollowedStockValues(
          followedStocks,
          stockCardsInfo,
          message
        );
        setStockCardsInfo(updatedStocksInfo);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followedStocks, stockCardsInfo, isSubscribedFromCache]);

  return { setFollowedStocks, stockCardsInfo, followedStocks };
};
