import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { FollowedStock } from '../../_hooks/useStockInfoHandler/useStockInfoHandler';

type StockAlertListProps = {
  stockList: FollowedStock[];
};

export const StockAlertList: React.FC<StockAlertListProps> = ({
  stockList,
}) => {
  return (
    <TableContainer component={Paper} sx={{ width: '35rem', m: '0 auto', }}>
      <Typography variant='h6' sx={{ ml: 1, mt: 1 }}>Stock Alert List:</Typography>
      <Table
        sx={{ overflowX: 'auto' }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Stock Symbol</TableCell>
            <TableCell>Price Alert</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockList.map((row) => (
            <TableRow
              key={row.symbol}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {row.symbol}
              </TableCell>
              <TableCell>{row.priceAlert}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
