import React,{useState} from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { OccupationalHealthcareEntry, HealthCheckRating, Diagnosis} from "../types";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NumberField, DiagnosisSelection } from "./FormField";
import { TextField, SelectEntry, RatingOption } from "./FormField";

interface Props {
    onSubmit: (values: EntryFormValues1) => void;
    onCancel: () => void;
  }

export type EntryFormValues1 = Omit<OccupationalHealthcareEntry, "id">;


 
const AddEntryForm1: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [diagnoses, setDiagnoses] = useState([{
        code: '',
        name: '',
        latin: ''
    }])
    const click = async () => {
        const { data: d } = await axios.get(`${apiBaseUrl}/diagnosis`)
        setDiagnoses(d)
    }
    if (diagnoses.length < 2) {
        click()
    }
  return (
    <Formik
    initialValues={{
        date: '',
        specialist: '',
        type: 'OccupationalHealthcare',
        description: '',
        diagnosisCodes:[],
        sickLeave: {
            startDate: '',
            endDate: '',
          },
          employerName:''
        
    }}
    onSubmit={onSubmit}
    validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specilist = requiredError;
        }
        return errors;
    }}
  >
  {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

return (
    <Form className="form ui">
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={TextField}
      />
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />

       <Field
        label="SickLeave Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
       <Field
        label="SickLeave End Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
      <Field
        label="Employer Name"
        placeholder="Employer Name"
        name="employer name"
        component={TextField}
      />

       <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />   
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={onCancel} color="red">
            Cancel
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={!dirty || !isValid}
          >
            Add
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
    }}
  </Formik>
  );
};

export default AddEntryForm1;