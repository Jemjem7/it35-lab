import { useState, useEffect } from 'react';
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput,
  IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon,
  IonPopover, IonSpinner, IonToast, IonTextarea, IonSearchbar, IonAlert, IonList, IonItem, IonButtons
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, send, ellipsisVertical, heartOutline, heart, chatbubbleOutline, sendOutline } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
  likes?: number;
  comments?: any[];
  pinned?: boolean;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [activePost, setActivePost] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
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
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('post_created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setToastMessage('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await fetchUser();
      await fetchPosts();
    })();
  }, []);

  const handleLike = async (postId: number) => {
    try {
      const post = posts.find(p => p.post_id === postId.toString());
      if (!post) return;

      const currentLikes = post.likes || 0;
      const { error } = await supabase
        .from('posts')
        .update({ likes: currentLikes + 1 })
        .eq('post_id', postId.toString());

      if (error) throw error;

      setPosts(posts.map(p => 
        p.post_id === postId.toString() 
          ? { ...p, likes: (p.likes || 0) + 1 }
          : p
      ));
    } catch (error) {
      console.error('Error liking post:', error);
      setToastMessage('Failed to like post');
    }
  };

  const handleComment = async (postId: number) => {
    if (!newComment.trim()) return;

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('User not authenticated');

      const { data: profileData } = await supabase
        .from('users')
        .select('user_id, username, user_avatar_url')
        .eq('user_email', userData.user.email)
        .single();

      if (!profileData) throw new Error('User profile not found');

      const comment = {
        id: Date.now(),
        user: {
          name: profileData.username,
          avatar: profileData.user_avatar_url || 'https://i.pravatar.cc/150?img=1'
        },
        content: newComment,
        timestamp: new Date().toLocaleString()
      };

      const post = posts.find(p => p.post_id === postId.toString());
      if (!post) return;

      const currentComments = post.comments || [];
      const { error } = await supabase
        .from('posts')
        .update({ 
          comments: [...currentComments, comment]
        })
        .eq('post_id', postId.toString());

      if (error) throw error;

      setPosts(posts.map(p =>
        p.post_id === postId.toString()
          ? { ...p, comments: [...(p.comments || []), comment] }
          : p
      ));

      setNewComment('');
      setActivePost(null);
    } catch (error) {
      console.error('Error adding comment:', error);
      setToastMessage('Failed to add comment');
    }
  };

  const createPost = async () => {
    if (!postContent.trim()) return;

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('User not authenticated');

      const { data: profileData } = await supabase
        .from('users')
        .select('user_id, username, user_avatar_url')
        .eq('user_email', userData.user.email)
        .single();

      if (!profileData) throw new Error('User profile not found');

      const newPost = {
        user_id: profileData.user_id,
        username: profileData.username,
        avatar_url: profileData.user_avatar_url || 'https://i.pravatar.cc/150?img=1',
        post_content: postContent
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setPosts([data, ...posts]);
        setPostContent('');
        setToastMessage('Post created successfully!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setToastMessage('Failed to create post');
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

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setEditContent(post.post_content);
    setIsModalOpen(true);
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
    setToastMessage('Post updated!');
  };

  if (isLoading) {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner />
      </div>
    );
  }

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
          { text: 'Delete', role: 'destructive', handler: () => { if (showDeleteAlert.postId) deletePost(showDeleteAlert.postId); setShowDeleteAlert({ open: false, postId: null }); } }
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
                      <IonIcon icon={sendOutline} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {posts.length === 0 ? (
            <div className="ion-text-center">
              <IonText color="medium">
                <p>No posts yet. Be the first to post!</p>
              </IonText>
            </div>
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <IonButton fill="clear" onClick={() => handleLike(parseInt(post.post_id))}>
                      <IonIcon icon={(post.likes || 0) > 0 ? heart : heartOutline} color={(post.likes || 0) > 0 ? 'danger' : 'medium'} />
                      <IonText>{post.likes || 0}</IonText>
                    </IonButton>
                    <IonButton fill="clear" onClick={() => setActivePost(activePost === parseInt(post.post_id) ? null : parseInt(post.post_id))}>
                      <IonIcon icon={chatbubbleOutline} />
                      <IonText>{post.comments?.length || 0}</IonText>
                    </IonButton>
                  </div>

                  {activePost === parseInt(post.post_id) && (
                    <div className="ion-margin-top">
                      <IonList>
                        {post.comments.map(comment => (
                          <IonItem key={comment.id}>
                            <IonAvatar slot="start">
                              <img src={comment.user.avatar} alt={comment.user.name} />
                            </IonAvatar>
                            <IonLabel>
                              <h3>{comment.user.name}</h3>
                              <p>{comment.content}</p>
                              <p><small>{comment.timestamp}</small></p>
                            </IonLabel>
                          </IonItem>
                        ))}
                      </IonList>

                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <IonTextarea
                          placeholder="Write a comment..."
                          value={newComment}
                          onIonChange={e => setNewComment(e.detail.value!)}
                          rows={1}
                          autoGrow
                        />
                        <IonButtons>
                          <IonButton onClick={() => handleComment(parseInt(post.post_id))}>
                            <IonIcon icon={sendOutline} />
                          </IonButton>
                        </IonButtons>
                      </div>
                    </div>
                  )}
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
                  <IonButton fill="clear" onClick={() => { togglePinPost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>
                    {post.pinned ? 'Unpin' : 'Pin'}
                  </IonButton>
                </IonPopover>
              </IonCard>
            ))
          )}

          {/* Edit Modal */}
          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit Post</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonTextarea
                value={editContent}
                onIonChange={e => setEditContent(e.detail.value!)}
                autoGrow
                style={{ margin: 16 }}
              />
            </IonContent>
            <IonFooter>
              <IonButton expand="block" onClick={saveEdit}>Save</IonButton>
              <IonButton expand="block" fill="clear" onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
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