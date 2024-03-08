import React from 'react';
import PropTypes from 'prop-types';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import './Performance.scss';

function Performance({ userPerformance }) {
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
    userPerformance: PropTypes.array.isRequired
};

export default Performance;
