import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
})

router.get('/:id' ,(req,res) => {
  res.send(patientService.getPatient(req.params.id)) ; 
})

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientService.addEntry(newPatientEntry);

        res.json(newPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/:id/entries',(req,res) => {
patientService.addNewEntry(req.params.id,req.body)
res.send(null)
})
export default router;
