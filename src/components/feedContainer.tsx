import { useState, useEffect } from 'react';
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput,
  IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon,
  IonPopover, IonSpinner, IonToast, IonTextarea, IonSearchbar
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, send, ellipsisVertical, searchCircle } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
  pinned: boolean; 
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });
  
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
    }
  };

  const deletePost = async (post_id: string) => {
    setPosts(posts.filter(post => post.post_id !== post_id));
    await supabase.from('posts').delete().match({ post_id });
    setToastMessage('Post deleted!');
  };

  const togglePinPost = async (post_id: string) => {
    const postToUpdate = posts.find(post => post.post_id === post_id);
    if (!postToUpdate) return;

    const newPinnedState = !postToUpdate.pinned; 

    setPosts(posts.map(post => 
      post.post_id === post_id ? { ...post, pinned: newPinnedState } : post
    ));

    
    await supabase
      .from('posts')
      .update({ pinned: newPinnedState })
      .match({ post_id });

      const { data } = await supabase
      .from('posts')
      .select('*')
      .order('pinned', { ascending: false })
      .order('post_created_at', { ascending: false });
    
    setPosts(data || []);
  };

  return (
    <IonContent fullscreen className="ion-padding">
      {user ? (
        <>
          <IonCard>
            <IonCardHeader>
              <IonSearchbar />
              <IonCardTitle>Create a Post</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto">
                    <IonAvatar>
                      <img alt="avatar" src={user.user_metadata?.avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg'} />
                    </IonAvatar>
                  </IonCol>
                  <IonCol>
                    <IonTextarea
                      value={postContent}
                      onIonChange={e => setPostContent(e.detail.value!)}
                      placeholder="What's on your mind?"
                      autoGrow
                    />
                  </IonCol>
                  <IonCol size="auto" className="ion-align-self-end">
                    <IonButton onClick={createPost} shape="round">
                      <IonIcon icon={send} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {isLoading ? (
            <IonSpinner name="crescent" />
          ) : (
            posts.map(post => (
              <IonCard key={post.post_id} className="animate__animated animate__fadeInUp">
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
                  <IonText>
                    <p>{post.post_content}</p>
                  </IonText>

                  {/* Pin Button */}
                  <IonRow className="ion-justify-content-center ion-padding-vertical">
                    <IonButton fill="clear" onClick={() => togglePinPost(post.post_id)}>
                      {post.pinned ? 'Unpin' : 'Pin'}
                    </IonButton>
                  </IonRow>
                </IonCardContent>

                <IonPopover
                  isOpen={popoverState.open && popoverState.postId === post.post_id}
                  event={popoverState.event}
                  onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                >
                  <IonButton fill="clear" onClick={() => { setPopoverState({ open: false, event: null, postId: null }); }}>Edit</IonButton>
                  <IonButton fill="clear" color="danger" onClick={() => { deletePost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>Delete</IonButton>
                  <IonButton fill="clear" onClick={() => { togglePinPost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>
                    {post.pinned ? 'Unpin' : 'Pin'}
                  </IonButton>
                </IonPopover>
              </IonCard>
            ))
          )}
        </>
      ) : (
        <IonSpinner name="dots" />
      )}
    </IonContent>
  );
};

export default FeedContainer;