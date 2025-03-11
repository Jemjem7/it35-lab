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
  IonAvatar,
  IonIcon,
  IonModal
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [showPassword, setShowToast] = useState(false);
  const [showErrorModal, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const user_email = "hehe@gmail.com";
  const user_password = "useruser";

  const doLogin = () => {
    
    if (email === user_email && password === user_password) {
      setShowAlert(true);
       return;
      }else{
    

        console.log(email);
        console.log(password);
      
        setShowToast(true);
        setTimeout(() => {
          navigation.push('/it35-lab/app', 'forward', 'replace');
        },1500);
      }
 
  }



  function togglePasswordVisibility(event: React.MouseEvent<HTMLIonButtonElement>): void {
    throw new Error('Function not implemented.');
  }

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
            <IonLabel position="floating">Email:</IonLabel>
            <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">Password:</IonLabel>
            <IonInput type={showPassword ? "text" : "password"} value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
            <IonButton fill="clear" slot="end" onClick={togglePasswordVisibility}>
              <IonIcon icon={showPassword ? eyeOff : eye} />
            </IonButton>
          </IonItem>

          <IonButton onClick={doLogin} expand="full">
            Login
          </IonButton>
        </div>

        <IonModal isOpen={showErrorModal} onDidDismiss={() => setShowAlert(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Error</IonTitle>
              <IonButton slot="end" onClick={() => setShowAlert(false)}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Email or password not found. Please try again.</p>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Login;
function setShowAlert(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function setShowToast(arg0: boolean) {
  throw new Error('Function not implemented.');
}

