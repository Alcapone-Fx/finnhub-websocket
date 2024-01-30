import { useEffect, useRef, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';

import { useStockPriceWebSocket } from './_hooks/useStockPriceWebSocket/useStockPriceWebSocket';
import { StockCard } from './components/StockCard/StockCard';
import { StockAlertForm } from './components/StockAlertForm/StockAlertForm';
import { StockGraph } from './components/StockGraph/StockGraph';
import { calculateMarginChange, buildNewFollowedStockValues } from './utils';

export interface FollowedStock {
  symbol: string;
  priceAlert: number;
}

export interface StockCardsInfo extends FollowedStock {
  currentPrice: number;
  previousPrice: number;
}

const App = () => {
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
  }, [followedStocks, stockCardsInfo]);

  const onAddStock = (symbol: string, priceAlert: number) => {
    const newFollowedStock: FollowedStock = {
      symbol,
      priceAlert,
    };
    setFollowedStocks((prevStocks) => [...prevStocks, newFollowedStock]);
  };

  return (
    <Box>
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: blueGrey[600],
          height: '6rem',
        }}
      >
        <Toolbar sx={{ height: '6rem', overflowX: 'auto' }}>
          {stockCardsInfo.length === 0 ? (
            <Typography variant='h6'>Add a stock to track!</Typography>
          ) : (
            stockCardsInfo.map(
              ({ symbol, priceAlert, currentPrice, previousPrice }) => (
                <StockCard
                  key={symbol}
                  stockName={symbol}
                  value={currentPrice || 0}
                  marginChange={calculateMarginChange(
                    previousPrice,
                    currentPrice
                  )}
                  priceAboveAlert={currentPrice >= priceAlert}
                />
              )
            )
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: blueGrey[50],
          },
        }}
      >
        <Toolbar />
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{ overflow: 'auto', pt: 6 }}
        >
          <StockAlertForm onAddStock={onAddStock} />
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, mt: 8, pl: 30 }}>
        <Toolbar />
        <StockGraph />
      </Box>
    </Box>
  );
};

export default App;
