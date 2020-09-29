import React, {useState} from 'react';
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
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Button from '@material-ui/core/Button';
import PaletteIcon from "@material-ui/icons/Palette";

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
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  },
  buttonSpacing: {
    margin: '2px 2px 2px 0'
  },
  iconSpacing: {
    marginRight: '6px',
    borderRadius: '10px',
    webkitBoxShadow: '1px 1px 2px 0px rgba(0,0,0, 0.5)',
    mozBoxShadow: '1px 1px 2px 0px rgba(0,0,0, 0.5)',
    boxShadow: '1px 1px 1px 0px rgba(0,0,0, 0.3)'
  }
}));

const ColourList = ({
  className, removeColour, getColours, ...rest
}) => {
  const [change, setChange] = useState(true);
  const classes = useStyles();

  const deleteColour = (e) => {
    removeColour(e.target.parentElement.value);
    setChange(!change);
  };

  const colourButtons = getColours.map((colour) => {
    return (
      <Button
        variant="outlined"
        size="small"
        className={classes.buttonSpacing}
        onClick={deleteColour}
        value={colour}

      >
        <i
          className={`fas fa-circle ${classes.iconSpacing}`}
          style={{ color: colour }}
        />
        {colour}
      </Button>
    );
  });
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
              My Colors
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              <em>Click to remove</em>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PaletteIcon />
            </Avatar>
          </Grid>
        </Grid>
        {colourButtons}
      </CardContent>
    </Card>
  );
};

ColourList.propTypes = {
  className: PropTypes.string,
  getColours: PropTypes.array,
  removeColour: PropTypes.func
};

export default ColourList;
