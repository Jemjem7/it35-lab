import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTextarea,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/react';
import { close, send } from 'ionicons/icons';
import { useState } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // TODO: Implement post creation
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Post</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonTextarea
          placeholder="What's on your mind?"
          value={content}
          onIonChange={e => setContent(e.detail.value!)}
          autoGrow
        />
        <IonButton expand="block" onClick={handleSubmit}>
          <IonIcon icon={send} slot="start" />
          Post
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default CreatePostModal; 