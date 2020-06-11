import diagnosisData from '../data/diagnosis.json'
import { Diagnosis} from '../types';

const diagnosis: Array<Diagnosis> = diagnosisData;

const getEntries = (): Array<Diagnosis> => {
  return diagnosis;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};
