import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Container,
  colors,
  Divider,
  Typography,
  useTheme
} from '@material-ui/core';

export default function SalesByRegion({ data }) {
  const theme = useTheme();
  const [computed, setComputed] = useState({});
  useEffect(() => {
    if (!data) {
      return {};
    }
    const naPct = Math.round((data.na_sales / data.global_sales) * 100);
    const euPct = Math.round((data.eu_sales / data.global_sales) * 100);
    const jpPct = Math.round((data.jp_sales / data.global_sales) * 100);
    const otherPct = Math.round((data.other_sales / data.global_sales) * 100);
    const chartData = {
      datasets: [
        {
          data: [naPct, euPct, jpPct, otherPct],
          backgroundColor: [
            colors.indigo[500],
            colors.red[600],
            colors.orange[600],
            colors.grey[500]
          ],
          borderWidth: 5,
          borderColor: colors.common.white,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: ['North America', 'Europe', 'Japan', 'Other']
    };
    return setComputed(chartData);
  }, [data]);
  const options = {
    animation: false,
    cutoutPercentage: 60,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Container>
      <Box p={1} textAlign="center">
        <Typography color="textPrimary" variant="h3">
          Sales By Region
        </Typography>
      </Box>
      <Box height={300} position="relative">
        <Doughnut
          data={computed}
          options={options}
        />
      </Box>
      <Divider />
      <Box display="flex" justifyContent="center" mt={2}>
        <Box p={1} textAlign="center">
          <Typography color="textPrimary" variant="body1">
            North American
          </Typography>
          <Typography variant="h4" style={{ color: colors.indigo[500] }}>
            {data.na_sales}
            M
          </Typography>
        </Box>
        <Box p={1} textAlign="center">
          <Typography color="textPrimary" variant="body1">
            Europe
          </Typography>
          <Typography variant="h4" style={{ color: colors.red[600] }}>
            {data.eu_sales}
            M
          </Typography>
        </Box>
        <Box p={1} textAlign="center">
          <Typography color="textPrimary" variant="body1">
            Japan
          </Typography>
          <Typography variant="h4" style={{ color: colors.orange[600] }}>
            {data.jp_sales}
            M
          </Typography>
        </Box>
        <Box p={1} textAlign="center">
          <Typography color="textPrimary" variant="body1">
            Other
          </Typography>
          <Typography variant="h4" style={{ color: colors.grey[500] }}>
            {data.other_sales}
            M
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

SalesByRegion.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    na_sales: PropTypes.number,
    global_sales: PropTypes.number,
    eu_sales: PropTypes.number,
    jp_sales: PropTypes.number,
    other_sales: PropTypes.number,
  })
};
