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
import BrushIcon from '@material-ui/icons/Brush';
import TextField from '@material-ui/core/TextField';

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
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({ className, ...rest }) => {
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
              Add Colours
            </Typography>
            {/*<Typography*/}
            {/*  color="textPrimary"*/}
            {/*  variant="h3"*/}
            {/*>*/}
            {/*  $24,000*/}
            {/*</Typography>*/}
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic"
                         label="Hex Code"
                         placeholder="#000000" />
            </form>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <BrushIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/*<Box*/}
        {/*  mt={2}*/}
        {/*  display="flex"*/}
        {/*  alignItems="center"*/}
        {/*>*/}
        {/*  <ArrowDownwardIcon className={classes.differenceIcon} />*/}
        {/*  <Typography*/}
        {/*    className={classes.differenceValue}*/}
        {/*    variant="body2"*/}
        {/*  >*/}
        {/*    12%*/}
        {/*  </Typography>*/}
        {/*  <Typography*/}
        {/*    color="textSecondary"*/}
        {/*    variant="caption"*/}
        {/*  >*/}
        {/*    Since last month*/}
        {/*  </Typography>*/}
        {/*</Box>*/}
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
