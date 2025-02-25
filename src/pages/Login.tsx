import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonInput,
  IonItem,
  IonLabel,
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonText,
  useIonRouter,
  IonAvatar
} from '@ionic/react';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center ion-justify-content-center">
        <div className="login-form">


        <IonAvatar className="ion-margin-bottom">
         <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </IonAvatar>


          <IonItem>
            <IonLabel position="floating">Username:</IonLabel>
            <IonInput type="text" />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">Password:</IonLabel>
            <IonInput type="password" />
          </IonItem>
          
          <IonButton onClick={doLogin} expand="full">
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
