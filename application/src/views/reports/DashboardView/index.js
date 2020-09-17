import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ColourAdder from './ColourAdder';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import ContrastTable from './ContrastTable';
import TasksProgress from './TasksProgress';
import ColourList from './ColourList';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [colours, setColours] = useState([]);

  const addColour = (colour) => {
    let colourList = [...colours];
    colourList.push(colour);
    setColours(colourList);
  };

  const removeColour = (colour) => {
    const index = colours.indexOf(colour);
    if (index > -1) {
      colours.splice(index, 1);
    }
    setColours(colours);
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={12}
            xl={3}
            xs={12}
          >
            <ColourAdder addColour={addColour} />
          </Grid>
          <Grid
            item
            lg={5}
            sm={6}
            xl={3}
            xs={12}
          >
            <ColourList getColours={colours} removeColour={removeColour} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <ContrastTable colourList={colours} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
