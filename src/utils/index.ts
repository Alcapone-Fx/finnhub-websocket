/* eslint-disable @typescript-eslint/no-explicit-any */
import { StockCardsInfo, FollowedStock } from '../_hooks/useStockInfoHandler/useStockInfoHandler';
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
