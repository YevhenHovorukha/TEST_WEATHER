import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CircularProgress, Alert, Typography, Paper } from '@mui/material';

interface TemperatureChartProps {
  loading: boolean;
  error: string | null;
  data: { time: string; date: string; temp: number }[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  loading,
  error,
  data
}) => {
  const formattedData = data.map((item) => ({
    ...item,
    datetime: `Time:${item.time} Date:${item.date}`
  }));

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Temperature Forecast
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={formattedData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            style={{ transform: 'translateX(-30px)' }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `${value}°C`}
              labelFormatter={(label: string) => `Time and Date: ${label}`}
            />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default TemperatureChart;
