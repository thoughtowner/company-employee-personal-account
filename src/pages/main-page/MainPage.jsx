import { useState, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { List } from '@consta/uikit/ListCanary';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.css'

const MainPage = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main')
            .then((response) => response.json())
            .then((data) => setCards(data));
    }, []);

    return (
        <div>
            <List
                items={cards}
                renderItem={(item) => (
                    <div className={styles.cardStyle}>
                        <Card>
                            <Text className={styles.newsItemTitle}>{item.name}</Text>
                            <Text className={styles.newsItemDescription}>{item.description}</Text>
                            <Text className={styles.newsItemDate}>{item.createdAt}</Text>
                        </Card>
                    </div>
                )}
            />
        </div>
    );
}

export default MainPage;
