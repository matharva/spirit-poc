/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import Icon from "@mui/material/Icon";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import React from "react";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";

//Services
import { eventService } from "../../services/eventServices";

import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from 'react-toastify';

const MedicineInfo = ({ item, setMedicine }) => {
  const { Name = "", Dose = "", id } = item;
  function updateDose(e) {
    setMedicine((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, Dose: e.target.value } : element
      );
    });
  }

  function updateName(e) {
    setMedicine((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, Name: e.target.value } : element
      );
    });
  }

  function deleteMedicine() {
    setMedicine((prev) => {
      return prev
        .map((element) => (element.id === id ? null : element))
        .filter((x) => x !== null);
    });
  }

  return (
    // <>
      <Grid container spacing={6} mb={2} id={id}>
          <Grid item xl={5}>
            <TextField id={`${id}-name`} label="Name" variant="standard" value={Name} onChange={updateName}/>
          </Grid>
          <Grid item xl={5}>
            <TextField id={`${id}-dose`} label="Dose" variant="standard" value={Dose} onChange={updateDose}/>
          </Grid>
          <Grid item xl={1}>
            {/* <MDBox mr={4}> */}
              {/* <MDButton variant="text" color="error"> */}
                <Icon onClick={deleteMedicine}>delete</Icon>
              {/* </MDButton> */}
            {/* </MDBox> */}
          </Grid>
      </Grid>
    // </>
  );
};



function Tables() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    p: 4,
  };
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [open, setOpen] = React.useState(false);
  const [medicine, setMedicine] = useState([]);
  
  const handleClose = () => setOpen(false);

  const [patients, setPatients] = useState([{
    Name:'--',
    Age:'--',
    Caretaker:'--',
    Id:'--'
  }]);

  useEffect(async()=>{
    const postDocData = {
      id: "T3HSB"
    }

    const resData = await eventService.getAllPatient(postDocData);
    console.log('Patients data is: ', resData);

    setPatients(resData);
  }, [])


  const handleOpen = async (id) =>{
    console.log('Id: ', id);
    const postPatientData = {
      id: "3MOIC"
    }
    const patientData = await eventService.getPatient(postPatientData);
    console.log('Patient data is: ', patientData);
    const medicineData = patientData?.Medicine;
    const medicineDataUpdated = medicineData.map((item) => {
      if (item.id) return item;
      item.id = uuid();
      return item;
    });

    console.log('The medicine Updated is: ', medicineDataUpdated);

    setMedicine(medicineDataUpdated)
    setOpen(true);
  }
  
  const { columns, rows } = authorsTableData(handleOpen, patients);

  function addMedicine() {
    const defaultData = { question: "", answer: "", id: uuid() };
    setMedicine((medicine) => {
      return [...medicine, defaultData];
    });
  }

  const updateMedicine = async()=>{
    console.log('The final medicine is: ', medicine );
    const postPatientData = {
      patient_id: "3MOIC",
      medicines: medicine
    }
    const resData = await eventService.updateMedicine(postPatientData);
    console.log('The medicine Updated STATUS is: ', resData);
    toast('Medicine Saved');
    handleClose();
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Patients
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  handleOpen={handleOpen}
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            width={500}
          >
            <Box sx={style}>
              {/* <Flex> */}
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Medicine Info
                </Typography>
                <div>
                  <Button onClick={updateMedicine}>Save</Button>
                  <Button onClick={addMedicine}>Add</Button>
                </div>
              </div>
              {/* </Flex> */}
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
              {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
              {/* </Typography> */}
              {
                medicine.map((medic)=>{
                  // return (
                  //   <Grid container spacing={6} mb={2}>
                  //     <Grid item xl={5}>
                  //       <TextField id={`${medic?.id}-name`} label="Name" variant="standard" value={medic?.Name}/>
                  //     </Grid>
                  //     <Grid item xl={5}>
                  //       <TextField id={`${medic?.id}-dose`} label="Dose" variant="standard" value={medic?.Dose}/>
                  //     </Grid>
                  //     <Grid item xl={1}>
                  //       {/* <MDBox mr={4}> */}
                  //         {/* <MDButton variant="text" color="error"> */}
                  //           <Icon>delete</Icon>
                  //         {/* </MDButton> */}
                  //       {/* </MDBox> */}
                  //     </Grid>
                  // </Grid>
                  // )
                  return <MedicineInfo item={medic} setMedicine={setMedicine}/>
                })
              }

              
              {/* <Grid container spacing={6} mb={2}>
                <Grid item xl={6}>
                  <TextField id="standard-basic" label="Name" variant="standard" />
                </Grid>
                <Grid item xl={6}>
                  <TextField id="standard-basic" label="Dose" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={6} mb={2}>
                <Grid item xl={6}>
                  <TextField id="standard-basic" label="Name" variant="standard" />
                </Grid>
                <Grid item xl={6}>
                  <TextField id="standard-basic" label="Dose" variant="standard" />
                </Grid>
              </Grid> */}
            </Box>
          </Modal>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
