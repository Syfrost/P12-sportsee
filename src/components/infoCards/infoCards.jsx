import PropTypes from 'prop-types';
import caloriesicon from '../../assets/calories-icon.svg';
import carbsicon from '../../assets/carbs-icon.svg';
import faticon from '../../assets/fat-icon.svg';
import proteinicon from '../../assets/protein-icon.svg';
import ItemCard from '../infoCards/itemCard';
import './infoCards.scss';

/**
 * InfoCards est un composant React qui affiche une série de cartes d'information.
 * Chaque carte est un composant ItemCard qui affiche une icône, un nom, une unité de mesure et une valeur de données.
 *
 * @param {Object} props Les propriétés passées au composant InfoCards.
 * @param {Object} props.userKeyData Les données utilisateur à afficher sur les cartes. Ces données sont obtenues à partir de l'API.
 * @returns {JSX.Element} Un élément JSX qui représente une série de cartes d'information.
 */

function InfoCards({ userKeyData }) {
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
    userKeyData: PropTypes.object.isRequired,
};

export default InfoCards;
