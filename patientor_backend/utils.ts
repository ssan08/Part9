import { Gender, newPatient } from './types'

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: any): newPatient => {
    return {
        name: object.name,
        ssn: object.ssn,
        dateOfBirth: object.dateOfBirth,
        gender: parseGender(object.gender),
        occupation: object.occupation
    };
};

export { toNewPatientEntry }