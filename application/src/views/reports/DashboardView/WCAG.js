import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const WCAG = ({ className, getRatiosMatrix,...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const ratiosMatrix = getRatiosMatrix;

  const data = () => {
    let good = 0;
    let pass = 0;
    let fail = 0;
    ratiosMatrix.map((ratiosRow) => {
      ratiosRow.map((ratio) => {
        if (ratio >= 4.5) {
          good += 1;
        } else if (ratio >= 3) {
          pass += 1;
        } else if (ratio != 1) {
          fail += 1;
        }
      });
    });
    let graphData = [];
    let backgroundColors = [];
    let labels = [];
    let percentageDataList = [];
    if (good) {
      // graphData
      graphData.push(good);
      backgroundColors.push(colors.green[500]);
      labels.push('Good');

      // percentageData
      percentageDataList.push({
        title: 'Good',
        value: Math.round(good/(good+pass+fail)*100),
        icon: LaptopMacIcon,
        color: colors.green[500]
      });
    }
    if (pass) {
      // graphData
      graphData.push(pass);
      backgroundColors.push(colors.blue[300]);
      labels.push('Ok');

      // percentageData
      percentageDataList.push({
        title: 'Ok',
        value: Math.round(pass/(good+pass+fail)*100),
        icon: LaptopMacIcon,
        color: colors.blue[500]
      });
    }
    if (fail) {
      // graphData
      graphData.push(fail);
      backgroundColors.push(colors.red[600]);
      labels.push('Fail');

      // percentageData
      percentageDataList.push({
        title: 'Fail',
        value:  Math.round(fail/(good+pass+fail)*100),
        icon: LaptopMacIcon,
        color: colors.red[500]
      });
    }
    return {
      graphData: {
        datasets: [
          {
            data: graphData,
            backgroundColor: backgroundColors,
            borderWidth: 8,
            borderColor: colors.common.white,
            hoverBorderColor: colors.common.white
          }
        ],
        labels: labels
      },
      percentageData: percentageDataList
    };
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
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
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Statistics" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data().graphData}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {data().percentageData ? data().percentageData.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          )) : ''}
        </Box>
      </CardContent>
    </Card>
  );
};

WCAG.propTypes = {
  className: PropTypes.string
};

export default WCAG;
