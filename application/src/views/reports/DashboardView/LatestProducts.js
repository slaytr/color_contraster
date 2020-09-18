import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const data = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  },
  bottomSpacing: {
    margin: '0 0 16px 0'
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Web Content Accessibility Guidelines (WCAG)"
      />
      <Divider />
      <CardContent>
        <Typography className={classes.bottomSpacing}>
          <strong>Cross Contrast</strong> measures the differences between foreground and background colours with respect to <strong>WCAG 2.0/2.1</strong>. An ISO standard: ISO/IE 40500:2012.
        </Typography>
        <Table id="wcag-standards" className={classes.table} size="small" aria-label="wcag-standards">
          <TableHead>
            <TableRow key="wcag-head">
              <TableCell>Standard</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Minimum Ratio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>AA</TableCell>
              <TableCell>Graphics and UI</TableCell>
              <TableCell>3 : 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>AA</TableCell>
              <TableCell>Normal Text</TableCell>
              <TableCell>4.5 : 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>AAA</TableCell>
              <TableCell>Normal Text</TableCell>
              <TableCell>7 : 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>AA</TableCell>
              <TableCell>Large Text</TableCell>
              <TableCell>3 : 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>AAA</TableCell>
              <TableCell>Large Text</TableCell>
              <TableCell>4.5 : 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          href="https://www.w3.org/WAI/standards-guidelines/wcag/"
          target="_blank"
          size="small"
          variant="text"
        >
          View More
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
