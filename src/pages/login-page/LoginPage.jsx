import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';

import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    const goToServicePage = () => {
        navigate('/services');
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

  const validatePassword = (password) => {
    return password.length >= 6 && /[a-zA-Z]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      username: '',
      password: ''
    });

    if (!validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум одну букву и цифру' }));
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Не удалось войти. Проверьте данные и попробуйте снова.';
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors[0].message || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      setUsername('');
      setPassword('');
      console.log('Авторизация успешна');
    } catch (error) {
      console.error('Произошла ошибка:', error);
      handleError('Не удалось войти. Проверьте данные и попробуйте снова.');
    }
  };

  const handleError = (error) => {
    setErrors(prev => ({ ...prev, password: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
          <div className="header-left">
              <Button label="Главная" onClick={goToHomePage} size="s" className="header-button" />
              <Button label="Сервисы" onClick={goToServicePage} size="s" className="header-button" />
          </div>
          <div className="header-right">
            <Text>ФИО</Text>
            <Button label="Войти" onClick={goToLoginPage} size="s" className="header-button" />
          </div>
        </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Вход в систему</h2>
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            className={styles.input1}
            required
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
          
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={handleInputChange}
            className={styles.input2}
            required
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          
          <Button type="submit" className={styles.button} label={"Войти"}/>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
