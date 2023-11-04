import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`App listening on port ${port}`));

process.on('SIGINT', () => {
  server.close();
  console.log('App has been interruped');
});