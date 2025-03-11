import React from 'react';
import { useParams } from 'react-router-dom';

const LocationEditPage = () => {
  const { id } = useParams(); // Получаем ID из URL

  return (
    <div>
      <h1>Редактирование локации</h1>
      <p>ID: {id}</p>
      {/* Здесь будет форма для редактирования */}
    </div>
  );
};

export default LocationEditPage;
