import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

const Details: React.FC = () => {
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Details</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <div style={{ padding: '20px' }}>
        <h2>About App Development</h2>
        <p>
          App development involves creating software applications for various devices, 
          including smartphones, tablets, and desktops. In today's digital world, mobile 
          applications have become essential tools for businesses and individuals alike.
        </p>
        <h2>About Ionic Framework</h2>
        <p>
          Ionic is an open-source framework used for building cross-platform mobile applications 
          using web technologies such as HTML, CSS, and JavaScript. With Ionic, developers can 
          create mobile apps that work seamlessly on iOS, Android, and the web from a single codebase.
        </p>
      </div>
    </IonContent>
  </IonPage>
);
};

export default Details;
