import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Устанавливаем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');  // Разрешаем доступ с любого домена
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');  // Разрешаем методы GET и OPTIONS
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Разрешаем заголовки Content-Type

  // Обработка запросов типа OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const filePath = path.resolve('my-api.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading JSON file' });
    }

    const allData = JSON.parse(data);
    const breakfastData = allData.breakfast || [];

    res.status(200).json(breakfastData);
  });
}
