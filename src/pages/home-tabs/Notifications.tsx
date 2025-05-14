import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonText
} from '@ionic/react';

const Notifications: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonAvatar slot="start">
            </IonAvatar>
            <IonLabel>
              <h2>Anonymous</h2>
              <p>Liked your post</p>
              <IonText color="medium">
                <p>2 hours ago</p>
              </IonText>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notifications; 