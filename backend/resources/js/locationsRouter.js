const express = require('express');
const router = express.Router();
const LocationModel = require('../models/LocationModel'); // Импортируйте модель локации

// Удаление локации по ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await LocationModel.findByIdAndDelete(id); // Используйте метод вашей ORM/ODM
    res.status(200).json({ message: 'Локация успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении локации:', error);
    res.status(500).json({ error: 'Ошибка при удалении локации' });
  }
});

module.exports = router;