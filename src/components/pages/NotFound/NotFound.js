import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
 
  }));

const PageNotFound = () => {
    const classes = useStyles();

  return (
    <Container component="main">
         <div className={classes.paper}>
      <h3>This page could not be found</h3>

      <img src="https://i.imgur.com/qIufhof.png" />
      <div id="info"></div>
      </div>
    </Container>
  );
};

export default PageNotFound;
