from fastapi import FastAPI
from typing import Optional
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pathlib import Path
import os

import datetime
from pydantic import BaseModel

# from wsgiref.util import FileWrapper

# import pandas as pd

import os
dirname = os.path.dirname(__file__)
cred = credentials.Certificate(os.path.join(dirname, 'credentials.json'))

firebase_admin.initialize_app(cred)
db = firestore.client()


app = FastAPI()


def get_patient_det(id):
    Patient = db.collection(u'Patient').where(
        u'Id', u'==', id).stream()

    for d in Patient:
        dict = d.to_dict()
        dict['Id'] = d.id
        return dict


class Doctor_Data(BaseModel):
    id: str


@app.post("/doctor_data")
def doctor_data(item: Doctor_Data):
    # Id = 'T3HSB'
    Doctor = db.collection(u'Doctor').where(
        u'Id', u'==', item.id).stream()

    for d in Doctor:
        dict = d.to_dict()
        dict['Id'] = d.id
        return dict


class Patient_Data(BaseModel):
    id: str


@app.post("/patient_data")
def patient_data(item: Patient_Data):
    # Id = 'T3HSB'
    return get_patient_det(item.id)


@app.post("/get_all_patients")
def get_all_patients(item: Doctor_Data):
    # Id = 'T3HSB'
    Doctor = db.collection(u'Doctor').where(
        u'Id', u'==', item.id).stream()
    doctor = ''
    for d in Doctor:
        dict = d.to_dict()
        dict['Id'] = d.id
        doctor = dict
    # print(doctor)
    patients = doctor['Patients']
    p_data = [get_patient_det(i) for i in patients]
    return p_data


@app.post("/get_random_doctor_data")
def get_random_doctor_data(item: Doctor_Data):
    # Id = 'T3HSB'
    Doctor = db.collection(u'Doctor').where(
        u'Id', u'==', item.id).stream()
    doctor = ''
    for d in Doctor:
        dict = d.to_dict()
        dict['Id'] = d.id
        doctor = dict
    # print(doctor)
    patients = doctor['Patients']
    p_data = [get_patient_det(i) for i in patients]
    num = len(p_data)
    games = 0
    for p in p_data:
        games += len(p['Picture']) + len(p['Word']) + len(p['Audio'])
    out = {
        'number_patients': num,
        'number_games': games
    }
    return out


class Medicines(BaseModel):
    medicines: list
    patient_id: str
    # doctor_id: str


@app.post("/medicine")
def medicine(item: Medicines):
    # patient = get_patient_det(item.patient_id)
    Patient = db.collection(u'Patient').where(
        u'Id', u'==', item.patient_id).stream()
    id = ''
    for x in Patient:
        id = x.id
    pat = db.collection(u'Patient').document(id)
    pat.update({u'Medicine': item.medicines})
    # for m in item.medicines:
    #     name = m['Name']
    #     dose = m['Dose']
    return {"Status": "Okay"}
