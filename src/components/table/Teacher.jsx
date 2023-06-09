import "./teacher.scss"
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { getTeachersAction } from "../../redux/actions/teacherListAction";
import { addTeacherAction } from "../../redux/actions/addTeacherAction";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon  from "@mui/icons-material/Close";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../Assets/images/logo.jpeg";

const Teacher = () => {
  const [open, setOpen] = React.useState(false);

  const dispatch=useDispatch();
  const teachersList=useSelector((state)=>state.teachersList)

  const [teachersListDetails,setTeachersListDetails]=React.useState([])
  const addTeacher=useSelector((state)=>state.addTeacher);
  const [telephone,setTelePhone]=React.useState("")
  const [fullName,setFullName]=React.useState("")

  const [telephoneerror,setTelePhoneerror]=React.useState("")
  const [fullNameerror,setFullNameerror]=React.useState("")
  const [openError, setOpenError] = React.useState(true);
  const [openSuccess, setOpenSuccess] = React.useState(true);
  const [successMessage,setSuccessMessage]=React.useState("");
  const todaydate=new Date().toISOString().slice(0,10);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseMessage=()=>{

setOpenError(false)
setOpenSuccess(false)
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
if(telephone==""){
  setTelePhoneerror("Phone number is required")
}
else if(fullName==""){
  setFullNameerror("Full Name is required");
}
else{
 setTelePhoneerror("")
 setFullNameerror("")
 await dispatch(addTeacherAction(telephone,fullName))
}
  }

 
  React.useEffect(()=>{
   async function fetchData(){
    await dispatch(getTeachersAction())
   }
   fetchData()
  },[])

  React.useEffect(()=>{
    async function fetchData(){
  if(!teachersList.loading){
    if(teachersList.details.length>0){
      setTeachersListDetails(teachersList.details)

    }
  }
    }
    fetchData()
   },[teachersList.details])

   React.useEffect(()=>{
    async function fetchData(){
  if(!addTeacher.loading){
    if(addTeacher.details.length!==0){
      setSuccessMessage(addTeacher.details.message)
      setOpenSuccess(true)
      setTelePhone("")
      setFullName("")
      await dispatch(getTeachersAction())
    }
  }
    }
    fetchData()
   },[addTeacher.details])

//report
const generateListOfAllTeacher = () => {
  const doc = new jsPDF();
  doc.addImage(logo, "JPEG", 20, 5, 40, 40);
  doc.setFont("Helvertica", "normal");
  doc.text("Rwanda Basic Education Board", 20, 50);
  // doc.text(`Class Name: N3`, 20, 55);
  doc.text("Email: info@gsa.rw", 20, 60);
  doc.setFont("Helvertica", "normal");
  doc.text(`Date ${todaydate}`, 140, 65);
  doc.setFont("Helvertica", "bold");
  doc.text("List of Teachers ", 70, 75);
  const tableColumn = [
    "Full Name",
    "Telephone",
   
   
  ];
  const tableRows = [];

  teachersListDetails.map((t) => {
    const teacherData = [
      t.fullName,
      t.telephone,
    

    ];
   
      tableRows.push(teacherData);

  });

  doc.autoTable(tableColumn, tableRows, {
    startY: 80,
    theme: "striped",
    margin: 10,
    styles: {
      font: "courier",
      fontSize: 12,
      overflow: "linebreak",
      cellPadding: 3,
      halign: "center",
    },
    head: [tableColumn],
    body: [tableRows],
  });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.save(`report_${dateStr}.pdf`);
};

  return (
    <div className='teacher'>
    <Sidebar/>
    <div className="navTeacher">
    <Navbar/>
    <div className="dialogbox">
    <Button variant="outlined" onClick={handleClickOpen}>
    Add Teacher
  </Button>
  <Button variant="outlined" onClick={generateListOfAllTeacher}>Generate Report</Button>
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Tearcher Registration Form</DialogTitle>
    {
            !addTeacher.error ? null : (
                <Collapse in={openError}>
                    <Alert severity="error"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleCloseMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {/* {errorMessage==="Provided NID is not registered to the head of the household"?`${t("cbhi:providedNIDisnotregisteredtotheheadofthehousehold")}`:errorMessage} */}
                        {addTeacher.error}
                         </Alert>
                </Collapse>
            )
        }
    {
            !successMessage ? null : (
                <Collapse in={openSuccess}>
                    <Alert severity="success"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleCloseMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {/* {errorMessage==="Provided NID is not registered to the head of the household"?`${t("cbhi:providedNIDisnotregisteredtotheheadofthehousehold")}`:errorMessage} */}
                        {successMessage}
                         </Alert>
                </Collapse>
            )
        }
    <DialogContent>
      <TextField
      name="telephone"
      value={telephone}
      onChange={(e)=>setTelePhone(e.target.value)}
      helperText={telephoneerror? telephoneerror : ""}
      error={telephoneerror}
      autoFocus
      margin="dense"
      id="telephone"
      label="Telephone"
      type="text"
      fullWidth
      variant="standard"
    />
    <TextField
    name="fullName"
    value={fullName}
    onChange={(e)=>setFullName(e.target.value)}
    helperText={fullNameerror? fullNameerror: ""}
    error={fullNameerror}
    autoFocus
    margin="dense"
    id="fullName"
    label="Full Name"
    type="text"
    fullWidth
    variant="standard"
  />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    {
      addTeacher.loading?"Loading":
      <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
    }
   
  </DialogActions>
</Dialog>
<TableContainer component={Paper} className="teacherTable">
<Table sx={{ minWidth: 200 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>Teacher Name</TableCell>
      <TableCell align="center">Phone Number</TableCell>
      <TableCell align="center">Create At</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {teachersListDetails.map((row) => (
      <TableRow
        key={row._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.fullName}
        </TableCell>
        <TableCell align="center">{row.telephone}</TableCell>
        <TableCell align="center">{moment(row.createdAt).format('lll')}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
  </div>
    </div>
    </div>
  )
}

export default Teacher