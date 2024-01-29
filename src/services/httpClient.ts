import axios from 'axios';

const finnhubHTTPClient = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
});

export interface StockDataInfo {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string | null;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

type StockDataResponse = StockDataInfo[];

export const getStockSymbols = (): Promise<StockDataResponse> =>
  finnhubHTTPClient
    .get<StockDataResponse>(`/stock/symbol?exchange=US&token=${import.meta.env.VITE_API_KEY}`)
    .then((response) => response.data);
