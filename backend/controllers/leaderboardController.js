const Battle = require('../models/battle');

const getLeaderboard = async (req, res) => {
  try {
    const topPlayers = await Battle.find().sort({ score: -1, time: 1 }).limit(10);
    res.status(200).json(topPlayers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: err.message });
  }
};

module.exports = { getLeaderboard };