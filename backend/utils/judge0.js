const axios = require('axios');

const sendToJudge0 = async (sourceCode, languageId, stdin) => {
  const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
    source_code: sourceCode,
    language_id: languageId,
    stdin
  }, {
    headers: {
      'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};

module.exports = { sendToJudge0 };