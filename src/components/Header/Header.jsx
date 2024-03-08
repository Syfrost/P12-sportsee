import './Header.scss';
import PropTypes from 'prop-types';

/**
 * Header is a React component that displays a greeting message with the user's first name.
 *
 * @param {Object} props The properties passed to the Header component.
 * @param {string} props.firstName The first name of the user to be displayed in the greeting message.
 * @returns {JSX.Element} A JSX element that represents a greeting message.
 */

export default function Header({firstName = ''}) {
    return (
        <header>
            <h1>
                Bonjour <span>{firstName}</span>
            </h1>
        </header>
    )
}

Header.propTypes = {
    firstName: PropTypes.string
};