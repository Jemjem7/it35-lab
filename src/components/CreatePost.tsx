import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonTextarea,
  IonToast,
  useIonToast
} from '@ionic/react';
import { imageOutline } from 'ionicons/icons';
import { useState } from 'react';
import { postService } from '../services/postService';

interface CreatePostProps {
  userId: string;
  username: string;
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ userId, username, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [showToast] = useIonToast();

  const handleSubmit = async () => {
    if (!content.trim()) {
      showToast({
        message: 'Please enter some content',
        duration: 2000,
        position: 'top',
        color: 'warning'
      });
      return;
    }

    try {
      await postService.createPost(userId, username, content, imageUrl);
      setContent('');
      setImageUrl(undefined);
      onPostCreated();
      showToast({
        message: 'Post created successfully!',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
    } catch (error) {
      showToast({
        message: 'Failed to create post',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, we'll just create a local URL for the image
      // In a real app, you'd upload this to a server
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonTextarea
          placeholder="What's on your mind?"
          value={content}
          onIonChange={e => setContent(e.detail.value!)}
          rows={3}
          autoGrow
          style={{ marginBottom: '10px' }}
        />
        
        {imageUrl && (
          <div style={{ marginBottom: '10px' }}>
            <img 
              src={imageUrl} 
              alt="Preview" 
              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} 
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <IonButton fill="clear" color="medium">
                <IonIcon icon={imageOutline} slot="start" />
                Add Image
              </IonButton>
            </label>
          </div>
          
          <IonButton onClick={handleSubmit} color="primary">
            Post
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CreatePost; 