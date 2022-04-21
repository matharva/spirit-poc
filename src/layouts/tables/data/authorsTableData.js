/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data(handleOpen, data) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );


  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "Age", accessor: "function", align: "left" },
      { Header: "Care taker", accessor: "status", align: "center" },
      { Header: "Medicine", accessor: "employed", align: "center" },
      { Header: "Diet", accessor: "action", align: "center" },
    ],

    rows: data.map(patient=>{
      return {
        author: <Author image={team2} name={patient?.Name} />,
        function: <Job title={patient?.Age} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={patient.Caretaker || "Param Patil"}
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={()=>{
              console.log('Clicking the users id: ', patient?.Id);
                handleOpen(patient?.Id);
              }}
            styles={{
              cursor:"pointer"
            }}
          >
            Edit
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      }
    }),

    // rows: [
    //   {
    //     author: <Author image={team2} name="John Michael" />,
    //     function: <Job title="40" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge
    //           badgeContent="online"
    //           color="success"
    //           variant="gradient"
    //           size="sm"
    //           // onClick={()=>{
    //           //   handleOpen(1);
    //           // }}
    //         />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography
    //         component="a"
    //         variant="caption"
    //         color="text"
    //         fontWeight="medium"
    //         onClick={()=>{
    //             handleOpen(1);
    //           }}
    //       >
    //         Edit
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     author: <Author image={team2} name="John Michael" />,
    //     function: <Job title="40" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge
    //           badgeContent="online"
    //           color="success"
    //           variant="gradient"
    //           size="sm"
    //           onClick={()=>{
    //             handleOpen(1);
    //           }}
    //         />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography
    //         component="a"
    //         variant="caption"
    //         color="text"
    //         fontWeight="medium"
    //         onClick={handleOpen}
    //       >
    //         Edit
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },{
    //     author: <Author image={team2} name="John Michael" />,
    //     function: <Job title="40" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge
    //           badgeContent="online"
    //           color="success"
    //           variant="gradient"
    //           size="sm"
    //           onClick={()=>{
    //             handleOpen(1);
    //           }}
    //         />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography
    //         component="a"
    //         variant="caption"
    //         color="text"
    //         fontWeight="medium"
    //         onClick={handleOpen}
    //       >
    //         Edit
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },{
    //     author: <Author image={team2} name="John Michael" />,
    //     function: <Job title="40" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge
    //           badgeContent="online"
    //           color="success"
    //           variant="gradient"
    //           size="sm"
    //           onClick={()=>{
    //             handleOpen(1);
    //           }}
    //         />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography
    //         component="a"
    //         variant="caption"
    //         color="text"
    //         fontWeight="medium"
    //         onClick={handleOpen}
    //       >
    //         Edit
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },{
    //     author: <Author image={team2} name="John Michael" />,
    //     function: <Job title="40" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge
    //           badgeContent="online"
    //           color="success"
    //           variant="gradient"
    //           size="sm"
    //           onClick={()=>{
    //             handleOpen(1);
    //           }}
    //         />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography
    //         component="a"
    //         variant="caption"
    //         color="text"
    //         fontWeight="medium"
    //         onClick={handleOpen}
    //       >
    //         Edit
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    // ],
  };
}
