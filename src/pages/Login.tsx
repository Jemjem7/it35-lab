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
  IonIcon  // Added IonIcon for the eye toggle
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons'; // Importing icons for show/hide password
import { useState } from 'react'; // Importing useState for managing password visibility

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
            <IonInput type={showPassword ? "text" : "password"} /> {/* Toggles password visibility */}
            <IonButton fill="clear" slot="end" onClick={togglePasswordVisibility}>
            <IonIcon icon={showPassword ? eyeOff : eye} /> {/* Changes icon based on visibility state */}
            </IonButton>
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
function setPasswordVisible(arg0: (prevState: any) => boolean) {
  throw new Error('Function not implemented.');
}

