import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonText,
  IonTextarea,
  IonToast,
  useIonToast
} from '@ionic/react';
import {
  chatbubbleOutline,
  heartOutline,
  heart,
  trashOutline,
  createOutline,
  flameOutline,
  flame,
  snowOutline,
  snow,
  happyOutline,
  happy,
  sadOutline,
  sad
} from 'ionicons/icons';
import { useState } from 'react';
import { Post, postService } from '../services/postService';

interface PostCardProps {
  post: Post;
  currentUserId: string;
  onPostUpdated: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUserId, onPostUpdated }) => {
  const [showReactionPopover, setShowReactionPopover] = useState(false);
  const [showCommentPopover, setShowCommentPopover] = useState(false);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [showToast] = useIonToast();

  const handleReaction = async (reactionType: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry') => {
    try {
      const currentReaction = post.userReactions[currentUserId];
      if (currentReaction === reactionType) {
        await postService.removeReaction(post.id, currentUserId);
      } else {
        await postService.addReaction(post.id, currentUserId, reactionType);
      }
      onPostUpdated();
    } catch (error) {
      showToast({
        message: 'Failed to update reaction',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      await postService.addComment(post.id, currentUserId, 'Current User', comment);
      setComment('');
      setShowCommentPopover(false);
      onPostUpdated();
    } catch (error) {
      showToast({
        message: 'Failed to add comment',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  const handleDeletePost = async () => {
    try {
      await postService.deletePost(post.id);
      onPostUpdated();
    } catch (error) {
      showToast({
        message: 'Failed to delete post',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  const handleUpdatePost = async () => {
    try {
      await postService.updatePost(post.id, editedContent);
      setIsEditing(false);
      onPostUpdated();
    } catch (error) {
      showToast({
        message: 'Failed to update post',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
    }
  };

  const getReactionIcon = (type: string, isActive: boolean) => {
    switch (type) {
      case 'like':
        return isActive ? heart : heartOutline;
      case 'love':
        return isActive ? flame : flameOutline;
      case 'haha':
        return isActive ? happy : happyOutline;
      case 'wow':
        return isActive ? snow : snowOutline;
      case 'sad':
        return isActive ? sad : sadOutline;
      default:
        return heartOutline;
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{post.username}</IonCardSubtitle>
        <IonCardTitle>{new Date(post.createdAt).toLocaleString()}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        {isEditing ? (
          <div>
            <IonTextarea
              value={editedContent}
              onIonChange={e => setEditedContent(e.detail.value!)}
              rows={3}
              autoGrow
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <IonButton fill="clear" onClick={() => setIsEditing(false)}>Cancel</IonButton>
              <IonButton onClick={handleUpdatePost}>Save</IonButton>
            </div>
          </div>
        ) : (
          <>
            <IonText>{post.content}</IonText>
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt="Post" 
                style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }} 
              />
            )}
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <IonButton fill="clear" onClick={() => setShowReactionPopover(true)}>
            <IonIcon icon={heartOutline} slot="start" />
            {Object.values(post.reactions).reduce((a, b) => a + b, 0)}
          </IonButton>

          <IonButton fill="clear" onClick={() => setShowCommentPopover(true)}>
            <IonIcon icon={chatbubbleOutline} slot="start" />
            {post.comments.length}
          </IonButton>

          {post.userId === currentUserId && (
            <div>
              <IonButton fill="clear" onClick={() => setIsEditing(true)}>
                <IonIcon icon={createOutline} />
              </IonButton>
              <IonButton fill="clear" onClick={handleDeletePost}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </div>
          )}
        </div>

        <IonPopover
          isOpen={showReactionPopover}
          onDidDismiss={() => setShowReactionPopover(false)}
        >
          <IonList>
            {['like', 'love', 'haha', 'wow', 'sad', 'angry'].map((reaction) => (
              <IonItem
                key={reaction}
                button
                onClick={() => handleReaction(reaction as any)}
              >
                <IonIcon
                  icon={getReactionIcon(
                    reaction,
                    post.userReactions[currentUserId] === reaction
                  )}
                  slot="start"
                />
                <IonLabel>{reaction}</IonLabel>
                <IonLabel slot="end">{post.reactions[reaction as keyof typeof post.reactions]}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonPopover>

        <IonPopover
          isOpen={showCommentPopover}
          onDidDismiss={() => setShowCommentPopover(false)}
        >
          <IonList>
            {post.comments.map((comment) => (
              <IonItem key={comment.id}>
                <IonLabel>
                  <h2>{comment.username}</h2>
                  <p>{comment.content}</p>
                  <p>{new Date(comment.createdAt).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem>
              <IonTextarea
                placeholder="Add a comment..."
                value={comment}
                onIonChange={e => setComment(e.detail.value!)}
                rows={2}
              />
              <IonButton slot="end" onClick={handleComment}>Post</IonButton>
            </IonItem>
          </IonList>
        </IonPopover>
      </IonCardContent>
    </IonCard>
  );
};

export default PostCard; 