import React from 'react';
import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import './Score.scss';

/**
 * Score is a React component that displays the user's score.
 * It displays a radial bar chart with the score percentage.
 *
 * @param {Object} props The properties passed to the Score component.
 * @param {number} props.score The score value to be displayed on the chart. This value is obtained from the API.
 * @returns {JSX.Element} A JSX element that represents the user's score.
 */

function Score({ score }) {
    const scoreValue = [{ value: score * 100 }];
    const newScore = score * 100;

    return (
        <article className="score">
            <h2>Score</h2>
            <figure>
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
            </figure>
        </article>
    );
}

Score.propTypes = {
    score: PropTypes.number.isRequired
};

export default Score;

