import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles, CardHeader, Button, Divider
} from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
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

const ColourAdder = ({ className, addColour, ...rest }) => {
  const classes = useStyles();

  const [currentColour, setCurrentColour] = useState('#');

  const inputChange = (e) => {
    if (e.target.value.length < 8 && e.target.value.length > 0) {
      setCurrentColour(e.target.value);
    }
  };

  const validateColour = (colour) => {
    return !!(colour.match(/#[0-9A-Fa-f]{6}/gi) || colour === '#');
  };

  const formSubmit = (e) => {
    if (validateColour(currentColour)) {
      addColour('#' + currentColour.slice(1).toUpperCase());
      setCurrentColour('#');
    }
    e.preventDefault();
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
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Add Colors
            </Typography>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formSubmit}>
              <TextField
                error={!validateColour(currentColour)}
                id="standard-basic"
                label="Hex Code (eg. #000000)"
                placeholder="#000000"
                onChange={inputChange}
                value={currentColour}
              />
            </form>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <BrushIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ColourAdder.propTypes = {
  className: PropTypes.string,
  addColour: PropTypes.func
};

export default ColourAdder;
