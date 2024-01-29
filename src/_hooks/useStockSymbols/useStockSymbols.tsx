import { useEffect, useState } from 'react';

import { StockDataInfo, getStockSymbols } from '../../services/httpClient';

interface StockSymbolsState {
  data: StockDataInfo[];
  loading: boolean;
  error: boolean;
}

const initialState: StockSymbolsState = {
  data: [],
  loading: true,
  error: false,
};

export const useStockSymbols = () => {
  const [responseInfo, setResponseInfo] = useState(initialState);

  const fetchStockSymbols = async () => {
    try {
      const symbolsInfo = await getStockSymbols();

      setResponseInfo({
        data: symbolsInfo,
        loading: false,
        error: false,
      });
    } catch (error) {
      setResponseInfo({
        data: [],
        loading: false,
        error: true,
      });
    }
  };  

  useEffect(() => {
    fetchStockSymbols();
  }, []);

  return responseInfo;
};
