import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import { Typography } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import * as loginAction from "actions/login.action";
const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const currentUser = loginAction.getCurrentUser();
  console.log("currentUser :", currentUser.roles[0]);

  const getCurrentUser = () => {
    if (currentUser.roles.includes("ROLE_USER")) {
      return (
        <Typography color="inherit" noWrap>
          นักวิชาการ
        </Typography>
      );
    } else {
      return (
        <Typography color="inherit" noWrap>
          ผู้ดูแลระบบ
        </Typography>
      );
    }
  };

  function makeBrand() {
    var name;

    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Typography variant="h6" color="inherit" noWrap>
            {makeBrand()}
          </Typography>
        </div>
        {getCurrentUser()}

        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
