import React, { useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import { blueGrey } from '@mui/material/colors';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

import { StockCardsInfo } from '../../_hooks/useStockInfoHandler/useStockInfoHandler';
import { updateGraphData } from '../../utils';

const CanvasJS = CanvasJSReact.CanvasJS;

type StockGraphProps = {
  stocksInfo: StockCardsInfo[];
};

export interface GraphData {
  type: string;
  showInLegend: boolean;
  legendText: string;
  dataPoints: { x: Date; y: number }[];
}

interface GraphOptions {
  title: { text: string };
  data: GraphData[];
}

export const StockGraph: React.FC<StockGraphProps> = ({ stocksInfo }) => {
  const graphOptionsRef = useRef<GraphOptions>({
    title: { text: 'Stock Graph' },
    data: [],
  });

  useEffect(() => {
    graphOptionsRef.current.data = updateGraphData(
      graphOptionsRef.current.data,
      stocksInfo
    );
    
    const chart = new CanvasJS.Chart('chartContainer', {
      ...graphOptionsRef.current,
      data: graphOptionsRef.current.data,
    });

    chart.render();
  }, [stocksInfo]);

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: blueGrey[50],
        width: '35rem',
        height: '25rem',
        m: '0 auto',
      }}
    >
      <div id='chartContainer' style={{ height: '100%', width: '100%' }}></div>
    </Paper>
  );
};
