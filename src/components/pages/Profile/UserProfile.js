import { Avatar, Button as MuiButton, Typography } from "@material-ui/core";

import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import * as ResAction from "actions/research.action";
import * as loginAction from "actions/login.action";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";

const CenteredContent = styled.div`
  text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: 30,
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgressWithLabel);

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Profile = (props) => {
  const classes = useStyles();
  const [image, _setImage] = useState(null);
  const [selectData, setselectData] = useState(null);
  const inputFileRef = createRef(null);
  const researchReducer = useSelector(({ researchReducer }) => researchReducer);
  const currentUser = loginAction.getCurrentUser();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(ResAction.getResearch());
    getAllAccountByCurrent()
  }, []);

  const getAllAccountByCurrent = () => {
    loginAction.getAllAccountById(currentUser.id).then((res) => {
      setselectData(res.data)
    })
  }

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  const getCurrentUser = () => {
    if (currentUser.roles.includes("ROLE_USER")) {
      return (
        <Typography variant="h6" display="block" gutterBottom>
          นักวิชาการ
        </Typography>
      );
    } else {
      return (
        <Typography variant="h6" display="block" gutterBottom>
          ผู้ดูแลระบบ
        </Typography>
      );
    }
  };

  return selectData ? (
    <CenteredContent>
      <label htmlFor="avatar-image-upload">
        <IconButton
          onClick={handleClick}
          variant="contained"
          color="primary"
          component="span"
          mb={2}
        >
          <Avatar
            src="/images/example.jpg"
            style={{
              margin: "10px",
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
      </label>
      <Typography variant="h5" gutterBottom></Typography>
      <br></br>
      <Typography variant="h5" gutterBottom>
        {getCurrentUser()}
      </Typography>
      <br></br>
      <Typography variant="h6" display="block" gutterBottom>
        คณะ {selectData.firstname} สาขา {selectData.lastname}
      </Typography>
      <Typography variant="h6" display="block" gutterBottom>
        คณะ {selectData.faculty} สาขา {selectData.branch}
      </Typography>
      <Typography variant="h6" display="block" gutterBottom>
        ที่อยู่ {selectData.address}
      </Typography>
      <Typography variant="h6" display="block" gutterBottom>
        อีเมล {selectData.email}
      </Typography>
      <br></br>
      {researchReducer.result ? (
        <Grid container spacing={4}>
          {researchReducer.result.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" display="block" gutterBottom>
                    ชื่อ {card.research}
                  </Typography>

                  <Typography variant="h6" display="block" gutterBottom>
                    ค่าถ่วงนํ้าหนัก {card.weight}
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={card.point}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      props.history.push("/admin/view/" + card.id);
                    }}
                  >
                    แสดงข้อมูล
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        []
      )}
    </CenteredContent>
  ): null;
};

export default Profile;
