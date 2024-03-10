import { useState, useEffect } from 'react';
import { getUserAverageSessions } from '../../services/apiService';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import PropTypes from 'prop-types';
import './AverageSessions.scss';

/**
 * AverageSessions is a React component that displays the user's average session length over a week.
 * It displays a line chart with the session length in minutes for each day of the week.
 *
 * @param {Object} props The properties passed to the AverageSessions component.
 * @param {number} props.initialUserId The initial ID of the user.
 * @returns {JSX.Element} A JSX element that represents the user's average session length over a week.
 */

function AverageSessions({ initialUserId }) {
    const [userId, setUserId] = useState(initialUserId);
    const [userSessionAverage, setUserSessionAverage] = useState([]);
    const [error, setError] = useState(false); // Ajout d'un état pour gérer l'erreur

    useEffect(() => {
        const fetchData = async () => {
            try {
                const averageSessionsData = await getUserAverageSessions(userId);
                console.log('Data from getUserAverageSessions:', averageSessionsData); // Ajout d'un log de débogage

                if (averageSessionsData && averageSessionsData.size > 0) {
                    const sessions = averageSessionsData.get('averageSessions');
                    if (sessions) {
                        setUserSessionAverage(sessions);
                    } else {
                        console.log('Données de sessions moyennes non trouvées');
                        setError(true);
                    }
                } else {
                    console.log('Données de sessions moyennes non trouvées');
                    setError(true);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des sessions moyennes:', error);
                setError(true);
            }
        };

        fetchData();
    }, [userId]);

    // La logique de transformation des données reste inchangée
    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const transformedData = userSessionAverage.map(session => ({
        ...session,
        day: dayLabels[session.day - 1]
    }));

    const [dotPosition, setDotPosition] = useState({ left: 0, top: 0, visible: false });

    const handleMouseMove = (e) => {
        const dotElement = document.querySelector('.recharts-dot');
        if (e.activePayload && dotElement) {
            const coords = e.activeCoordinate;
            setDotPosition({ left: coords.x, top: coords.y, visible: true });
        } else {
            setDotPosition({ ...dotPosition, visible: false });
        }
    };
    const handleMouseLeave = () => {
        setDotPosition({ ...dotPosition, visible: false });
        const dotElement = document.querySelector('.recharts-dot');
        const tooltipElement = document.querySelector('.recharts-tooltip-item-unit');
        if (dotElement) {
            dotElement.style.display = 'none';
        }
        if (tooltipElement) {
            tooltipElement.style.display = 'none';
        }
    };

    return (
        <article className="averagesession">
            <figure>
                <div
                    style={{
                        position: 'absolute',
                        left: `${dotPosition.left}px`,
                        top: '0px',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.27)',
                        display: dotPosition.visible ? 'block' : 'none'
                    }}
                />
                {error ? ( // Conditionnellement afficher le message d'erreur si l'état d'erreur est vrai
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', zIndex: 1, textAlign: 'center', borderRadius: '5px', }}>
                        Erreur de chargement des données
                    </div>
                ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={transformedData}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}>
                        <Line type="natural" dataKey="sessionLength" stroke="white" dot={false} strokeWidth={2}
                              unit=" min"/>
                        <CartesianGrid stroke="transparent"/>
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={0}
                            tick={{
                                fill: 'white',
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            padding={{left: 30, right: 30}}
                        />
                        <YAxis hide={true} domain={['dataMin-30', 'dataMax+50']}/>
                        <Tooltip
                            itemStyle={{
                                color: 'black',
                                fontSize: 11,
                                fontWeight: 500,
                            }}
                            formatter={(value, name, unit) => [value, unit]}
                            labelStyle={{display: 'none'}}
                            cursor={{
                                stroke: 'black',
                                strokeOpacity: 0.1,
                                strokeWidth: 0
                            }}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: 'none',
                                padding: '10px'
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
                    )}
            </figure>
            <h2>Durée moyenne des sessions</h2>
        </article>
    );
}

AverageSessions.propTypes = {
    initialUserId: PropTypes.number.isRequired,
};

export default AverageSessions;
