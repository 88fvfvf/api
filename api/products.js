import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Устанавливаем заголовки CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка запроса OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Определяем путь к JSON-файлу
  const filePath = path.resolve('my-api.json');

  // Читаем файл
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading JSON file' });
    }

    const allData = JSON.parse(data);

    // Получаем параметр title из строки запроса
    const { title } = req.query;

    // Если параметр title присутствует и его длина >= 2 символов
    if (title && title.trim().length >= 2) {
      // Фильтрация данных по title
      const filteredData = allData.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
      return res.status(200).json(filteredData);
    }

    // Если параметр title пустой или его длина < 2, возвращаем пустой массив
    if (title) {
      return res.status(200).json([]);
    }

    // Если параметра title нет, возвращаем все данные
    res.status(200).json(allData);
  });
}
