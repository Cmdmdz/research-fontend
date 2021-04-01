import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import * as loginAction from "actions/login.action";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    marginTop: 100,
  },
  field: {
    marginTop: 16,
    width: "30%",
    margin: theme.spacing(1),
  },
  card: {
    padding: 20,
  },
  select: {
    marginTop: 16,
    width: "30%",
  },
}));

export default function Profileedit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const currentUser = loginAction.getCurrentUser();

  const showForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form>
        {message ? (
          <div>
            <Alert severity="success">{message}</Alert>
          </div>
        ) : null}
        <Card className={classes.card}>
          <CardContent>
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="firstname"
              type="text"
              label="ชื่อ"
            />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="lastname"
              type="text"
              label="นามสกุล"
            />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="email"
              type="text"
              disabled
              label="email"
            />
            <br />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="address"
              type="text"
              label="ที่อยู่"
            />

            <Field
              className={classes.field}
              component={TextField}
              name="faculty"
              type="text"
              label="คณะ"
            />
            <Field
              className={classes.field}
              component={TextField}
              name="branch"
              type="text"
              label="สาขา"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              แก้ไข
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  return (
    <Container>
      <div>
        <Formik
          validate={(values) => {
            let errors = {};
            if (!values.firstname) errors.firstname = "กรุณาใส่ชื่อ";
            if (!values.lastname) errors.lastname = "กรุณาใส่นามสกุล";
            if (!values.address) errors.address = "กรุณาระบุที่อยู่";
            if (!values.branch) errors.branch = "กรุณาระบุสาขา";
            if (!values.faculty) errors.faculty = "กรุณาระบุคณะ";

            return errors;
          }}
          initialValues={{
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            address: currentUser.address,
            branch: currentUser.branch,
            faculty: currentUser.faculty,
            email: currentUser.email
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(loginAction.updateProfile(values));
            setMessage("แก้ไขข้อมูลสำเร็จ");
            setSubmitting(false);
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </div>
    </Container>
  );
}
