const express = require('express');
const routes = require('./Controllers/empRoutes');
const ConnectDB = require('./Connections/db');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
ConnectDB();
app.use('/api',routes);

app.listen(3000,()=> {
  console.log('server started:http://localhost:3000')
})