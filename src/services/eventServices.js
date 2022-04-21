import axios from "axios";


async function getStats(postData) {
  try {
    let url = "https://final-hustle.herokuapp.com/get_random_doctor_data"
    console.log(url);
    // let url = "https://oculus-2022.herokuapp.com/addToTeam/";
    let data = await axios.post(url, postData);
    console.log("The post data is: ", data.data);
    return data.data;
  } catch (e) {
    console.log(`ERROR OCCURED IN GET STATS API: ${e}`);
  }
}

async function getDoctor(postData) {
  try {
    let url = "https://final-hustle.herokuapp.com/doctor_data"
    console.log(url);
    // let url = "https://oculus-2022.herokuapp.com/addToTeam/";
    let data = await axios.post(url, postData);
    console.log("The post data is: ", data.data);
    return data.data;
  } catch (e) {
    console.log(`ERROR OCCURED IN GET DOCTOR API: ${e}`);
  }
}


async function getPatient(postData) {
  try {
    let url = "https://final-hustle.herokuapp.com/patient_data"
    console.log(url);
    // let url = "https://oculus-2022.herokuapp.com/addToTeam/";
    let data = await axios.post(url, postData);
    console.log("The post data is: ", data.data);
    return data.data;
  } catch (e) {
    console.log(`ERROR OCCURED IN GET DOCTOR API: ${e}`);
  }
}

async function getAllPatient(postData) {
  try {
    let url = "https://final-hustle.herokuapp.com/get_all_patients"
    console.log(url);
    // let url = "https://oculus-2022.herokuapp.com/addToTeam/";
    let data = await axios.post(url, postData);
    console.log("The post data is: ", data.data);
    return data.data;
  } catch (e) {
    console.log(`ERROR OCCURED IN GET DOCTOR API: ${e}`);
  }
}

async function updateMedicine(postData) {
  try {
    let url = "https://final-hustle.herokuapp.com/medicine"
    console.log(url);
    // let url = "https://oculus-2022.herokuapp.com/addToTeam/";
    let data = await axios.post(url, postData);
    console.log("The post data is: ", data.data);
    return data.data;
  } catch (e) {
    console.log(`ERROR OCCURED IN GET DOCTOR API: ${e}`);
  }
}



export const eventService = {
    getStats,
    getDoctor,
    getPatient,
    getAllPatient,
    updateMedicine
};