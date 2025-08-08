const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const modules = [
  { id: 'workplace', description: 'Decoding meeting phrases, email tone, team dynamics' },
  { id: 'casual', description: 'Small talk, networking, public events' },
  { id: 'public', description: 'Customer service interactions, group settings' }
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/modules', (_req, res) => {
  res.json({ modules });
});

app.post('/api/quiz', (req, res) => {
  const answers = Array.isArray(req.body.answers) ? req.body.answers : [];
  const recommended = modules[answers.length % modules.length];
  res.json({ result: { recommended: recommended.id } });
});

app.post('/api/guidance', (req, res) => {
  const input = typeof req.body.text === 'string' ? req.body.text : '';
  res.json({ guidance: `Be mindful: ${input.slice(0, 50)}` });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
