import PropTypes from 'prop-types';

/**
 * ItemCard est un composant React qui affiche une carte d'information.
 * Chaque carte contient une icône, un nom, une unité de mesure et une valeur de données.
 *
 * @param {Object} props Les propriétés passées au composant ItemCard.
 * @param {number} props.data La valeur des données à afficher sur la carte. Cette valeur est obtenue à partir de l'API.
 * @param {string} props.name Le nom à afficher sur la carte.
 * @param {string} props.icon L'URL de l'icône à afficher sur la carte.
 * @param {string} props.unit L'unité de mesure des données à afficher sur la carte.
 * @returns {JSX.Element} Un élément JSX qui représente une carte d'information.
 */
function ItemCard({ data, name, icon, unit }) {
    console.log(data, name, icon, unit);
    return (
        <div className={"card"}>
            <img className={"card__icon"} src={icon} alt={`${name} icon`} />
            <div className={"card__container"}>
                <span className={"card__data"}>{data}{unit}</span>
                <span className={"card__title"}>{name}</span>
            </div>
        </div>
    );
}

ItemCard.propTypes = {
    data: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
};

export default ItemCard;