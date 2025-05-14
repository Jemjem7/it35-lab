import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonIcon
} from '@ionic/react';
import { useState } from 'react';
import { informationCircleOutline } from 'ionicons/icons';
import './Details.css'; // Add custom CSS file for styling

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
    if (inputValue.trim() !== '') {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
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
        <div className="details-container">
          <h2 className="section-title">App Development</h2>
          <div className="detail-section">
            <h3 className="sub-title">What is App Development?</h3>
            <p className="section-text">
              App development involves creating software applications for various devices, 
              including smartphones, tablets, and desktops. It requires understanding 
              programming languages, user interface design, and user experience principles.
            </p>
            <IonButton expand="block" onClick={handleButtonClick}>
              {showMore ? 'Show Less' : 'Show More'}
            </IonButton>

            {showMore && (
              <div className="additional-details">
                <h4 className="additional-title">Steps in App Development</h4>
                <ul className="details-list">
                  <li>Planning: Defining the app's purpose and functionality.</li>
                  <li>Designing: Creating wireframes, mockups, and UI/UX.</li>
                  <li>Developing: Writing the code and implementing features.</li>
                  <li>Testing: Debugging and ensuring quality assurance.</li>
                  <li>Launching: Deploying the app on relevant platforms.</li>
                  <li>Maintaining: Updating and improving the app post-launch.</li>
                </ul>
              </div>
            )}
          </div>

          <h2 className="section-title">Ionic Framework</h2>
          <div className="detail-section">
            <h3 className="sub-title">Overview of Ionic</h3>
            <p className="section-text">
              Ionic is an open-source framework used for building cross-platform mobile applications 
              using web technologies such as HTML, CSS, and JavaScript. It allows developers to create 
              apps that work on multiple platforms with a single codebase.
            </p>
            <IonButton expand="block" onClick={handleButtonClick}>
              {showMore ? 'Show Less' : 'Show More'}
            </IonButton>

            {showMore && (
              <div className="additional-details">
                <h4 className="additional-title">Features of Ionic</h4>
                <ul className="details-list">
                  <li>Cross-platform: Write once, deploy everywhere (iOS, Android, Web).</li>
                  <li>Native Features: Access to native device features like camera, GPS, etc.</li>
                  <li>Rich UI: Pre-built UI components that match the platform’s design guidelines.</li>
                  <li>Extensible: Can integrate with third-party libraries and services.</li>
                  <li>Community Support: Large community with plenty of resources.</li>
                </ul>
              </div>
            )}
          </div>

          <IonItem className="input-item">
            <IonLabel position="floating">Enter your thoughts:</IonLabel>
            <IonInput
              value={inputValue}
              onIonInput={handleInputChange}
              placeholder="Type here..."
              className="input-field"
            />
          </IonItem>

          <IonButton expand="block" onClick={handleToast} className="show-toast-btn">
            Show Toast
          </IonButton>

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={`You entered: ${inputValue}`}
            duration={2000}
            position="top"
            color="primary"
            className="toast-message"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Details;
