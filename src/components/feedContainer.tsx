import { useState, useEffect } from 'react';
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput,
  IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon,
  IonPopover, IonSpinner, IonToast, IonTextarea, IonSearchbar, IonAlert
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, send, ellipsisVertical } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editContent, setEditContent] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });
  const [showDeleteAlert, setShowDeleteAlert] = useState<{ open: boolean; postId: string | null }>({ open: false, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser(authData.user);
        const { data: userData } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };

    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('pinned', { ascending: false })
        .order('post_created_at', { ascending: false });
      setPosts(data || []);
    };

    (async () => {
      await fetchUser();
      await fetchPosts();
      setIsLoading(false);
    })();
  }, []);

  const createPost = async () => {
    if (!postContent.trim() || !user || !username) return;

    const { data: userData } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data } = await supabase
      .from('posts')
      .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (data) {
      setPosts([data[0], ...posts]);
      setToastMessage('Post created!');
      setPostContent('');
      setIsModalOpen(false);
    }
  };

  const deletePost = async (post_id: string) => {
    setPosts(posts.filter(post => post.post_id !== post_id));
    await supabase.from('posts').delete().match({ post_id });
    setToastMessage('Post deleted!');
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setEditContent(post.post_content);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    if (!editingPost) return;
    await supabase
      .from('posts')
      .update({ post_content: editContent, post_updated_at: new Date().toISOString() })
      .match({ post_id: editingPost.post_id });

    setPosts(posts.map(post =>
      post.post_id === editingPost.post_id
        ? { ...post, post_content: editContent, post_updated_at: new Date().toISOString() }
        : post
    ));
    setIsModalOpen(false);
    setEditingPost(null);
    setIsEditing(false);
    setToastMessage('Post updated!');
  };

  return (
    <IonContent fullscreen className="ion-padding">
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        color="success"
        onDidDismiss={() => setToastMessage('')}
      />
      <IonAlert
        isOpen={showDeleteAlert.open}
        header="Delete Post"
        message="Are you sure you want to delete this post?"
        buttons={[
          { text: 'Cancel', role: 'cancel', handler: () => setShowDeleteAlert({ open: false, postId: null }) },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              if (showDeleteAlert.postId) deletePost(showDeleteAlert.postId);
              setShowDeleteAlert({ open: false, postId: null });
            }
          }
        ]}
        onDidDismiss={() => setShowDeleteAlert({ open: false, postId: null })}
      />

      {user ? (
        <>
          <IonCard>
            <IonCardHeader>
              <IonSearchbar />
              <IonCardTitle>Create a Post</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              <IonButton expand="block" onClick={() => { setIsModalOpen(true); setIsEditing(false); }}>Create New Post</IonButton>
            </IonCardContent>
          </IonCard>

          {isLoading ? (
            <IonSpinner name="crescent" />
          ) : (
            posts.map(post => (
              <IonCard key={post.post_id}>
                <IonCardHeader>
                  <IonRow>
                    <IonCol size="auto">
                      <IonAvatar>
                        <img src={post.avatar_url} alt={post.username} />
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonCardTitle>{post.username}</IonCardTitle>
                      <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                    </IonCol>
                    <IonCol size="auto">
                      <IonButton
                        fill="clear"
                        onClick={e => setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })}
                      >
                        <IonIcon icon={ellipsisVertical} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>

                <IonCardContent>
                  <IonText><p>{post.post_content}</p></IonText>
                </IonCardContent>

                <IonPopover
                  isOpen={popoverState.open && popoverState.postId === post.post_id}
                  event={popoverState.event}
                  onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                >
                  <IonButton fill="clear" onClick={() => { openEditModal(post); setPopoverState({ open: false, event: null, postId: null }); }}>
                    <IonIcon icon={pencil} slot="start" /> Edit
                  </IonButton>
                  <IonButton fill="clear" color="danger" onClick={() => { setShowDeleteAlert({ open: true, postId: post.post_id }); setPopoverState({ open: false, event: null, postId: null }); }}>
                    <IonIcon icon={trash} slot="start" /> Delete
                  </IonButton>
                </IonPopover>
              </IonCard>
            ))
          )}

          {/* Create/Edit Modal */}
          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>{isEditing ? 'Edit Post' : 'New Post'}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonTextarea
                value={isEditing ? editContent : postContent}
                onIonChange={e => isEditing ? setEditContent(e.detail.value!) : setPostContent(e.detail.value!)}
                autoGrow
                placeholder="What's on your mind?"
                style={{ margin: 16 }}
              />
            </IonContent>
            <IonFooter>
              <IonButton expand="block" onClick={isEditing ? saveEdit : createPost}>
                {isEditing ? 'Save Changes' : 'Post'}
              </IonButton>
              <IonButton expand="block" fill="clear" onClick={() => { setIsModalOpen(false); setIsEditing(false); }}>Cancel</IonButton>
            </IonFooter>
          </IonModal>
        </>
      ) : (
        <IonSpinner name="dots" />
      )}
    </IonContent>
  );
};

export default FeedContainer;
