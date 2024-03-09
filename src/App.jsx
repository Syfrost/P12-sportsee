import './App.scss'
import Header from "./components/Header/Header.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import SideNav from "./components/SideNav/SideNav.jsx";
import DailyActivity from "./components/DailyActivity/DailyActivity.jsx";
import Performance from "./components/Performance/Performance.jsx";
import Score from "./components/Score/Score.jsx";
import AverageSessions from "./components/AverageSessions/AverageSessions.jsx";
import InfoCards from "./components/infoCards/infoCards.jsx";
import { useParams } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
function App() {
    const { userId } = useParams();
    const userIdNumber = Number(userId);

    return (
    <>
        <Navigation />
        <SideNav />
        <div className="main-container">
            <main>
                <Header initialUserId={userIdNumber}/>
                <h1 className={"notification"}>Félicitation ! Vous avez explosé vos objectifs hier 👏</h1>
                <DailyActivity initialUserId={userIdNumber}/>
                <Performance initialUserId={userIdNumber}/>
                <Score initialUserId={userIdNumber} />
                <AverageSessions initialUserId={userIdNumber} />
                <InfoCards initialUserId={userIdNumber} />
            </main>
        </div>
    </>
  )
}

export default App
