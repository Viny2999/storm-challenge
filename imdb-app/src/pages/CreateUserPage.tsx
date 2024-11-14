import React, { useState } from 'react';
import { createUser, setAuthToken } from '../service/http.service';
import { Role } from '../interfaces/User';

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: Role.USER,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      await createUser(formData)

      setMessage('Usuário criado com sucesso!');
    } catch (error) {
      setMessage('Erro ao criar o usuário. Verifique os dados e tente novamente.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Função:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit">Criar Usuário</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUserPage;
