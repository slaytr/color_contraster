import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ColourAdder from './ColourAdder';
import ContrastTable from './ContrastTable';
import ColourList from './ColourList';
import AverageRatio from './AverageRatio';
import WCAG from './WCAG';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  // Styles
  const classes = useStyles();
  // States
  const [colours, setColours] = useState([]);
  const [ratios, setRatios] = useState([]);
  // HEX TO RGB FUNCTION -Helper Functions <Move to File>
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
      ? (1 / ((colourTwoLuminance + 0.05) / (colourOneLuminance + 0.05))).toFixed(2)
      : (1 / ((colourOneLuminance + 0.05) / (colourTwoLuminance + 0.05))).toFixed(2);
  };
  const getLumList = (coloursList) => {
    return coloursList.map((colour) => {
      return hexToRgb(colour);
    }).map(({ r , g, b }) => {
      return luminance(r, g, b);
    }).map((lum, i) => {
      return {
        hex: coloursList[i],
        lum
      };
    });
  };
  // State Functions
  const addColour = (colour) => {
    const colourList = [...colours];
    colourList.push(colour);
    setColours(colourList);
    // Modify Ratio Matrix
    const ratiosList = [];
    let ratiosRow = [];
    const lumList = getLumList(colourList);
    lumList.forEach((colour1) => {
      lumList.forEach((colour2) => {
        ratiosRow.push(calculateRatio(colour1.lum, colour2.lum));
      });
      ratiosList.push(ratiosRow);
      ratiosRow = [];
    });
    setRatios(ratiosList);
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
      title="Cross Contrast"
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
            xl={6}
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
            <AverageRatio getRatiosMatrix={ratios} />
          </Grid>
          <Grid
            item
            lg={9}
            md={12}
            xl={9}
            xs={12}
          >
            <ContrastTable getColours={colours} getRatiosMatrix={ratios} />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <WCAG getRatiosMatrix={ratios}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
