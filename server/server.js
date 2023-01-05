import express from 'express';
import {readdirSync} from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();

const app = express();

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    //useNewUrlParser: true, 
    //useUnifiedTopology: true
  })
  .then(() => console.log("DataBase connected successfully"))
  .catch((err) => console.log("DB Error => ", err));

//midllewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// route middleware
readdirSync('./routes').map(
    (r) => app.use('/api', require(`./routes/${r}`))
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));