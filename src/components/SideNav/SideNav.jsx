import './sidenav.scss'
import activityOne from '../../assets/navicon.svg';
import activityTwo from '../../assets/navicon2.svg';
import activityThree from '../../assets/navicon3.svg';
import activityFour from '../../assets/navicon4.svg';
export default function SideNav() {
    return (
        <aside className="nav-side">
        <nav>
            <ul>
                <li><a href="/#"><img src={activityOne} alt="Accueil" /></a></li>
                <li><a href="/#"><img src={activityTwo} alt="Accueil" /></a></li>
                <li><a href="/#"><img src={activityThree} alt="Accueil" /></a></li>
                <li><a href="/#"><img src={activityFour} alt="Accueil" /></a></li>
            </ul>
        </nav>
        </aside>
    )
}