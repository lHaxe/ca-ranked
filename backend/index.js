const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let rankings = [
  { id: '123', username: 'User1', xp: 1200 },
  { id: '456', username: 'User2', xp: 900 },
];

app.get('/api/rank', (req, res) => {
  const sorted = rankings.sort((a, b) => b.xp - a.xp);
  res.json(sorted);
});

app.post('/api/update-xp', (req, res) => {
  const { id, username, xp } = req.body;
  const index = rankings.findIndex(user => user.id === id);
  if (index > -1) {
    rankings[index].xp = xp;
  } else {
    rankings.push({ id, username, xp });
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});