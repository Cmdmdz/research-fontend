import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import * as loginActions from "actions/login.action";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import EditIcon from "@material-ui/icons/Edit";
import PeopleIcon from '@material-ui/icons/People';
const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const currentUser = loginActions.getCurrentUser();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const role = () => {
    if (currentUser.roles[0] == "ROLE_USER") {
      return (
        <List className={classes.list}>
          {linked.map((prop, key) => {
            var activePro = " ";
            var listItemClasses;

            listItemClasses = classNames({
              [" " + classes[color]]: activeRoute(prop.layout + prop.path),
            });

            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
            });
            return (
              <NavLink
                to={prop.layout + prop.path}
                className={activePro + classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon className={classNames(classes.itemIcon)} />
                  )}
                  <ListItemText
                    primary={props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
          })}
          <div></div>
        </List>
      );
    }
    if (currentUser.roles[0] == "ROLE_ADMIN") {
      return (
        <List className={classes.list}>
          {admin.map((prop, key) => {
            var activePro = " ";
            var listItemClasses;

            listItemClasses = classNames({
              [" " + classes[color]]: activeRoute(prop.layout + prop.path),
            });

            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
            });
            return (
              <NavLink
                to={prop.layout + prop.path}
                className={activePro + classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon className={classNames(classes.itemIcon)} />
                  )}
                  <ListItemText
                    primary={props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
          })}
          <div></div>
        </List>
      );
    }
  };

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const linked = [
    {
      path: "/research",
      name: "งานวิจัย",
      icon: "content_paste",
      layout: "/admin",
    },
    {
      path: "/create",
      name: "สร้างงานวิจัย",
      icon: AddToPhotosIcon,
      layout: "/admin",
    },
  ];

  const admin = [
    {
      path: "/report",
      name: "รายงาน",
      icon: LibraryBooks,
      layout: "/admin",
    },
    {
      path: "/account",
      name: "นักวิชาการ",
      icon: PeopleIcon,
      layout: "/admin",
    }
   
  ];

  const auth = [
    {
      path: "/aboutUs",
      name: "ข้อมูลส่วนตัว",
      icon: Person,
      layout: "/admin",
    },
    {
      path: "/edit",
      name: "แก้ไขข้อมูล",
      icon: EditIcon,
      layout: "/admin",
    },
  ];

  var brand = (
    <div className={classes.logo}>
      <ListItem className={classes.itemLink}>
        <Typography className={classes.whiteFont}>
          ระบบติดตามงานวิจัย
        </Typography>
      </ListItem>
    </div>
  );

  var links2 = (
    <List className={classes.list}>
      {auth.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon className={classNames(classes.itemIcon)} />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
      <div></div>
    </List>
  );

  var brand2 = (
    <div className={classes.logo}>
      <ListItem button onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          className={classes.whiteFont}
          primary={currentUser.username}
        />
        {open ? (
          <ExpandLess className={classes.whiteFont} />
        ) : (
          <ExpandMore className={classes.whiteFont} />
        )}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {links2}
      </Collapse>
    </div>
  );

  var activePro = classes.activePro + " ";

  const { color, image } = props;

  // var links = (

  // );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          {brand2}
          <div className={classes.sidebarWrapper}>
            {role()}
            <div
              className={activePro}
              onClick={() => {
                dispatch(loginActions.logout({ ...props }));
              }}
            >
              <ListItem button className={classes.itemLink}>
                <ExitToAppIcon className={classNames(classes.itemIcon)} />
                <ListItemText
                  className={classes.whiteFont}
                  primary="ออกจากระบบ"
                />
              </ListItem>
            </div>
          </div>

          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open={props.open}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}

          {brand2}
          <div className={classes.sidebarWrapper}>
            {role()}
            <div
              className={activePro}
              onClick={() => {
                dispatch(loginActions.logout({ ...props }));
              }}
            >
              <ListItem button className={classes.itemLink}>
                <ExitToAppIcon className={classNames(classes.itemIcon)} />
                <ListItemText
                  className={classes.whiteFont}
                  primary="ออกจากระบบ"
                />
              </ListItem>
            </div>
          </div>

          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}
