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

    // Проверка только для запроса с параметром title
    if (req.query.title) {
      // Если title меньше 2 символов или пустой, возвращаем пустой массив
      if (title.trim().length < 2) {
        return res.status(200).json([]);
      }

      // Фильтрация по title, если передан параметр title с нужной длиной
      const filteredData = allData.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
      return res.status(200).json(filteredData);
    }

    // Если параметра title нет в запросе, возвращаем все данные
    res.status(200).json(allData);
  });
}
