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
import api from 'src/api/codingApi';

function randomColor() {
  const hex = Math.floor(Math.random() * 0xFFFFFF);
  const color = `#${hex.toString(16)}`;
  return color;
}
export default function SalesByPlatform({ data, modalOpen }) {
  const theme = useTheme();
  const [computed, setComputed] = useState({});
  const [sales, setSales] = useState([]);
  useEffect(() => {
    if (!data) {
      return;
    }
    api.getSales({ name: data.name }).then((response) => {
      const total = response.reduce((acc, val) => {
        return acc + val.global_sales;
      }, 0);
      const percentColors = [];
      const labels = [];
      const salesInfo = [];
      const percentages = response.map((item) => {
        const color = randomColor();
        percentColors.push(color);
        labels.push(item.platform);
        salesInfo.push({
          name: item.platform,
          sales: item.global_sales,
          color
        });
        return Math.round((item.global_sales / total) * 100);
      });

      const chartData = {
        datasets: [
          {
            data: percentages,
            backgroundColor: percentColors,
            borderWidth: 5,
            borderColor: colors.common.white,
            hoverBorderColor: colors.common.white
          }
        ],
        labels
      };
      if (modalOpen) {
        setSales(salesInfo);
        setComputed(chartData);
      }
    });
  }, [data, modalOpen]);

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
          Sales By Platform
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
        {
          sales.map((platform) => (
            <Box p={1} textAlign="center" key={platform.name}>
              <Typography color="textPrimary" variant="body1">
                {platform.name}
              </Typography>
              <Typography variant="h4" style={{ color: platform.color }}>
                {platform.sales}
                M
              </Typography>
            </Box>
          ))
        }
      </Box>
    </Container>
  );
}

SalesByPlatform.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string
  }),
  modalOpen: PropTypes.bool
};
