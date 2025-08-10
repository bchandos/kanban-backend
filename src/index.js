require('dotenv').config()
const cors = require('cors');
const express = require('express');

const sequelize = require('./models');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

const baseUrl = process.env.BASE_URL || "/";

app.use(`${baseUrl}board`, routes.board);
app.use(`${baseUrl}lane`, routes.lane);
app.use(`${baseUrl}card`, routes.card);
app.use(`${baseUrl}user`, routes.user);
app.use(`${baseUrl}todo`, routes.todo);
app.use(`${baseUrl}auth`, routes.auth);

app.listen(process.env.PORT, async () => {
    // console.log(sequelize);
    const s = await sequelize.sync();
    // If DEMO_MODE is active, create demo user and board
    // console.log(s);
    if (process.env.DEMO_MODE == "true" && s) {
        const { User, Board, Lane, Card } = s.models;
        const demoUser = await User.create({
            name: "demo",
            password: "demo25",
        });
        const demoBoard = await Board.create({
            name: "Demo Board",
            UserId: demoUser.id,
        });
        const demoLane = await Lane.create({
            name: "Demo Lane",
            BoardId: demoBoard.id,
        });
        const demoCard = await Card.create({
            LaneId: demoLane.id,
            name: "Demo Card",
            contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae libero vehicula, euismod quam in, varius risus. Duis sit amet.",
        });
    }
    console.log('All models were synchronized successfully.')
    console.log(`Kanban app listening on port ${process.env.PORT}`);
})
