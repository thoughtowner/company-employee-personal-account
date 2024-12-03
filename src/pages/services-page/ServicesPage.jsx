import { useState, useEffect } from 'react';

import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { List } from '@consta/uikit/ListCanary';

import { useNavigate } from 'react-router-dom';

import styles from './ServicesPage.module.css';


export const ServicesPage = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services')
            .then((response) => response.json())
            .then((data) => setCards(data));
    }, []);

    const handleCardClick = (id) => {
        navigate(`/services/${id}`);
    };

    return (
        <div>
            <div className={styles.servicePageContainer}>
                <div className={styles.cardGrid}>
                    <List
                        items={cards}
                        renderItem={(item) => (
                            <Card
                                verticalSpace="m"
                                horizontalSpace="m"
                                className={styles.cardStyle}
                                onClick={() => handleCardClick(item.id)}
                            >
                                <div className={styles.cardContent}>
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
                                    <Text align="right" view="ghost" size="s" className={styles.cardFooter}>{item.createdAt}</Text>
                                </div>
                            </Card>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
