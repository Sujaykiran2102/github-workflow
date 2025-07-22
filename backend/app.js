const express = require('express');
const cors = require('cors');
const battleRoutes = require('./routes/battleRoutes');
const leaderboardRoutes = require('./routes/leaderBoardRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/battle', battleRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

module.exports = app;