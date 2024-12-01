import { useState, useEffect } from 'react';

import { Card } from '@consta/uikit/Card';
import { List } from '@consta/uikit/ListCanary';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { useNavigate } from 'react-router-dom';

import './MainPage.css';

const MainPage = () => {
    const [cards, setCards] = useState([]);
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

    useEffect(() => {
        fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main')
            .then((response) => response.json())
            .then((data) => setCards(data));
    }, []);

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <Button label="Главная" onClick={goToHomePage} size="s" className="header-button" />
                    <Button label="Сервисы" onClick={goToServicePage} size="s" className="header-button" />
                </div>
                <div className="header-right">
                    <Text>ФИО</Text>
                    <Button label="Войти" onClick={goToLoginPage} size="s" className="header-button" />
                </div>
            </div>
            <List
                items={cards}
                renderItem={(item) => (
                    <Card verticalSpace="m" horizontalSpace="m" className="card-style">
                        <Text weight="bold" lineHeight="l" size="2xl">{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text align="right" view="ghost" size="s">{item.createdAt}</Text>
                    </Card>
                )}
            />
        </div>
    );
}

export default MainPage;
