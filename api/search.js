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

        // Получаем параметр q из строки запроса
        const { q } = req.query;

        // Если параметр q пустой или его длина меньше 2 символов, возвращаем пустой массив
        if (!q || q.trim().length < 2) {
            return res.status(200).json([]);
        }

        // Фильтрация данных по q
        const filteredData = allData.filter((item) =>
            item.title.toLowerCase().includes(q.toLowerCase())
        );

        return res.status(200).json(filteredData);
    });
}
