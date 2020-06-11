import { PatientsWithoutSsn, newPatient, Patient, Gender, Entry } from '../types';
import patients from '../data/patients';

const getEntries = (): PatientsWithoutSsn[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};


const getPatient = (id: string): Patient => {
    var p: Patient = patients[0]
    for (let index = 0; index < patients.length; index++) {
        if (patients[index].id == id) {
            p = {
                id: id,
                name: patients[index].name,
                ssn: patients[index].ssn,
                dateOfBirth: patients[index].dateOfBirth,
                gender: patients[index].gender,
                occupation: patients[index].occupation,
                entries: []
            }
        }

    }
    console.log(patients)
    for (let index = 0; index < patients.length; index++) {
        if (patients[index].id == id) {
            p.entries = patients[index].entries
        }

    }

    return (p);
};

const addEntry = (newP: newPatient) => {
    const id = `${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 12)}`

    const newPatientEntry = {
        id: id,
        name: newP.name,
        ssn: newP.ssn,
        dateOfBirth: newP.dateOfBirth,
        gender: Gender.Other,
        occupation: newP.occupation,
        entries: []
    }
    if (newP.gender == 'male') {
        newPatientEntry.gender = Gender.Male
    }
    else if (newP.gender == 'female') {
        newPatientEntry.gender = Gender.Female
    }

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addNewEntry = (id:string, entry: Entry) =>{
    for(let i =0;i<patients.length;i++){
        if(patients[i].id ==id){
            patients[i].entries = patients[i].entries.concat(entry)
        }
    }
    return patients
}

export default {
    getEntries,
    addEntry,
    getPatient,
    addNewEntry
};
