import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Добавляем заголовки для разрешения CORS
  res.setHeader('Access-Control-Allow-Origin', '*');  // Разрешить доступ с любого источника
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Разрешить методы
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Разрешить заголовки

  // Обработка запроса
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
