import './Header.scss';
export default function Header({firstName = ''}) {
    return (
        <header>
            <h1>
                Bonjour <span>{firstName}</span>
            </h1>
        </header>
    )
}