const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/19150051/2ospb8d/'; // Replace with your Zapier webhook URL  

app.post('/send-data', (req, res) => {
  const { name, email, message } = req.body;

  axios.post(zapierWebhookUrl, { name, email, message })
    .then(response => {
      res.status(200).json({ message: 'Data sent successfully!' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to send data', error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
