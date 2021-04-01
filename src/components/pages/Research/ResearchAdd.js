import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Select, TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as ActionResearch from "actions/research.action";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    marginTop: 100,
  },
  field: {
    marginTop: 16,
    width: "80%",
  },
  card: {
    padding: 20,
  },
  select: {
    marginTop: 16,
    width: "30%",
  },
}));

export default function ResearchAdd(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form >
        <Card className={classes.card}>
          <CardContent>
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="research"
              type="text"
              label="ชื่องานวิจัย"
            />
            <br />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="eng"
              type="text"
              label="ชื่อภาษาอังกฤษ"
            />
     
            <Field
              className={classes.field}
              component={TextField}
              name="start_date"
              type="number"
              label="ปีการศึกษา"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              สร้าง
            </Button>
            <Button component={Link} to="/admin/" color="default">
              ยกเลิก
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
            if (!values.eng) errors.eng = "กรุณาใส่ชื่องานวิจัยภาษาอังกฤษ";
            if (!values.research) errors.research = "กรุณาใส่ชื่องานวิจัย";
            if (!values.start_date) errors.start_date = "กรุณาระบุปีการศึก";
            return errors;
          }}
          initialValues={{ research: "", eng: "", start_date: "2021" }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(ActionResearch.addResearch(values, props.history));
            setSubmitting(false);
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </div>
    </Container>
  );
}
