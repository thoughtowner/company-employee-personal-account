import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import styles from './NavigationBar.module.css';

import { logout, selectIsAuth } from '../../store';


const NavigationBar = () => {
  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных пользователя');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.link}>Главная</Link>
        <Link to="/services" className={styles.link}>Сервисы</Link>
      </div>
      <div className={styles.rightSection}>
        {isAuthenticated ? (
          <div>
            {user && (
              <div>
                {user.firstName} {user.lastName} {user.maidenName}
              </div>
            )}
            <button className={styles.logoutButton} onClick={() => navigate('/profile')}>Профиль</button>
            <button className={styles.logoutButton} onClick={() => dispatch(logout())}>Выйти</button>
          </div>
        ) : (
          <div className={styles.loginButton}>
            <button className={styles.loginButton} onClick={() => navigate('/login')}>Войти</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
