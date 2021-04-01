import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ResAction from "actions/research.action";
import { forwardRef } from "react";
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
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MaterialTable, { MTableToolbar } from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {  withStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";
import ShareIcon from '@material-ui/icons/Share';

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



export default function Research(props) {
  const dispatch = useDispatch();
  const researchReducer = useSelector(({ researchReducer }) => researchReducer);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);
 
  React.useEffect(() => {
    dispatch(ResAction.getResearch());
  }, []);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "ชื่องานวิจัย",
      cellStyle: { minWidth: 20 },
      render: (item) => (
        <Typography variant="body1">{item.research}</Typography>
      ),
    },
    {
      title: "ชื่ออังกฤษ",
      cellStyle: { minWidth: 100 },
      render: (item) => <Typography variant="body1">{item.eng}</Typography>,
    },
    {
      title: "ปีการศึกษา",

      render: (item) => <Typography variant="body1">{item.start_date}</Typography>,
    },
    {
      title: "ค่าถ่วงนํ้าหนัก",

      render: (item) => <Typography variant="body1">{item.share_point}</Typography>,
    },
    {
      title: "สถานะ",
      cellStyle: { minWidth: 100 },
      render: (item) => (
        <BorderLinearProgress variant="determinate" value={item.point} />
      ),
    },
    {
      title: "วันที่สร้าง",
      render: (item) => <Typography>{item.create_date}</Typography>,
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
          คุณต้องการยืนยันการลบงานวิจัยที่ : {selectedItem.id} หรือไม่
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ marginLeft: 20 }}>{selectedItem.research}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(ResAction.deleteResearch(selectedItem.id));
              handleClose();
            }}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ) : (
      <div></div>
    );
  };


  const actions = [
    {
      icon: () => <VisibilityIcon style={{ color: "#91979c" }} />,
      tooltip: "แสดง",
      onClick: (event, rowData) => {
        props.history.push("/admin/view/" + rowData.id);
      },
    },
    {
      icon: () => <DeleteOutline color="secondary" />,
      tooltip: "ลบ",
      onClick: (event, rowData) => {
        handleClickOpen(rowData);
      },
    },
    {
      icon: "add",
      tooltip: "สร้างงานวิจัย",
      isFreeAction: true,
      onClick: (event) => {
        props.history.push("/admin/create");
      },
    },
    {
      icon: () => <PublishIcon />,
      tooltip: "อัพโหลดไฟล์",

      onClick: (event, rowData) => {
        props.history.push("/admin/upload/" + rowData.id);
      },
    },

  ];

  return researchReducer.result ? (
    <div>
      <MaterialTable
        columns={columns}
        icons={tableIcons}
        actions={actions}
        data={researchReducer.result ? researchReducer.result : []}
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
      {showDeletionConfirmDlg()}
      
    </div>
  ) : (
    []
  );
}
