import './App.scss'
import Header from "./components/Header/Header.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import SideNav from "./components/SideNav/SideNav.jsx";
import DailyActivity from "./components/DailyActivity/DailyActivity.jsx";
import Performance from "./components/Performance/Performance.jsx";
import Score from "./components/Score/Score.jsx";
import AverageSessions from "./components/AverageSessions/AverageSessions.jsx";
import InfoCards from "./components/infoCards/infoCards.jsx";
import { useState, useEffect } from 'react';
import {getUserActivity, getUserInfo, getUserPerformance, getUserAverageSessions} from './services/apiService';


function App({ initialUserId }) {
    // eslint-disable-next-line no-unused-vars
    const [userId, setUserId] = useState(initialUserId);
    const [firstName, setFirstName] = useState('');
    const [userPerformance, setUserPerformance] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [userKeyData, setUserKeyData] = useState({});
    const [userActivity, setUserActivity] = useState([]);
    const [userSessionAverage, setUserSessionAverage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const performanceData = await getUserPerformance(userId);
                if (performanceData && performanceData.data && performanceData.data.data) {
                    setUserPerformance(performanceData.data.data);
                } else {
                    console.log('Données de sessions non trouvées');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des performances de l\'utilisateur:', error);
            }

            try {
                const userInfo = await getUserInfo(userId);
                if (userInfo && userInfo.data) {
                    const score = userInfo.data.todayScore || userInfo.data.score;
                    setUserScore(score);
                    setUserKeyData(userInfo.data.keyData);
                    setFirstName(userInfo.data.userInfos.firstName);
                } else {
                    console.log('Données de l\'utilisateur non trouvées');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            }

            try {
                const activityData = await getUserActivity(userId);
                if (activityData && activityData.data && activityData.data.sessions) {
                    setUserActivity(activityData.data.sessions);
                } else {
                    console.log('Données d\'activité non trouvées');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données d\'activité:', error);
            }

            try {
                const averageSessionsData = await getUserAverageSessions(userId);
                if (averageSessionsData && averageSessionsData.data && averageSessionsData.data.sessions) {
                    setUserSessionAverage(averageSessionsData.data.sessions);
                } else {
                    console.log('Données de sessions moyennes non trouvées');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des sessions moyennes:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
    <>
        <Navigation />
        <SideNav />
        <div className="main-container">
            <main>
                <Header firstName={firstName}/>
                <h1 className={"notification"}>Félicitation ! Vous avez explosé vos objectifs hier 👏</h1>
                <DailyActivity userActivity={userActivity} />
                <Performance userPerformance={userPerformance}/>
                <Score score={userScore}/>
                <AverageSessions userSessionAverage={userSessionAverage} />
                <InfoCards userKeyData={userKeyData} />
            </main>
        </div>
    </>
  )
}

export default App
