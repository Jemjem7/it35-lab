import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonTextarea,
  } from '@ionic/react';
  import { close, send } from 'ionicons/icons';
  import { useState } from 'react';
  
  interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: any; // Add this to show avatar
    onPostCreated?: (newPost: any) => void; // Optional callback
  }
  
  const CreatePostModal: React.FC<CreatePostModalProps> = ({
    isOpen,
    onClose,
    user,
    onPostCreated,
  }) => {
    const [content, setContent] = useState('');
  
    const handleSubmit = () => {
      // Example only - replace with your actual post logic
      const newPost = {
        content,
        user,
        createdAt: new Date(),
      };
  
      // Call parent to refresh feed, if needed
      onPostCreated?.(newPost);
  
      // Clear and close
      setContent('');
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
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <IonAvatar>
                  <img
                    alt="avatar"
                    src={
                      user?.user_metadata?.avatar_url ||
                      'https://ionicframework.com/docs/img/demos/avatar.svg'
                    }
                  />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonTextarea
                  placeholder="What's on your mind?"
                  value={content}
                  onIonChange={(e) => setContent(e.detail.value!)}
                  autoGrow
                />
              </IonCol>
              <IonCol size="auto" className="ion-align-self-end">
                <IonButton onClick={handleSubmit} shape="round">
                  <IonIcon icon={send} slot="icon-only" />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    );
  };
  
  export default CreatePostModal;
  