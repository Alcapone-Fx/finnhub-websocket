import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Typography } from '@mui/material';

const stockSymbols = [
  {
    stockSymbol: 'BTC',
  },
  {
    stockSymbol: 'S&P',
  },
  {
    stockSymbol: 'MMM',
  },
  {
    stockSymbol: 'APL',
  },
];

export const StockAlertForm = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant='h6'>Set your alert</Typography>
      <form>
        <div>
          <FormControl sx={{ m: 1, mt: 2, width: '10rem' }} size='small'>
            <InputLabel htmlFor='price-alert'>Price Alert</InputLabel>
            <OutlinedInput
              id='price-alert'
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
              label='Price Alert'
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '10rem' }} size='small'>
            <InputLabel id='stock-symbol-select-label'>Stock</InputLabel>
            <Select
              labelId='stock-symbol-select-label'
              id='stock-symbol-select'
              label='Stock'
              onChange={(e: SelectChangeEvent) => console.log(e.target.value)}
            >
              {stockSymbols.map(({ stockSymbol }) => (
                <MenuItem key={stockSymbol} value={stockSymbol}>
                  {stockSymbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            sx={{ m: 1, width: '10rem' }}
          >
            Add Stock
          </Button>
        </div>
      </form>
    </Box>
  );
};
