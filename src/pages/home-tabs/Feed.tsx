import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';
import FeedContainer from '../../components/feedContainer';
import { useState } from 'react';
import CreatePostModal from '../../components/CreatePostModal';

const Feed: React.FC = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handlePostCreate = () => {
    // Logic to handle post creation
    console.log('Post Created');
    setShowCreatePost(false);  // Close the modal after creating a post
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <FeedContainer />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowCreatePost(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <CreatePostModal 
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onPostCreate={handlePostCreate}  // Pass the handler here
        />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
