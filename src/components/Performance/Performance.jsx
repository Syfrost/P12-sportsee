import { useState, useEffect } from 'react';
import { getUserPerformance } from '../../services/apiService';
import React from 'react';
import PropTypes from 'prop-types';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import './Performance.scss';

/**
 * Performance is a React component that displays the user's performance.
 * It displays a radar chart with the intensity, speed, strength, endurance, energy, and cardio.
 *
 * @param {Object} props The properties passed to the Performance component.
 * @param {Array} props.userPerformance An array of objects representing the user's performance. Each object contains the kind and value.
 * @returns {JSX.Element} A JSX element that represents the user's performance.
 */

function Performance({ initialUserId }) {
    const [userId, setUserId] = useState(initialUserId);
    const [userPerformance, setUserPerformance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const performanceData = await getUserPerformance(userId);
                console.log('Data from getUserPerformance:', performanceData); // Ajout d'un log de débogage

                if (performanceData && performanceData.size > 0) {
                    const kindValue = performanceData.get('kindValue');
                    if (kindValue) {
                        setUserPerformance(kindValue);
                    } else {
                        console.log('Données de performance non trouvées');
                    }
                } else {
                    console.log('Données de performance non trouvées');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des performances de l\'utilisateur:', error);
            }
        };

        fetchData();
    }, [userId]);

    const kindName = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Energie', 'Cardio'];
    const transformedPerformance = userPerformance.map((data, index) => ({
        ...data,
        kind: kindName[data.kind - 1]
    }));

    return (
        <article className="performance">
            <figure>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={transformedPerformance} cx="50%" cy="50%" outerRadius="65%">
                        <PolarGrid radialLines={false} />
                        <PolarAngleAxis
                            dataKey="kind"
                            tickSize={10}
                            tick={{
                                fill: 'white',
                                fontSize: 10,
                                fontWeight: 500,
                                y: 200,
                            }}
                        />
                        <Radar
                            dataKey="value"
                            stroke="#FF0101"
                            fill="#FF0101"
                            fillOpacity={0.7}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </figure>
        </article>
    );
}

Performance.propTypes = {
    initialUserId: PropTypes.number.isRequired,
};

export default Performance;
