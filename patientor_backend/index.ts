import express from 'express';
import diagnosisRouter from './routes/diagnosis';
import patientRouter from './routes/patient'
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients',patientRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});