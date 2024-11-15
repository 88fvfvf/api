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

        // Определяем, какую категорию данных запрашивают
        const { category } = req.query;

        if (!category || !allData[category]) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Возвращаем данные для указанной категории
        res.status(200).json(allData[category]);
    });
}
