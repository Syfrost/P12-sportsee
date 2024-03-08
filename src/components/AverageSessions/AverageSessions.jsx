import { useState } from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import PropTypes from 'prop-types';
import './AverageSessions.scss';

function AverageSessions({ userSessionAverage }) {
    // La logique de transformation des données reste inchangée
    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const transformedData = userSessionAverage.map(session => ({
        ...session,
        day: dayLabels[session.day - 1]
    }));
    console.log(transformedData); //debug console.log to check the transformed data

    const [dotPosition, setDotPosition] = useState({ left: 0, top: 0, visible: false });

    const handleMouseMove = (e) => {
        if (e.activePayload) {
            const coords = e.activeCoordinate;
            setDotPosition({ left: coords.x, top: coords.y, visible: true });
        } else {
            setDotPosition({ ...dotPosition, visible: false });
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
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={transformedData}
                        onMouseMove={handleMouseMove}
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
                                fontSize: 8,
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
            </figure>
            <h2>Durée moyenne des sessions</h2>
        </article>
    );
}

AverageSessions.propTypes = {
    userSessionAverage: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.number.isRequired,
        sessionLength: PropTypes.number.isRequired
    })).isRequired
};

export default AverageSessions;