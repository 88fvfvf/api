// api/server.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Чтение данных из my-api.json
  const filePath = path.resolve('my-api.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading JSON file' });
    }

    // Преобразование строки в JSON
    const products = JSON.parse(data);

    // Ответ с товарами
    res.status(200).json(products);
  });
}
