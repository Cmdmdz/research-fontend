import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PDFViewer from "pdf-viewer-reactjs";
import { useDispatch, useSelector } from "react-redux";
import * as ResAction from "actions/research.action";
import Link from "@material-ui/core/Link";
import * as loginAction from "actions/login.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["บทที่ 1", "บทที่ 2", "บทที่ 3", "บทที่ 4", "บทที่ 5", "เผยแพร่"];
}

export default function ResearchView(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const researchReducer = useSelector(({ researchReducer }) => researchReducer);
  const steps = getSteps();
  const dispatch = useDispatch();
  const [selectitem, setSelectitem] = React.useState(null);
  const [chapterFiles, setChapterFiles] = React.useState(null);
  const [chapterFiles2, setChapterFiles2] = React.useState(null);
  const [chapterFiles3, setChapterFiles3] = React.useState(null);
  const [chapterFiles4, setChapterFiles4] = React.useState(null);
  const [chapterFiles5, setChapterFiles5] = React.useState(null);
  const [chapterFiles6, setChapterFiles6] = React.useState(null);
  const [chapterFiles7, setChapterFiles7] = React.useState(null);

  const currentUser = loginAction.getCurrentUser();

  let id = props.match.params.id;

  React.useEffect(() => {
    doGetFileByResearchAndChapter(id);
  }, []);

  const doGetFileByResearchAndChapter = (id) => {
    ResAction.doGetFileByResearchAndChapter(id, "1").then((response) => {
      if (response.data[0]) {
        ResAction.getUrlPdf(response.data[0].files).then((res) => {
          setChapterFiles(res.data);
        });
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "2").then((response) => {
      if (response.data[0]) {
        ResAction.getUrlPdf(response.data[0].files).then((res) => {
          setChapterFiles2(res.data);
        });
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "3").then((response) => {
      if (response.data[0]) {
        ResAction.getUrlPdf(response.data[0].files).then((res) => {
          setChapterFiles3(res.data);
        });
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "4").then((response) => {
      if (response.data[0]) {
        ResAction.getUrlPdf(response.data[0].files).then((res) => {
          setChapterFiles4(res.data);
        });
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "5").then((response) => {
      if (response.data[0]) {
        ResAction.getUrlPdf(response.data[0].files).then((res) => {
          setChapterFiles5(res.data);
        });
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "6").then((response) => {
      if (response.data[0]) {
        ResAction.getUrlPdf(response.data[0].files).then((res) => {
          console.log("url: ", res.data);

          setChapterFiles6(res.data);
        });
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "7").then((response) => {
      if (response.data[0]) {
        ResAction.getUrlPdf(response.data[0].files).then((res) => {
          console.log("url: ", res.data);

          setChapterFiles7(res.data);
        });
      }
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getCurrentUser = (step) => {
    if (currentUser.roles[0] == "ROLE_USER") {
      return <div>{getStepContent(step)}</div>;
    } else {
      return <div>{getStepContent2(step)}</div>;
    }
  };

  function getStepContent2(step) {
    switch (step) {
      case 0:
        return chapterFiles ? (
          <PDFViewer
            document={{
              url: chapterFiles,
            }}
          />
        ) : (
          <Typography>ไม่พบไฟล์บทที่ 1</Typography>
        );
      case 1:
        return chapterFiles2 ? (
          <PDFViewer
            document={{
              url: chapterFiles2,
            }}
          />
        ) : (
          <Typography>ไม่พบไฟล์บทที่ 2</Typography>
        );
      case 2:
        return chapterFiles3 ? (
          <PDFViewer
            document={{
              url: chapterFiles3,
            }}
          />
        ) : (
          <Typography>ไม่พบไฟล์บทที่ 3</Typography>
        );
      case 3:
        return chapterFiles4 ? (
          <PDFViewer
            document={{
              url: chapterFiles4,
            }}
          />
        ) : (
          <Typography>ไม่พบไฟล์บทที่ 4</Typography>
        );
      case 4:
        return chapterFiles5 ? (
          <PDFViewer
            document={{
              url: chapterFiles5,
            }}
          />
        ) : (
          <Typography>ไม่พบไฟล์บทที่ 5</Typography>
        );
      case 5:
        return chapterFiles5 ? (
          <PDFViewer
            document={{
              url: chapterFiles5,
            }}
          />
        ) : (
          "test"
        );
      default:
        return "Unknown step";
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return chapterFiles ? (
          <PDFViewer
            document={{
              url: chapterFiles,
            }}
          />
        ) : (
          <Link href={"/admin/upload/" + id} variant="body2">
            {"กรุณาอัพโหลดไฟล์บทที่ 1 ก่อน !"}
          </Link>
        );
      case 1:
        return chapterFiles2 ? (
          <PDFViewer
            document={{
              url: chapterFiles2,
            }}
          />
        ) : (
          <Link href={"/admin/upload/" + id} variant="body2">
            {"กรุณาอัพโหลดไฟล์บทที่ 2 ก่อน !"}
          </Link>
        );
      case 2:
        return chapterFiles3 ? (
          <PDFViewer
            document={{
              url: chapterFiles3,
            }}
          />
        ) : (
          <Link href={"/admin/upload/" + id} variant="body2">
            {"กรุณาอัพโหลดไฟล์บทที่ 3 ก่อน !"}
          </Link>
        );
      case 3:
        return chapterFiles4 ? (
          <PDFViewer
            document={{
              url: chapterFiles4,
            }}
          />
        ) : (
          <Link href={"/admin/upload/" + id} variant="body2">
            {"กรุณาอัพโหลดไฟล์บทที่ 4 ก่อน !"}
          </Link>
        );
      case 4:
        return chapterFiles5 ? (
          <PDFViewer
            document={{
              url: chapterFiles5,
            }}
          />
        ) : (
          <Link href={"/admin/upload/" + id} variant="body2">
            {"กรุณาอัพโหลดไฟล์บทที่ 5 ก่อน !"}
          </Link>
        );
      case 5:
        return chapterFiles6 ? (
          <PDFViewer
            document={{
              url: chapterFiles6,
            }}
          />
        ) : (
          <Link href={"/admin/upload/" + id} variant="body2">
            {"กรุณาอัพโหลดไฟล์เผยแพร่ !"}
          </Link>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <React.StrictMode>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>

              <StepContent>
                {getCurrentUser(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      กลับ
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "สรุป" : "ถัดไป"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            {chapterFiles7 ? (
              <PDFViewer
                document={{
                  url: chapterFiles7,
                }}
              />
            ) : (
              <Link href={"/admin/upload/" + id} variant="body2">
                {"กรุณาอัพโหลดไฟล์เล่มทั้งหมด !"}
              </Link>
            )}
            <br></br>
            <Button onClick={handleReset} className={classes.button}>
              ย้อนกลับ
            </Button>
          </Paper>
        )}
      </React.StrictMode>
    </div>
  );
}
