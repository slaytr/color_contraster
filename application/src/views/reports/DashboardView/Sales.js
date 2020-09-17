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
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    margin: '4px 4px 0 0'
  }
}));

const Sales = ({ className, ...rest }) => {
  const classes = useStyles();

  function createData(name, calories, fat, carbs, protein) {
    return {
      name, calories, fat, carbs, protein
    };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
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
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <strong>
                        {row.name}
                      </strong>
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
      {/*<Divider />*/}
      {/*<Box*/}
      {/*  display="flex"*/}
      {/*  justifyContent="flex-end"*/}
      {/*  p={2}*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    color="primary"*/}
      {/*    endIcon={<ArrowRightIcon />}*/}
      {/*    size="small"*/}
      {/*    variant="text"*/}
      {/*  >*/}
      {/*    Overview*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
