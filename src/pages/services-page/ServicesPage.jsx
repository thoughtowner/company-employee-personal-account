import { useState, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { List } from '@consta/uikit/ListCanary';
import { Button } from '@consta/uikit/Button';

import { useNavigate } from 'react-router-dom';

import './ServicesPage.css';


export const ServicePage = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services')
            .then((response) => response.json())
            .then((data) => setCards(data));
    }, []);

    const goToHomePage = () => {
        navigate('/');
    };

    const goToServicePage = () => {
        navigate('/services');
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

    const handleCardClick = (id) => {
        navigate(`/services/${id}`);
    };

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <Button label="Главная" onClick={goToHomePage} size="s" className="header-button" />
                    <Button label="Сервисы" onClick={goToServicePage} size="s" className="header-button" />
                </div>
                <div className="header-right">
                    <Text>ФИО</Text>
                    <Button label="Войти" onClick={goToLoginPage} size="s" className="login-button" />
                </div>
            </div>
            <div className="service-page-container">
            <div className="card-grid">
                <List
                    items={cards}
                    renderItem={(item) => (
                        <Card
                            verticalSpace="m"
                            horizontalSpace="m"
                            className="card-style"
                            onClick={() => handleCardClick(item.id)}
                        >
                            <div className="card-content">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        marginBottom: '15px',
                                    }}
                                />
                                <Text weight="bold" lineHeight="l" size="2xl">{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text align="right" view="ghost" size="s" className="card-footer">{item.createdAt}</Text>
                            </div>
                        </Card>
                    )}
                />
            </div>
        </div>
    </div>
    );
};

export default ServicePage;
