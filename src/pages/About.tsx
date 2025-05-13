import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import { school, code, brush, heart } from 'ionicons/icons';
import './About.css';

const About: React.FC = () => {
  return (
    <IonPage className="about-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding about-content">
        <div className="background-overlay"></div>
        <IonCard className="glass-card">
          <IonCardHeader>
            <IonCardTitle>Welcome to My Profile</IonCardTitle>
            <IonCardSubtitle>Student & Developer</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Hello! I'm a passionate student at NBSC, diving deep into the world of technology and creativity.</p>
          </IonCardContent>
        </IonCard>

        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard className="glass-card">
                <IonCardHeader>
                  <IonIcon icon={school} size="large" color="primary" />
                  <IonCardTitle>Education</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Currently pursuing my studies at NBSC, where I'm developing my skills in programming and technology.</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard className="glass-card">
                <IonCardHeader>
                  <IonIcon icon={code} size="large" color="success" />
                  <IonCardTitle>Programming</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Passionate about coding and learning new technologies. Always excited to take on new programming challenges!</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard className="glass-card">
                <IonCardHeader>
                  <IonIcon icon={brush} size="large" color="warning" />
                  <IonCardTitle>Design & Arts</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>I have a deep appreciation for arts and design. Love exploring creative expressions through various mediums.</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard className="glass-card">
                <IonCardHeader>
                  <IonIcon icon={heart} size="large" color="danger" />
                  <IonCardTitle>Interests</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Combining my love for technology and creativity to build meaningful and beautiful digital experiences.</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;