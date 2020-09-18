import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BeenhereIcon from '@material-ui/icons/Beenhere';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const AverageRatio = ({ className, getRatiosMatrix, ...rest }) => {
  const classes = useStyles();
  const ratiosMatrix = getRatiosMatrix;

  const getAverageRatio = () => {
    let total = 0;
    let sum = 0;
    ratiosMatrix.map((ratiosRow) => {
      ratiosRow.map((ratio) => {
        if (ratio != 1) {
          total += 1;
          sum += parseFloat(ratio);
        }
      });
    });
    return (sum / total).toFixed(2);
  };

  const ratio = getAverageRatio();
  let ratioComment = () => {
    if (ratio > 3) {
      return "Excellent!";
    }
    if (ratio > 2) {
      return "Acceptable";
    }
    return "No Good";
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Average Ratio
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {ratiosMatrix.length > 1 ? getAverageRatio() : '0'}
            </Typography>
            <Typography
              color="textSecondary"
              variant="h4"
            >
              {ratiosMatrix.length > 1 ? ratioComment() : ''}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <BeenhereIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AverageRatio.propTypes = {
  className: PropTypes.string
};

export default AverageRatio;
