
import './navigation.scss'

export default function Navigation() {
    return (
        <nav className="nav">
            <img src="/logo.png" alt="Logo" className="nav__logo"/>
            <ul>
                <li><a href="/#">Accueil</a></li>
                <li><a href="/#">Profil</a></li>
                <li><a href="/#">Réglage</a></li>
                <li><a href="/#">Communauté</a></li>
            </ul>
        </nav>
    )
}