import { useState, useEffect } from 'react';
import { getUserInfo } from '../../services/apiService';
import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import './Score.scss';

/**
 * Score is a React component that displays the user's score.
 * It displays a radial bar chart with the score percentage.
 *
 * @param {Object} props The properties passed to the Score component.
 * @param {number} props.initialUserId The initial ID of the user.
 * @returns {JSX.Element} A JSX element that represents the user's score.
 */

function Score({ initialUserId }) {
    const [userId, setUserId] = useState(initialUserId);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(false); // Ajout d'un état pour gérer l'erreur

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await getUserInfo(userId);
                console.log('Data from getUserInfo:', userInfo); // Ajout d'un log de débogage

                if (userInfo && userInfo.size > 0) {
                    const userScore = userInfo.get('userScore');
                    if (userScore !== undefined) {
                        setScore(userScore);
                    } else {
                        console.log('Score de l\'utilisateur non trouvé');
                        setError(true);
                    }
                } else {
                    console.log('Données de l\'utilisateur non trouvées');
                    setError(true);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
                setError(true);
            }
        };

        fetchData();
    }, [userId]);

    const scoreValue = [{ value: score * 100 }];
    const newScore = score * 100;

    return (
        <article className="score">
            <h2>Score</h2>
            <figure>
                {error ? ( // Conditionnellement afficher le message d'erreur si l'état d'erreur est vrai
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', zIndex: 1, textAlign: 'center', borderRadius: '5px', }}>
                            Erreur de chargement des données
                        </div>
                    ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart data={scoreValue} innerRadius={80} outerRadius="80%" barSize={10} startAngle={80} endAngle={440}>
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar dataKey="value" cornerRadius={5} background fill={'#FF0000'} />
                        <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" fontSize="26" fontWeight="700" fill="black">
                            {newScore}%
                        </text>
                        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="gray" fontWeight="500">
                            de votre objectif
                        </text>
                    </RadialBarChart>
                </ResponsiveContainer>
                    )}
            </figure>
        </article>
    );
}

Score.propTypes = {
    initialUserId: PropTypes.number.isRequired,
};

export default Score;

