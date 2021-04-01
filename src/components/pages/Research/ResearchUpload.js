import React from "react";

import PublishIcon from "@material-ui/icons/Publish";
import { makeStyles } from "@material-ui/core/styles";
import * as ResAction from "actions/research.action";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { forwardRef } from "react";
import { Typography } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import NativeSelect from "@material-ui/core/NativeSelect";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 0,
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ResearchUpload(props) {
  let id = props.match.params.id;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectitem, setSelectitem] = React.useState(null);
  const [chapterFiles, setChapterFiles] = React.useState(true);
  const [chapterFiles2, setChapterFiles2] = React.useState(true);
  const [chapterFiles3, setChapterFiles3] = React.useState(true);
  const [chapterFiles4, setChapterFiles4] = React.useState(true);
  const [chapterFiles5, setChapterFiles5] = React.useState(true);
  const [chapterFiles6, setChapterFiles6] = React.useState(true);
  const [chapterFiles7, setChapterFiles7] = React.useState(true);
  const [selectedChapter, setSelectedChapter] = React.useState(false);
  const [selectedChapterResearch, setSelectedChapterResearch] = React.useState(
    false
  );

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState(undefined);
  const [currentFile, setCurrentFile] = React.useState(undefined);
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [message2, setMessage2] = React.useState("");

  const [state, setState] = React.useState({
    chapter: "",
  });

  const [researches, setResearches] = React.useState({
    research: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    if (value == 0) {
      setSelectedChapter(false);
    } else {
      setSelectedChapter(true);
    }

    setState(value);
  };

  const handleChangeResearch = (event) => {
    const value = { share_point: event.target.value };
    if (value == 0) {
      setSelectedChapterResearch(false);
    } else {
      setSelectedChapterResearch(true);
    }

    setResearches(value);
  };

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getFileByResearch(id);

    doGetFileByResearchAndChapter(id);
  }, []);

  const getFileByResearch = (id) => {
    ResAction.getFileByResearch(id).then((response) => {
      console.log("data: ", response.data);
      setSelectitem(response.data);
    });
  };

  const doGetFileByResearchAndChapter = (id) => {
    ResAction.doGetFileByResearchAndChapter(id, "1").then((response) => {
      if (response.data[0]) {
        setChapterFiles(true);
      } else {
        setChapterFiles(false);
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "2").then((response) => {
      if (response.data[0]) {
        setChapterFiles2(true);
      } else {
        setChapterFiles2(false);
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "3").then((response) => {
      if (response.data[0]) {
        setChapterFiles3(true);
      } else {
        setChapterFiles3(false);
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "4").then((response) => {
      if (response.data[0]) {
        setChapterFiles4(true);
      } else {
        setChapterFiles4(false);
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "5").then((response) => {
      if (response.data[0]) {
        setChapterFiles5(true);
      } else {
        setChapterFiles5(false);
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "6").then((response) => {
      if (response.data[0]) {
        setChapterFiles6(true);
      } else {
        setChapterFiles6(false);
      }
    });

    ResAction.doGetFileByResearchAndChapter(id, "7").then((response) => {
      if (response.data[0]) {
        setChapterFiles7(true);
      } else {
        setChapterFiles7(false);
      }
    });
  };

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };
  const columns = [
    {
      title: "บทที่",
      cellStyle: { minWidth: 20 },
      render: (item) => {
        if (item.chapter == "6") {
          return <Typography variant="body1">เผยแพรงานวิจัย</Typography>;
        } else if (item.chapter == "7") {
          return <Typography variant="body1">ส่งเล่ม</Typography>;
        } else {
          return <Typography variant="body1">{item.chapter}</Typography>;
        }
      },
    },
    {
      title: "ชื่อไฟล์",
      cellStyle: { minWidth: 100 },
      render: (item) => <Typography variant="body1">{item.files}</Typography>,
    },
    {
      title: "วันที่อัพโหลด",
      render: (item) => (
        <Typography variant="body1">{item.create_date}</Typography>
      ),
    },
  ];

  const showDeletionConfirmDlg = () => {
    return selectedItem ? (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          คุณต้องการยืนยันการลบไฟล์บทที่ : {selectedItem.chapter} หรือไม่
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ marginLeft: 20 }}>{selectedItem.files}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button
            onClick={() => {
              ResAction.deleteFile(selectedItem.id, selectedItem.chapter)
                .then((response) => {
                  ResAction.getFilePoint(id);
                  getFileByResearch(id);
                  doGetFileByResearchAndChapter(id);
                  dispatch(ResAction.updateWeight(id, researches));
                  setMessage2("ลบไฟล์สำเร็จ");
                  handleClose();
                })
                .catch((e) => {
                  setProgress(0);
                  setMessage(e.message);
                  setCurrentFile(undefined);
                });
            }}
            color="secondary"
            autoFocus
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    ) : (
      <div></div>
    );
  };

  const actions = [
    {
      icon: () => <DeleteOutline color="secondary" />,
      tooltip: "ลบ",
      onClick: (event, rowData) => {
        handleClickOpen(rowData);
      },
    },
  ];

  return selectitem ? (
    <div className={classes.root}>
      {message ? (
        <div>
          <Alert severity="error"> {message}</Alert>
        </div>
      ) : null}
      {message2 ? (
        <div>
          <Alert severity="success">{message2}</Alert>
        </div>
      ) : null}
      <br></br>
      <MaterialTable
        columns={columns}
        icons={tableIcons}
        actions={actions}
        data={selectitem ? selectitem : []}
        options={{ actionsColumnIndex: -1, search: false, showTitle: false }}
        localization={{
          header: {
            actions: "การจัดการ",
          },
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
      />

      <br></br>
      <Typography variant="caption" display="block" gutterBottom>
        **หมายเหตุ แต่ละบทอัพได้ 1 ไฟล์เท่านั้น
      </Typography>

      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state.chapter}
          onChange={handleChange}
          inputProps={{
            name: "chapter",
            id: "age-native-label-placeholder",
          }}
        >
          **
          <option value={0}>เลือกบท</option>
          <option disabled={chapterFiles} value={1}>
            บทที่ 1
          </option>
          <option disabled={chapterFiles2} value={2}>
            บทที่ 2
          </option>
          <option disabled={chapterFiles3} value={3}>
            บทที่ 3
          </option>
          <option disabled={chapterFiles4} value={4}>
            บทที่ 4
          </option>
          <option disabled={chapterFiles5} value={5}>
            บทที่ 5
          </option>
          {chapterFiles5 == true ? (
            <option disabled={chapterFiles7} value={7}>
              ส่งเล่ม
            </option>
          ) : (
            <option disabled={true} value={7}>
              ส่งเล่ม
            </option>
          )}
          {chapterFiles7 == true ? (
            <option disabled={chapterFiles6} value={6}>
              เผยแพรงานวิจัย
            </option>
          ) : (
            <option disabled={true} value={6}>
              เผยแพรงานวิจัย
            </option>
          )}
        </NativeSelect>
      </FormControl>
      {state == 6 ? (
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={researches.research}
            onChange={handleChangeResearch}
            inputProps={{
              name: "research",
              id: "age-native-label-placeholder",
            }}
          >
            **
            <option value={0}>เผยแพรงานวิจัย</option>
            <option value={0.2}>
              บทความวิจัยหรือบทความวิชาการฉบับสมบูรณ์ที่ตีพิมพ์ในรายงาน
              สืบเนื่องจากการประชุมวิชาการระดับชาติ 0.2
            </option>
            <option value={0.4}>ผลงานที่ได้รับการจดอนุสิทธิบัตร 0.4</option>
            <option value={0.6}>
              บทความวิจัยหรือบทความวิชาการฉบับสมบูรณ์ที่ตีพิมพ์ในวารสาร
              วิชาการที่ปรากฏในฐานข้อมูล TCI กลุ่มที่ 2 0.6
            </option>
            <option value={1.0}>ผลงานได้รับการจดสิทธิบัตร 1.0</option>
            <option value={1.0}>
              ผลงานวิชาการรับใช้สังคมที่ได้รับการประเมินผ่านเกณฑ์
              การขอตำแหน่งทางวิชาการแล้ว 1.0
            </option>
            <option value={1.0}>
              ตำราหรือหนังสือหรืองานแปลที่ได้รับการประเมินผ่านเกณฑ์การขอ
              ตำแหน่งทางวิชาการแล้ว 1.0
            </option>
          </NativeSelect>
        </FormControl>
      ) : null}
      <FormControl className={classes.formControl}>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            onChange={selectFile}
            accept=".pdf"
          />
          {state == 6 ? (
            <Button
              disabled={!selectedChapterResearch}
              className="btn-choose"
              variant="outlined"
              component="span"
            >
              เลือกไฟล์ pdf
            </Button>
          ) : (
            <Button
              disabled={!selectedChapter}
              className="btn-choose"
              variant="outlined"
              component="span"
            >
              เลือกไฟล์ pdf
            </Button>
          )}
        </label>
      </FormControl>

      <FormControl>
        {progress ? (
          <CircularProgress disableShrink />
        ) : (
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            disabled={!selectedFiles}
            onClick={() => {
              let currentFile = selectedFiles[0];
              setProgress(0);
              setCurrentFile(currentFile);
              ResAction.upload(id, currentFile, state, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
              })
                .then((response) => {
                  ResAction.getFilePoint(id);
                  getFileByResearch(id);
                  setMessage2("อัพโหลดไฟล์สำเร็จ");
                  setMessage(null);
                  setProgress(null);
                  doGetFileByResearchAndChapter(id);
                  dispatch(ResAction.updateWeight(id, researches));
                })
                .catch((e) => {
                  setProgress(0);
                  setMessage(
                    "ไม่สามารถอัพโหลดไฟล์ได้ โปรดตรวจสอบขนาดไฟล์ ไม่เกิน 5MB"
                  );
                  setMessage2(null);
                  setCurrentFile(undefined);
                });

              setSelectedFiles(undefined);
            }}
          >
            อัพโหลดไฟล์
          </Button>
        )}
      </FormControl>

      <Grid>
        <div className="file-name">
          {selectedFiles && selectedFiles.length > 0
            ? selectedFiles[0].name
            : null}
        </div>
      </Grid>
      {showDeletionConfirmDlg()}
    </div>
  ) : null;
}
