import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonLabel, 
  IonMenuButton, 
  IonPage, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, notificationsOutline, searchOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';

import Feed from './home-tabs/Feed';
import Notifications from './home-tabs/Notifications';
import Search from './home-tabs/Search';  // Import Search component


const Home: React.FC = () => {
  const tabs = [
    {name:'Feed', tab:'feed', url: '/it35-lab/app/home/feed', icon: homeOutline},
    {name:'Notifications', tab:'notifications', url: '/it35-lab/app/home/notifications', icon: notificationsOutline},
    {name: 'Search', tab: 'search', url: '/it35-lab/app/home/search', icon: searchOutline} // Add search tab
 
  ];
  
  return (
    <IonReactRouter>
      <IonTabs>
        <IonTabBar slot="bottom">
          {tabs.map((item, index) => (
            <IonTabButton key={index} tab={item.tab} href={item.url}>
              <IonIcon icon={item.icon} />
              <IonLabel>{item.name}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
        <IonRouterOutlet>
          <Route exact path="/it35-lab/app/home/feed" component={Feed} />
          <Route exact path="/it35-lab/app/home/notifications" component={Notifications} />
          <Route exact path="/it35-lab/app/home/search" component={Search} />  {/* Add Search route */}
          <Route exact path="/it35-lab/app/home">
            <Redirect to="/it35-lab/app/home/feed" />
          </Route>
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Home;