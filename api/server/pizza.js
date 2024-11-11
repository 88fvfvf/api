import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('my-api.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading JSON file' });
    }

    const allData = JSON.parse(data);
    const pizzaData = allData.pizza || [];

    res.status(200).json(pizzaData);
  });
}
