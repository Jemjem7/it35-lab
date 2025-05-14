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

  const handlePostCreate = (post: { content: string; image: string | null }) => {
    // Handle the post creation here, for example, add it to the feed or call an API to save it
    console.log('New post created:', post);
    // Close the modal after post is created
    setShowCreatePost(false);
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
          onPostCreate={handlePostCreate} // Pass the function here
        />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
