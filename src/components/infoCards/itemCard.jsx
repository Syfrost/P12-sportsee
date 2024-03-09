import PropTypes from 'prop-types';

/**
 * ItemCard is a React component that displays an information card.
 * Each card contains an icon, a name, a unit of measurement, and a data value.
 *
 * @param {Object} props The properties passed to the ItemCard component.
 * @param {number} props.data The data value to be displayed on the card. This value is obtained from the API.
 * @param {string} props.name The name to be displayed on the card.
 * @param {string} props.icon The URL of the icon to be displayed on the card.
 * @param {string} props.unit The unit of measurement of the data to be displayed on the card.
 * @returns {JSX.Element} A JSX element that represents an information card.
 */
function ItemCard({ data, name, icon, unit }) {
    //console.log(data, name, icon, unit); //debug line to check the values of the props
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