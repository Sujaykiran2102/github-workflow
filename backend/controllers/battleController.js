const { sendToJudge0 } = require('../utils/judge0');
const Battle = require('../models/battle');

const submitCode = async (req, res) => {
  try {
    const { sourceCode, languageId, stdin } = req.body;
    const result = await sendToJudge0(sourceCode, languageId, stdin);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Code submission failed', details: err.message });
  }
};

const recordResult = async (req, res) => {
  try {
    const { username, score, time } = req.body;
    const battle = new Battle({ username, score, time });
    await battle.save();
    res.status(201).json({ message: 'Result recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save result', details: err.message });
  }
};

module.exports = { submitCode, recordResult };