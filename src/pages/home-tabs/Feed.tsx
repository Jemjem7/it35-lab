import { 
  IonButtons,
    IonContent, //
    IonHeader, //
    IonMenuButton, 
    IonPage, //
    IonTitle, //
    IonToolbar, //
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,

} from '@ionic/react';

const Feed: React.FC = () => {
  const feedData = [

    { id: 1, user: "Unknown", content: "Just uploaded a new manga artwork!", time: "8 hours ago" },
    { id: 2, user: "Unknown", content: "Added new project!", time: "1 hour ago" },
    { id: 3, user: "Unknown", content: "edited a project!", time: "8 mins ago" },
    { id: 4, user: "Unknown", content: "visit my repo!", time: "1 day ago" },
    { id: 5, user: "Unknown", content: "check my new security project!", time: "3 days ago " },


   ]
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {feedData.map((item) => (
            <IonItem key={item.id}>
              <IonAvatar slot="start">
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9da77e3b?d=identicon&f=y" />
              </IonAvatar>
              <IonLabel>
                <h2>{item.user}</h2>
                <p>{item.content}</p>
                <p>{item.time}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          Feed
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;