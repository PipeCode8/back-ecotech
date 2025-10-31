import express from 'express';
import routes from './routes/index';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://retech-circle-owl2.vercel.app', // tu dominio de Vercel
  credentials: true
}));
app.use('/api', routes);

export default app;


