import { Legend, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './DailyActivity.scss';

/**
 * DailyActivity est un composant React qui affiche l'activité quotidienne de l'utilisateur.
 * Il affiche un graphique à barres avec le poids en kilogrammes et les calories brûlées chaque jour.
 *
 * @param {Object} props Les propriétés passées au composant DailyActivity.
 * @param {Array} props.userActivity Un tableau d'objets représentant l'activité de l'utilisateur chaque jour. Chaque objet contient le jour, le poids en kilogrammes et les calories brûlées.
 * @returns {JSX.Element} Un élément JSX qui représente l'activité quotidienne de l'utilisateur.
 */

function DailyActivity({ userActivity }) {
    // Modifie day afin d'avoir un numéro de jour à chaque session
    const numberOfDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const processedActivity = userActivity.map((session, index) => ({
        ...session,
        day: numberOfDay[index], // Attribution du jour de la semaine
    }));
    const legendValue = (value) => {
        return <span className="legend">{value} </span>
    };

    return (
        <article className="activity">
            <h2>Activité quotidienne</h2>
            <figure>
                <ResponsiveContainer width="100%" height="100%" className={'test'}>
                    <BarChart data={processedActivity} margin={{ top: 30, right: 20, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#DEDEDE" horizontal={true} vertical={false} />

                        <XAxis dataKey="day" tick={{ fill: '#9699a6', fontSize: '14', fontWeight: 500 }} tickLine={false} tickSize={16} stroke="#DEDEDE" />

                        <YAxis
                            yAxisId={0}
                            dataKey="kilogram"
                            stroke="#9699a6"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9699a6', fontSize: '14', fontWeight: 500 }}
                            domain={['dataMin - 1', 'dataMax + 2']}
                        />
                        <YAxis yAxisId={1} dataKey="calories" hide={true} domain={['dataMin - 100', 'dataMax + 100']} />

                        <Tooltip
                            itemStyle={{
                                color: 'white',
                                fontSize: 10,
                                fontWeight: 500,
                            }}
                            formatter={(value, name, unit) => [value, unit]}
                            labelStyle={{ display: 'none' }}
                            contentStyle={{
                                backgroundColor: '#E60000',
                            }}
                        />

                        <Legend layout="horizontal" verticalAlign="top" align="right" iconType="circle" iconSize={8} height={47} formatter={legendValue} />
                        <Bar yAxisId={0} dataKey="kilogram" barSize={7} radius={[5, 5, 0, 0]} unit=" kg" name="Poids (kg)" fill="#282D30"/>
                        <Bar yAxisId={1} dataKey="calories" barSize={7} radius={[5, 5, 0, 0]} unit=" Kcal" name="Calories brûlées (kCal)" fill="#E60000"/>
                    </BarChart>
                </ResponsiveContainer>
            </figure>
        </article>
    )
}

DailyActivity.propTypes = {
    userActivity: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            kilogram: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
        })
    ).isRequired
};

export default DailyActivity;
