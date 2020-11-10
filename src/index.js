require('dotenv').config()
const cors = require('cors');
const express = require('express');

const sequelize = require('./models');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/board', routes.board);
app.use('/lane', routes.lane);
app.use('/card', routes.card);
app.use('/user', routes.user);
app.use('/todo', routes.todo);
app.use('/auth', routes.auth);

app.listen(process.env.PORT, async () => {
    // console.log(sequelize);
    await sequelize.sync();
    console.log('All models were synchronized successfully.')
    console.log(`Kanban app listening on port ${process.env.PORT}`);
})
