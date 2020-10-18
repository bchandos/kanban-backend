require('dotenv').config()
const cors = require('cors');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/board', routes.board);
app.use('/lane', routes.lane);
app.use('/card', routes.card);
app.use('/user', routes.user);

app.listen(process.env.PORT, () => {
    console.log(`Kanban app listening on port ${process.env.PORT}`);
})
