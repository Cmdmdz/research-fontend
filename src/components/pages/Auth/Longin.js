import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "actions/login.action";
import imageNorth from "image/Northbkk.png"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
 
}));
export default function SignIn(props) {
  const classes = useStyles();

  const [account, setAccount] = React.useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       
        <img src={imageNorth} className={classes.img} />

      <br></br>
        <Typography component="h1" variant="h5">
          ระบบติดตามงานวิจัย
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginActions.login({ ...account, ...props }));
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="ชื่อผู้ใช้งาน"
            name="Username"
            autoComplete="username"
            autoFocus
            value={account.username}
            onChange={(e) => {
              setAccount({
                ...account,
                username: e.target.value,
              });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="รหัสผ่าน"
            type="password"
            id="password"
            autoComplete="current-password"
            value={account.password}
            onChange={(e) => {
              setAccount({
                ...account,
                password: e.target.value,
              });
            }}
          />
          {loginReducer.error && (
            <div>
              <Alert severity="error">{loginReducer.result}</Alert>
            </div>
          )}
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            เข้าสู่ระบบงานวิจัย
          </Button>

          <Grid container>
            <Grid item xs>
            <Link href="/registerContact" variant="body2">
                {"ลงทะเบียนฝ่ายติดตาม"}
              </Link>
            </Grid>
          
            <Grid item>
              <Link href="/register" variant="body2">
                {"ลงทะเบียนนักวิชาการ"}
              </Link>
            </Grid>

          </Grid>
        </form>
      </div>
    </Container>
  );
}
