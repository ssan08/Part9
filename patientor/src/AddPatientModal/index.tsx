import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import AddEntryForm1, { EntryFormValues1 } from './AddEntryForm1';
import AddEntryForm2, { EntryFormValues2 } from './AddEntryForm2';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


interface Props1 {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props1) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


interface Props2 {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues1) => void;
  error?: string;
}

const AddEntryModal1 = ({ modalOpen, onClose, onSubmit, error }: Props2) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new occupational healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm1 onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


interface Props3 {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues2) => void;
  error?: string;
}

const AddEntryModal2 = ({ modalOpen, onClose, onSubmit, error }: Props3) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm2 onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


export {AddPatientModal, AddEntryModal, AddEntryModal1, AddEntryModal2}
