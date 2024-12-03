import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { useNavigate } from 'react-router-dom';
import styles from './ServicePage.module.css';


const ServicePage = () => {
    const { id } = useParams();

    const [service, setService] = useState(null);
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
            <div className={styles['service-detail-container']}>
                <div className={styles['service-detail-card']}>
                    <Card className={styles['card-style']}>
                        {service ? (
                            <div>
                                {service.image && (
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className={styles['service-image']}
                                    />
                                )}
                                <Text size="xl" weight="bold" className={styles['service-name']}>
                                    {service.name}
                                </Text>
                                <Text size="m" className={styles['service-description']}>
                                    {service.description}
                                </Text>
                                <Button label="Назад" onClick={() => window.history.back()} className={styles['back-button']} />
                            </div>
                        ) : (
                            <Text size="xl" color="alert" weight="bold" className={styles['no-data-message']}>
                                Данные не найдены
                            </Text>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
