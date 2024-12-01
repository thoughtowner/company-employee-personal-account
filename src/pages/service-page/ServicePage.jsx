import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { useNavigate } from 'react-router-dom';

import './ServicePage.css';

const ServiceDetailPage = () => {
    const { id } = useParams();
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

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const serv = await response.json();
                setService(serv);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchService();

    }, [id]);

    if (error) {
        return (
            <Text view="alert" size="xl" weight="bold" color="alert">
                Ошибка загрузки: {error}
            </Text>
        );
    }

    return (
        <div>
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
            </div>
            <div className="service-detail-container">
                <div className="service-detail-card">
                    <Card className="card-style">
                        {service ? (
                            <div>
                                {service.image && (
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="service-image"
                                    />
                                )}
                                <Text size="xl" weight="bold" className="service-name">
                                    {service.name}
                                </Text>
                                <Text size="m" className="service-description">
                                    {service.description}
                                </Text>
                                <Button label="Назад" onClick={() => window.history.back()} className="back-button" />
                            </div>
                        ) : (
                            <Text size="xl" color="alert" weight="bold" className="no-data-message">
                                Данные не найдены
                            </Text>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
