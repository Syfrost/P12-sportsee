import { useState, useEffect } from 'react';
import { getUserInfo } from '../../services/apiService';
import PropTypes from 'prop-types';
import caloriesicon from '../../assets/calories-icon.svg';
import carbsicon from '../../assets/carbs-icon.svg';
import faticon from '../../assets/fat-icon.svg';
import proteinicon from '../../assets/protein-icon.svg';
import ItemCard from '../infoCards/itemCard';
import './infoCards.scss';

/**
 * InfoCards is a React component that displays a series of information cards.
 * Each card is an ItemCard component that displays an icon, a name, a unit of measurement, and a data value.
 *
 * @param {Object} props The properties passed to the InfoCards component.
 * @param {Object} props.userKeyData The user data to be displayed on the cards. This data is obtained from the API.
 * @returns {JSX.Element} A JSX element that represents a series of information cards.
 */

function InfoCards({ initialUserId }) {
    const [userKeyData, setUserKeyData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await getUserInfo(initialUserId);
                console.log('Data from getUserInfo:', userInfo); // Ajout d'un log de débogage

                if (userInfo && userInfo.size > 0) {
                    const keyData = userInfo.get('keyData');
                    if (keyData) {
                        setUserKeyData(keyData);
                    } else {
                        console.log('Données clés de l\'utilisateur non trouvées');
                    }
                } else {
                    console.log('Données de l\'utilisateur non trouvées');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            }
        };

        fetchData();
    }, [initialUserId]);

    return (
        <section className={"infoCards"}>
            {userKeyData && (
                <>
                    {userKeyData.calorieCount &&
                        <ItemCard data={userKeyData.calorieCount} name="Calories" icon={caloriesicon} unit="kCal"/>}
                    {userKeyData.proteinCount &&
                        <ItemCard data={userKeyData.proteinCount} name="Proteines" icon={proteinicon} unit="g"/>}
                    {userKeyData.carbohydrateCount &&
                        <ItemCard data={userKeyData.carbohydrateCount} name="Glucides" icon={carbsicon} unit="g"/>}
                    {userKeyData.lipidCount &&
                        <ItemCard data={userKeyData.lipidCount} name="Lipides" icon={faticon} unit="g"/>}
                </>
            )}
        </section>
    );
}

InfoCards.propTypes = {
    initialUserId: PropTypes.number.isRequired,
};

export default InfoCards;
