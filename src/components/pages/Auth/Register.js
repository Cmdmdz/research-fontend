import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { isEmail } from "validator";
import { useDispatch } from "react-redux";
import * as loginActions from "actions/login.action";
import { httpClient } from "utils/HttpClient";
import { server } from "Constants";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Alert from "@material-ui/lab/Alert";
import imageNorth from "image/Northbkk.png";
import * as Yup from "yup";

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
    width: "",
  },

  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
    text: {
      width: "80ch",
      margin: theme.spacing(1),
    },
  },
}));

const Schema = Yup.object().shape({
  password: Yup.string().required("This field is required"),
  username: Yup.string().required("This field is required"),
  firstname: Yup.string().required("This field is required"),
  lastname: Yup.string().required("This field is required"),
  faculty: Yup.string().required("This field is required"),
  branch: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
  changepassword: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "ยืนยันรหัสผ่านไม่ถูกต้อง"
      ),
    })
    .required("This field is required"),
});

export default function SignIn(props) {
  const classes = useStyles();
  const [successful, setSuccessful] = React.useState(false);

  const [message, setMessage] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const dispatch = useDispatch();

  function showForm({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    errors,
    isValid,
    dirty,
  }) {
    return (
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        {!successful && (
          <div>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="ชื่อ"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                value={values.firstname}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="นามสกุล"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                value={values.lastname}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="faculty"
                label="คณะ"
                name="faculty"
                autoComplete="faculty"
                autoFocus
                value={values.faculty}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="branch"
                label="สาขา"
                name="branch"
                autoComplete="branch"
                autoFocus
                value={values.branch}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="ชื่อผู้ใช้"
                name="username"
                autoComplete="username"
                autoFocus
                value={values.username}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="อีเมล"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
              />
            </div>

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
              value={values.password}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="changepassword"
              label="ยืนยันรหัสผ่าน"
              type="password"
              autoComplete="current-password"
              value={values.changepassword}
              onChange={handleChange}
            />
            <div>
              <TextField
                id="address"
                label="ที่อยู่"
                fullWidth
                name="address"
                multiline
                rows={4}
                variant="outlined"
                value={values.address}
                onChange={handleChange}
              />
            </div>
            <span class="error" style={{ color: "red" }}>
              {errors.changepassword}
            </span>
            {message && (
              <div>
                <Alert severity="error">{message}</Alert>
              </div>
            )}
            <center>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!(isValid && dirty)}
              >
                ยืนยัน
              </Button>
            </center>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"ยกเลิก"}
                </Link>
              </Grid>
            </Grid>
          </div>
        )}
      </form>
    );
  }

  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
        <img src={imageNorth} className={classes.img} />

        <br></br>
        <Typography component="h1" variant="h5">
          ลงทะเบียนนักวิชาการ
        </Typography>
        {/* ------- showFrom */}
        <Formik
          validationSchema={Schema}
          initialValues={{
            username: "",
            password: "",
            changepassword: "",
            email: "",
            firstname: "",
            lastname: "",
            faculty: "",
            branch: "",
            address: "",

          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setMessage("");
            setSuccessful(false);
            httpClient.post(server.REGISTER_URL, values).then(
              (response) => {
                setShowDialog(true);
                setSuccessful(true);
                dispatch(loginActions.setSuccess());
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setSubmitting(false);
                setMessage(resMessage);
                setSuccessful(false);
                dispatch(loginActions.hasError("wrong failed"));
              }
            );
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </div>

      <Dialog
        open={showDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ลงทะเบียนสำเร็จ
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.history.push("/login");
            }}
            color="primary"
          >
            เข้าสู่ระบบ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
