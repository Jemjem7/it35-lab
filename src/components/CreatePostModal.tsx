import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTextarea,
  IonButton,
  IonButtons,
  IonIcon,
  IonImg
} from '@ionic/react';
import { close, image } from 'ionicons/icons';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

// Handle Feed Creation (Uploading image and inserting into database)
const handleFeedCreate = async (post: { content: string; image: string | null }) => {
  try {
    let imageUrl = null;
    
    // If an image is selected, upload it to Supabase Storage
    if (post.image) {
      const fileName = `feeds/${Date.now()}_${Math.random()}.jpg`;
      const { data, error: uploadError } = await supabase
        .storage
        .from('feed-images')  // Assuming your bucket name is 'feed-images'
        .upload(fileName, post.image, { contentType: 'image/jpeg' });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL of the uploaded image
      imageUrl = supabase.storage.from('feed-images').getPublicUrl(data.path).data.publicUrl;
    }

    // Insert the feed item into the 'create_post_modal' table
    const { error: dbError } = await supabase
      .from('create_post_modal')
      .insert([
        {
          user_id: 1, // Replace with actual user ID
          username: 'John Doe', // Replace with actual username
          avatar_url: 'some-avatar-url', // Replace with actual avatar URL
          post_content: post.content,
          post_created_at: new Date().toISOString(),
          post_updated_at: new Date().toISOString(),
          image_url: imageUrl, // Add the image URL to the post
        },
      ]);

    if (dbError) {
      console.error('Error inserting post:', dbError.message);
      return;
    }

  } catch (error) {
    console.error('Error during feed creation:', error);
  }
};

// Define the CreatePostModal component
const CreatePostModal: React.FC<{ isOpen: boolean; onClose: () => void; onPostCreate: (post: { content: string; image: string | null }) => void }> = ({
  isOpen,
  onClose,
  onPostCreate
}) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (postContent.trim() !== '' || selectedImage) {
      onPostCreate({
        content: postContent,
        image: selectedImage,
      });
    }
    setPostContent('');
    setSelectedImage(null);
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
          value={postContent}
          onIonChange={e => setPostContent(e.detail.value!)}
          rows={4}
          autoGrow
        />

        {selectedImage && (
          <IonImg src={selectedImage} className="ion-margin-top" />
        )}

        <div className="ion-margin-top">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <IonButton fill="clear" onClick={() => document.getElementById('image-upload')?.click()}>
            <IonIcon icon={image} slot="start" />
            Add Photo
          </IonButton>
        </div>

        <IonButton expand="block" onClick={handleSubmit} className="ion-margin-top">
          Post
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

// Export the CreatePostModal component
export default CreatePostModal;
