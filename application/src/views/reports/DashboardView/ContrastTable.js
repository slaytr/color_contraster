import React,{useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider, Grid,
  makeStyles, Typography,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AutorenewIcon from '@material-ui/icons/Autorenew';
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
  },
  cellGrey: {
    backgroundColor: '#BFBFBF'
  },
  cellGreen: {
    backgroundColor: colors.green[200]
  },
  cellRed: {
    backgroundColor: colors.red[200]
  },
  cellBlue: {
    backgroundColor: colors.blue[200]
  },
  iconSpacing: {
    margin: '0 2px'
  },
  renewButton: {
    margin: '4px 10px 0 0'
  }
}));

const ContrastTable = ({ className, getColours, getRatiosMatrix, ...rest }) => {
  const classes = useStyles();

  const ratiosMatrix = getRatiosMatrix;
  const colours = getColours;
  const [refresh, setRefresh] = useState(false);
  // Returns the Cell Colour
  const getColour = (ratio) => {
    if (ratio == 1) return classes.cellGrey;
    if (ratio >= 4.5) return classes.cellGreen;
    if (ratio >= 3) return classes.cellBlue;
    return classes.cellRed;
  };

  // TABLE HEADER CELLS
  const tableHeaderCells = colours.map((colour) => {
    return <TableCell align="center">{colour}</TableCell>;
  });

  // TABLE ROWS
  const tableRows = ratiosMatrix.map((ratioRow, i) => {
    return (
      <TableRow key={colours[i]}>
        <TableCell component="th" scope="row">
          <strong>
            {colours[i]}
          </strong>
        </TableCell>
        {ratioRow.map((ratio, j) => {
          return <TableCell key={colours[i] + ratio} align="center" className={`ratio-cell ${getColour(ratio)}`}>{ratio}</TableCell>;
        })}
      </TableRow>
    );
  });

  // COPY TABLE
  const copyTableToClipboard = () => {
    const el = document.querySelector('#contrast-table');
    const { body } = document;
    let range;
    let sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand('copy');
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand('Copy');
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<FileCopyIcon />}
              onClick={copyTableToClipboard}
            >
              Copy Table
            </Button>
          </>
        )}
        title="Contrast Table"
      />
      <Divider />
      <CardContent>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="h6"
        >
          Ratio Colour Key: <i
            className={`fas fa-circle ${classes.iconSpacing}`}
            style={{ color: colors.red[200] }}
          /> 1-3 <i
          className={`fas fa-circle ${classes.iconSpacing}`}
          style={{ color: colors.blue[200] }}
        /> 3-4.5 <i
          className={`fas fa-circle ${classes.iconSpacing}`}
          style={{ color: colors.green[200] }}
        /> 4.5+
        </Typography>
        <Divider />
        <Box
          height={400}
          position="relative"
        >
          {colours.length > 0 ? (<TableContainer component={Paper}>
            <Table id="contrast-table" className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow key="header-row">
                  <TableCell>Colours</TableCell>
                  {tableHeaderCells}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows}
              </TableBody>
            </Table>
          </TableContainer>) : '' }
        </Box>
      </CardContent>
    </Card>
  );
};

ContrastTable.propTypes = {
  className: PropTypes.string
};

export default ContrastTable;
