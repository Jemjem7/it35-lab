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
  const artImages = [
    {
      src: 'https://i.postimg.cc/Znd1M0V1/vagabond.jpg',
      title: 'Vagabond',
      link: null
    },
    {
      src: 'https://i.postimg.cc/jdKLj7TX/kimjunggi.jpg',
      title: 'Kim Jung Gi',
      link: null
    },
    {
      src: 'https://i.postimg.cc/mr9XNY2R/gawxart.jpg',
      title: 'Gawx Art',
      link: 'https://www.instagram.com/gawx_art/?hl=en'
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: '16px' }}>
          <h2 style={{ textAlign: 'center' }}>My Favorite Manga/Artists</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px',
              marginTop: '20px'
            }}
          >
            {artImages.map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    />
                  </a>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  />
                )}
                <p
                  style={{
                    marginTop: '8px',
                    fontWeight: 'bold',
                    color: '#fff'
                  }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
