import './Home.css';

import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <p>{t('description')}</p>
        </div>
    );
};

export default Home;
