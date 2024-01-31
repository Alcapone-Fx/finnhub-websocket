/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  StockCardsInfo,
  FollowedStock,
} from '../_hooks/useStockInfoHandler/useStockInfoHandler';
import { GraphData } from '../components/StockGraph/StockGraph';
/**
 * Returns a single value representing the percentage change.
 * If it's positive, the current value is higher or equal to the previous value
 * If it's negative, the current value is lower
 * @param previousValue
 * @param currentValue
 * @returns
 */
export const calculateMarginChange = (
  previousValue: number,
  currentValue: number
): number => {
  const marginChange = currentValue - previousValue;

  if (currentValue >= previousValue) {
    return previousValue === 0 ? 0 : (marginChange / previousValue) * 100;
  }

  return (marginChange / currentValue) * 100;
};

/**
 * Creates the structure for cardsInfo getting the new Added Stocks from form
 * @param followedStocks 
 * @param cardsInfo 
 * @returns 
 */
const matchStocksFromFollowed = (
  followedStocks: FollowedStock[],
  cardsInfo: StockCardsInfo[]
) =>
  followedStocks.map((followedStock) => {
    const existingCardInfo = cardsInfo.find(
      (cardInfo) => cardInfo.symbol === followedStock.symbol
    );
    if (existingCardInfo) {
      return existingCardInfo;
    }

    return { ...followedStock, currentPrice: 0, previousPrice: 0 };
  });

  /**
   * Creates an array of all relevant stock values
   * Updates the previous and current values for each cardsInfo
   * And adds the new Added Stocks from form
   * @param followedStocks 
   * @param cardsInfo 
   * @param message 
   * @returns 
   */
export const buildNewFollowedStockValues = (
  followedStocks: FollowedStock[],
  cardsInfo: StockCardsInfo[],
  message: any
) => {
  const newCardsInfo = matchStocksFromFollowed(followedStocks, cardsInfo);

  return newCardsInfo.map((cardInfo) => {
    const updatedStockInfo = { ...cardInfo };
    const stockInMessage = message?.data?.find(
      (trade: any) => trade?.s === updatedStockInfo.symbol
    );
    if (!stockInMessage) {
      return updatedStockInfo;
    }

    updatedStockInfo.previousPrice = updatedStockInfo.currentPrice;
    updatedStockInfo.currentPrice = stockInMessage?.p;

    return updatedStockInfo;
  });
};

/**
 * Inmutable function to add data points in timeline
 * @param currentGraphData 
 * @param stocksInfo 
 * @returns 
 */
export const updateGraphData = (
  currentGraphData: GraphData[],
  stocksInfo: StockCardsInfo[]
) => {
  const date = new Date();
  const newGraphData: GraphData[] = [];
  stocksInfo.forEach((stock) => {
    const graphData = currentGraphData.find(
      (data) => data.legendText === stock.symbol
    );

    if (stock.currentPrice === 0) {
      return;
    }

    if (!graphData) {
      newGraphData.push({
        type: 'line',
        showInLegend: true,
        legendText: stock.symbol,
        dataPoints: [{ x: date, y: stock.currentPrice }],
      });
    } else {
      newGraphData.push({
        ...graphData,
        dataPoints: [
          ...graphData.dataPoints,
          { x: date, y: stock.currentPrice },
        ],
      });
    }
  });

  return newGraphData;
};
