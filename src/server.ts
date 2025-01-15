import { Server } from 'http';
import app from './app';
import config from './app/config';

// getting-started.js
import mongoose from 'mongoose';
import seedSupperAdmin from './app/DB';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    seedSupperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      console.log('Server closed due to unhandled rejection');
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  console.log('Uncaught exception, shutting down the server');
  process.exit(1);
});
