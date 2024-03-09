import { useState, useEffect } from 'react';
import { getUserInfo } from '../../services/apiService';
import './Header.scss';
import PropTypes from 'prop-types';

/**
 * Header is a React component that displays a greeting message with the user's first name.
 *
 * @param {Object} props The properties passed to the Header component.
 * @param {string} props.firstName The first name of the user to be displayed in the greeting message.
 * @returns {JSX.Element} A JSX element that represents a greeting message.
 */

export default function Header({ initialUserId }) {
    const [userId, setUserId] = useState(initialUserId);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await getUserInfo(userId);
                console.log('Data from getUserInfo:', userInfo); // Ajout d'un log de débogage

                if (userInfo && userInfo.size > 0) {
                    const userInfos = userInfo.get('userInfos');
                    if (userInfos) {
                        setFirstName(userInfos.firstName);
                    } else {
                        console.log('Informations de l\'utilisateur non trouvées');
                    }
                } else {
                    console.log('Données de l\'utilisateur non trouvées');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            }
        };

        fetchData();
    }, [userId]);
    return (
        <header>
            <h1>
                Bonjour <span>{firstName}</span>
            </h1>
        </header>
    )
}

Header.propTypes = {
    firstName: PropTypes.string
};