import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  },
  buttonSpacing: {
    margin: '2px 2px 2px 0'
  }
}));

const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();

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
              Colour List
            </Typography>
          </Grid>
        </Grid>
        <Button variant="outlined" size="small" color="#000000" className={classes.buttonSpacing}>
          #000000
        </Button>
        <Button variant="outlined" size="small" color="#000000" className={classes.buttonSpacing}>
          #ABABAB
        </Button>
        <Button variant="outlined" size="small" color="#000000" className={classes.buttonSpacing}>
          #FFFFFF
        </Button>
        <Button variant="outlined" size="small" color="#000000" className={classes.buttonSpacing}>
          #DDDDDD
        </Button>
        <Button variant="outlined" size="small" color="#000000" className={classes.buttonSpacing}>
          #EEEEEE
        </Button>
        <Button variant="outlined" size="small" color="#000000" className={classes.buttonSpacing}>
          #123123
        </Button>


      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
