/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

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

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: StockDataInfo) => option.symbol,
  limit: 200,
});

export const StockAlertForm = () => {
  const { data: stockOptions, error, loading } = useStockSymbols();

  const [formValues, setFormValues] = useState({
    priceAlert: 0,
    stockSymbol: '',
  });

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const onAddStock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormValues({
      priceAlert: Number((e.target as any).priceAlert.value),
      stockSymbol: (e.target as any).stockSymbol.value,
    });
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant='h6'>Set your alert</Typography>
      <form onSubmit={onAddStock}>
        <div>
          <FormControl sx={{ m: 1, mt: 2, width: '10rem' }} size='small'>
            <InputLabel htmlFor='priceAlert'>Price Alert</InputLabel>
            <OutlinedInput
              id='priceAlert'
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
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
        </div>
      </form>
    </Box>
  );
};
