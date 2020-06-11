import React, { useState } from "react";
import axios from "axios";
import { Container, Table, Button, Icon } from "semantic-ui-react";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { EntryFormValues1 } from "../AddPatientModal/AddEntryForm1";
import { EntryFormValues2 } from "../AddPatientModal/AddEntryForm2";
import { AddPatientModal, AddEntryModal, AddEntryModal1, AddEntryModal2 } from "../AddPatientModal";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
interface DescProps {
  code: string;
  diag: Diagnosis[];
}

interface Hospitalprops {
  date: string;
  desc: string;
}

interface HealthCheckprops {
  date: string;
  desc: string;
  rating: number;
}

interface OccupationalHealthcareprops {
  date: string;
  desc: string;
  emp: string;
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  var rating: number = 1
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck date={entry.date} desc={entry.description} rating={entry.healthCheckRating} />
    case "Hospital":
      return <HospitalEntry date={entry.date} desc={entry.description} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcare date={entry.date} desc={entry.description} emp={entry.employerName} />
    default:
      return <p></p>
  }
};

const HospitalEntry: React.FC<Hospitalprops> = (props) => {
  return (
    <div>
      <Table celled>
        <Table.Body>
          <Table.Row >
            <Table.Cell>
              <h2>{props.date} <Icon name="hospital" /></h2>
              <p>{props.desc}</p>
            </Table.Cell>

          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

const HealthCheck: React.FC<HealthCheckprops> = (props) => {
  if (props.rating == 0) {
    return (
      <div>
        <Table celled>
          <Table.Body>
            <Table.Row >
              <Table.Cell>
                <h2>{props.date} <Icon name="doctor" /></h2>
                <p>{props.desc}</p>
                <Icon name="heart" color="green" />
              </Table.Cell>

            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
  else if (props.rating == 1) {
    return (
      <div>
        <Table celled>
          <Table.Body>
            <Table.Row >
              <Table.Cell>
                <h2>{props.date} <Icon name="doctor" /></h2>
                <p>{props.desc}</p>
                <Icon name="heart" color="yellow" />
              </Table.Cell>

            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
  else {
    return (
      <div>
        <Table celled>
          <Table.Body>
            <Table.Row >
              <Table.Cell>
                <h2>{props.date} <Icon name="doctor" /></h2>
                <p>{props.desc}</p>
                <Icon name="heart" color="red" />
              </Table.Cell>

            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }

}

const OccupationalHealthcare: React.FC<OccupationalHealthcareprops> = (props) => {
  return (
    <div>
      <Table celled>
        <Table.Body>
          <Table.Row >
            <Table.Cell>
              <h2>{props.date} <Icon name="stethoscope" /> {props.emp}</h2>
              <p>{props.desc}</p>
            </Table.Cell>

          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

const Desc: React.FC<DescProps> = (props) => {
  var r: string = ''
  for (let k = 0; k < props.diag.length; k++) {
    if (props.diag[k].code == props.code) {
      r = props.diag[k].name
    }
  }


  return <p> {props.code} {r}</p>;
};

const PatientListPage: React.FC = () => {


  const [{ patients }, dispatch] = useStateValue();
  const [p, setP] = useState({
    id: '',
    name: '',
    occupation: '',
    gender: '',
    ssn: '',
    dateOfBirth: '',
    entries: []
  })

  const [diag, setDiag] = useState([{
    code: '',
    name: '',
    latin: ''
  }])
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalOpen1, setModalOpen1] = React.useState<boolean>(false);
  const [modalOpenO, setModalOpenO] = React.useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = React.useState<boolean>(false);
  const [patientClick, setPatientClick] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [id, setId] = useState('')
  const openModal = (): void => setModalOpen(true);
  const openModal1 = (id: string): void => {
    setModalOpen1(true);
    setId(id)
  }
  const openModalO = (id: string): void => {
    setModalOpenO(true);
    setId(id)
  }
  const openModal2 = (id: string): void => {
    setModalOpen2(true);
    setId(id)
  }
  const click = async (id: string) => {
    const { data: p } = await axios.get(`${apiBaseUrl}/patients/${id}`);
    const { data: diag } = await axios.get(`${apiBaseUrl}/diagnosis`)
    setPatientClick(true);
    setP(p)
    setDiag(diag)
  }

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const closeModal1 = (): void => {
    setModalOpen1(false);
    setError(undefined);
  };
  const closeModalO = (): void => {
    setModalOpenO(false);
    setError(undefined);
  };
  const closeModal2 = (): void => {
    setModalOpen2(false);
    setError(undefined);
  };
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      console.log(newPatient)
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values)
    try {
      await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      closeModal1();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }

  };

  const submitNewEntry1 = async (values: EntryFormValues1) => {
    console.log(values)
    try {
      await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      closeModalO();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }

  };

  const submitNewEntry2 = async (values: EntryFormValues2) => {
    console.log(values)
    try {
      await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      closeModal2();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }

  };

  if (patientClick == true) {
    console.log(diag)
    if (p.gender == 'female') {
      return (
        <div>
          <h2>{p.name} <Icon name='venus' /></h2>
          <p>ssn: {p.ssn}</p>
          <p>occupation: {p.occupation}</p>
          <h3>entries:</h3>
          {p.entries.map((entry: Entry) => (
            <div>
              <EntryDetails entry={entry} />

              {entry.diagnosisCodes ?
                <div key={entry.type}>
                  {
                    entry.diagnosisCodes.map((codes: Diagnosis['code']) => {
                      return (
                        <ul ><li key={codes}> <Desc code={codes} diag={diag} /></li></ul>
                      )
                    })
                  }
                </div>
                : <p></p>}

            </div>
          ))}
        </div>
      );
    }
    else if (p.gender == 'male') {
      return (
        <div>
          <h2>{p.name} <Icon name='mars' /></h2>
          <p>ssn: {p.ssn}</p>
          <p>occupation: {p.occupation}</p>
          <h3>entries:</h3>
          {p.entries.map((entry: Entry) => (
            <div>
              <EntryDetails entry={entry} />
              {entry.diagnosisCodes ?
                <div key={entry.type}>
                  {
                    entry.diagnosisCodes.map((codes: Diagnosis['code']) => {
                      return (
                        <ul ><li key={codes}><Desc code={codes} diag={diag} /> </li></ul>
                      )
                    })
                  }
                </div>
                : <p></p>}

            </div>
          ))}

        </div>
      );
    }
    else {
      return (
        <div>
          <h2>{p.name} <Icon name='transgender' /></h2>
          <p>ssn: {p.ssn}</p>
          <p>occupation: {p.occupation}</p>
          <h3>entries:</h3>
          {p.entries.map((entry: Entry) => (
            <div>
              <EntryDetails entry={entry} />
              {entry.diagnosisCodes ?
                <div key={entry.type}>
                  {
                    entry.diagnosisCodes.map((codes: Diagnosis['code']) => {
                      return (
                        <ul ><li key={codes}><Desc code={codes} diag={diag} /> </li></ul>
                      )
                    })
                  }
                </div>
                : <p></p>}

            </div>
          ))}
        </div>
      );
    }

  }
  else {
    return (
      <div className="App">
        <Container textAlign="center">
          <h3>Patient list</h3>
        </Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Occupation</Table.HeaderCell>
              <Table.HeaderCell>Health Rating</Table.HeaderCell>
              <Table.HeaderCell>Add HealthCheck Entries</Table.HeaderCell>
              <Table.HeaderCell>Add Hospital Entries</Table.HeaderCell>
              <Table.HeaderCell>Add Occupational Healthcare Entries</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.values(patients).map((patient: Patient) => (
              <Table.Row key={patient.id}>
                <Table.Cell> <Button onClick={() => click(patient.id)}> {patient.name}</Button></Table.Cell>
                <Table.Cell>{patient.gender}</Table.Cell>
                <Table.Cell>{patient.occupation}</Table.Cell>
                <Table.Cell>
                  <HealthRatingBar showText={false} rating={1} />
                </Table.Cell>
                <Table.Cell>
                  <AddEntryModal
                    modalOpen={modalOpen1}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal1}
                  /><Button onClick={() => openModal1(patient.id)}> Add HealthCheck Entry</Button> </Table.Cell>
                <Table.Cell>
                  <AddEntryModal2
                    modalOpen={modalOpen2}
                    onSubmit={submitNewEntry2}
                    error={error}
                    onClose={closeModal2} />
                  <Button onClick={() => openModal2(patient.id)}> Add Hospital Entry</Button> </Table.Cell>
                <Table.Cell>
                  <AddEntryModal1
                    modalOpen={modalOpenO}
                    onSubmit={submitNewEntry1}
                    error={error}
                    onClose={closeModalO} />
                  <Button onClick={() => openModalO(patient.id)}> Add Occupational Healthcare Entry</Button> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <AddPatientModal
          modalOpen={modalOpen}
          onSubmit={submitNewPatient}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Patient</Button>
      </div>
    );
  }


};

export default PatientListPage;
