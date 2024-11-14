import React, { useState } from 'react';
import { createMovie, setAuthToken } from '../service/http.service';

const AddMoviePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    director: '',
    genre: 'Action',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Usuário não autenticado');
      }

      setAuthToken(token);      
      await createMovie(formData)

      setMessage('Filme cadastrado com sucesso!');
    } catch (error) {
      setMessage('Erro ao cadastrar o filme. Verifique os dados e tente novamente.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Cadastrar Filme</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Diretor:</label>
          <input type="text" name="director" value={formData.director} onChange={handleChange} required />
        </div>
        <div>
          <label>Gênero:</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMoviePage;
