import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonToggle,
  IonToast,
  IonIcon
} from '@ionic/react';
import { useState } from 'react';
import { informationCircleOutline } from 'ionicons/icons';

const Details: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  const handleButtonClick = () => {
    setShowMore(!showMore);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
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

          <IonButton expand="full" onClick={handleButtonClick}>
            {showMore ? 'Show Less' : 'Show More'}
          </IonButton>

          {showMore && (
            <div style={{ marginTop: '20px' }}>
              <h3>Additional Details</h3>
              <p>
                App development is a multi-step process that involves planning, design, coding, testing,
                and maintenance. It requires both technical skills and creative abilities to create user-friendly
                and functional applications.
              </p>
            </div>
          )}

          <h2>About Ionic Framework</h2>
          <p>
            Ionic is an open-source framework used for building cross-platform mobile applications
            using web technologies such as HTML, CSS, and JavaScript. With Ionic, developers can
            create mobile apps that work seamlessly on iOS, Android, and the web from a single codebase.
          </p>

          <IonItem>
            <IonLabel position="floating">Enter something:</IonLabel>
            <IonInput
              value={inputValue}
              onIonInput={handleInputChange}
              placeholder="Type here..."
            />
          </IonItem>

          <IonButton expand="block" onClick={handleToast}>
            Show Toast
          </IonButton>

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={`You entered: ${inputValue}`}
            duration={2000}
            position="top"
            color="primary"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Details;
