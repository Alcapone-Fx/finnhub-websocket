import React from 'react';

import Paper from '@mui/material/Paper';
import { green, red } from '@mui/material/colors';
import { Box, Typography } from '@mui/material';

type StockCardProps = {
  isPositiveStokeValue: boolean;
  stockName: string;
  value: number;
  marginChange: number;
};

export const StockCard: React.FC<StockCardProps> = ({
  isPositiveStokeValue,
  stockName,
  value,
  marginChange,
}) => {
  const marginChangePercentage = (marginChange * 100).toFixed(2);

  return (
    <Paper
      elevation={3}
      sx={{
        mx: 0.5,
        my: 1,
        p: 1,
        maxHeight: 'max-content',
        width: '9rem',
        minWidth: '9rem',
        bgcolor: isPositiveStokeValue ? green[600] : red[600],
      }}
    >
      <Box>
        <Typography variant='h5'>{stockName}</Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography>{value}</Typography>
        </Box>
        <Box>
          <Typography>{marginChangePercentage}%</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
