import express from 'express';

const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Testi' });
});

app.listen(3001, () => {
  console.log('API Server listening on http://localhost:3001');
});
