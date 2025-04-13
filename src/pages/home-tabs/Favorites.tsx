import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

const Favorites: React.FC = () => {
  const animeImages = [
    {
      src: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', // replace with your own URL
      title: 'Naruto'
    },
    {
      src: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
      title: 'One Piece'
    },
    {
      src: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
      title: 'Attack on Titan'
    },
    {
      src: 'https://cdn.myanimelist.net/images/anime/11/39717.jpg',
      title: 'Death Note'
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          <h2 style={{ textAlign: 'center' }}>My Favorite Manga/Anime</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
            marginTop: '20px'
          }}>
            {animeImages.map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <img 
                  src={item.src} 
                  alt={item.title} 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
                />
                <p style={{ marginTop: '8px', fontWeight: 'bold' }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
