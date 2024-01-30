/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Alert from '@mui/material/Alert';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import { useStockSymbols } from '../../_hooks/useStockSymbols/useStockSymbols';
import { StockDataInfo } from '../../services/httpClient';

type StockAlertFormProps = {
  onAddStock: (symbol: string, priceAlert: number) => void;
};

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: StockDataInfo) => option.symbol,
  limit: 200,
});

export const StockAlertForm: React.FC<StockAlertFormProps> = ({
  onAddStock,
}) => {
  const { data: stockOptions, error, loading } = useStockSymbols();

  const addStock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddStock(
      (e.target as any).stockSymbol.value,
      Number((e.target as any).priceAlert.value)
    );
  };

  return (
    <Box>
      <Typography variant='h6' sx={{ pl: 1 }}>
        Set your alert
      </Typography>
      <form onSubmit={addStock}>
        <FormControl sx={{ m: 1, mt: 2, width: '10rem' }} size='small'>
          <InputLabel htmlFor='priceAlert'>Price Alert</InputLabel>
          <OutlinedInput
            id='priceAlert'
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
            label='Price Alert'
          />
        </FormControl>
        <Autocomplete
          id='stockSymbol'
          size='small'
          loading={loading}
          options={stockOptions}
          getOptionLabel={(option) => option.symbol}
          filterOptions={filterOptions}
          sx={{ m: 1, width: '10rem' }}
          renderInput={(params) => <TextField {...params} label='Stock' />}
        />
        <Button
          type='submit'
          variant='contained'
          disabled={error || loading}
          sx={{ m: 1, width: '10rem' }}
        >
          Add Stock
        </Button>
        {error ?? <Alert severity='error'>Something went wrong!</Alert>}
      </form>
    </Box>
  );
};
