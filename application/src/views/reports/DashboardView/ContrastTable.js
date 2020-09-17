import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    margin: '4px 4px 0 0'
  }
}));

const ContrastTable = ({ className, colourList, ...rest }) => {
  const classes = useStyles();

  const hexColours = colourList;

  // HEX TO RGB FUNCTION
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  // RGB TO LUM FUNCTION
  const luminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };
  // LUM TO RATIO FUNCTION
  const calculateRatio = (colourOneLuminance, colourTwoLuminance) => {
    return colourOneLuminance > colourTwoLuminance
      ? ((colourTwoLuminance + 0.05) / (colourOneLuminance + 0.05))
      : ((colourOneLuminance + 0.05) / (colourTwoLuminance + 0.05));
  };

  const rgbColours = hexColours.map((colour) => {
    return hexToRgb(colour);
  });
  console.log(rgbColours);
  const lumColours = rgbColours.map(({r, g, b}) => {
    return luminance(r, g, b);
  });

  console.log(lumColours)

  function createData(hex, name, calories, fat, carbs, protein, ratio) {
    return {
      hex, name, calories, fat, carbs, protein, ratio
    };
  }

  const rows = [
    createData('#000000', 'Frozen yoghurt', 159, 6.0, 24, 4.0, 4.0),
    createData('#ABABAB', 'Ice cream sandwich', 237, 9.0, 37, 4.3, 4.3),
    createData('#FFFFFF', 'Eclair', 262, 16.0, 24, 6.0, 6.0),
    createData('#DDDDDD', 'Cupcake', 305, 3.7, 67, 4.3, 4.3),
    createData('#EEEEEE', 'Gingebread', 356, 16.0, 49, 3.9, 3.9),
    createData('#123123', 'Gingerbread', 356, 16.0, 49, 3.9, 3.9),
  ];
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<FileCopyIcon />}
          >
            Copy Table
          </Button>
        )}
        title="Contrast Table"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Colours</TableCell>
                  <TableCell align="right">#000000</TableCell>
                  <TableCell align="right">#ABABAB</TableCell>
                  <TableCell align="right">#FFFFFF</TableCell>
                  <TableCell align="right">#DDDDDD</TableCell>
                  <TableCell align="right">#EEEEEE</TableCell>
                  <TableCell align="right">#123123</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <strong>
                        {row.hex}
                      </strong>
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.ratio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
      {/* <Divider /> */}
      {/* <Box */}
      {/*  display="flex" */}
      {/*  justifyContent="flex-end" */}
      {/*  p={2} */}
      {/* > */}
      {/*  <Button */}
      {/*    color="primary" */}
      {/*    endIcon={<ArrowRightIcon />} */}
      {/*    size="small" */}
      {/*    variant="text" */}
      {/*  > */}
      {/*    Overview */}
      {/*  </Button> */}
      {/* </Box> */}
    </Card>
  );
};

ContrastTable.propTypes = {
  className: PropTypes.string
};

export default ContrastTable;