import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './Favorites.css';

// Add more visually striking and inspiring favorites
const artImages = [
  {
    src: 'https://i.postimg.cc/3wL8b6yB/berserk.jpg',
    title: 'Berserk by Kentaro Miura',
    link: 'https://en.wikipedia.org/wiki/Berserk_(manga)'
  },
  {
    src: 'https://i.postimg.cc/8z8wQw8y/onepiece.jpg',
    title: 'One Piece by Eiichiro Oda',
    link: 'https://onepiece.fandom.com/wiki/Eiichiro_Oda'
  },
  {
    src: 'https://i.postimg.cc/3Jw6kQ2d/kimjunggi.jpg',
    title: 'Kim Jung Gi',
    link: 'https://www.kimjunggi.net/'
  },
  {
    src: 'https://i.postimg.cc/3x3QzSGq/gawxart.jpg',
    title: 'Gawx Art',
    link: 'https://www.instagram.com/gawx_art/?hl=en'
  },
  {
    src: 'https://i.postimg.cc/3Nw2yQw8/akira.jpg',
    title: 'Akira by Katsuhiro Otomo',
    link: 'https://en.wikipedia.org/wiki/Akira_(manga)'
  },
  {
    src: 'https://i.postimg.cc/3Jw6kQ2d/loish.jpg',
    title: 'Loish',
    link: 'https://www.instagram.com/loisvb/'
  }
];

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>🌟 Favorites Gallery 🌟</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="favorites-bg">
        <div className="favorites-container">
          <h2 className="favorites-header gradient-text">Legendary Inspirations</h2>
          <p className="favorites-description">
            Dive into a world of creativity! These manga and artists have shaped the way I see art and storytelling. <br />
            <span className="favorites-quote">“Art enables us to find ourselves and lose ourselves at the same time.” – Thomas Merton</span>
          </p>
          <div className="favorites-grid awesome-grid">
            {artImages.map((item, index) => (
              <div key={index} className="favorite-item awesome-item">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.title}'s page`}
                >
                  <img
                    src={item.src || 'https://via.placeholder.com/200x220?text=No+Image'}
                    alt={item.title}
                    className="favorite-image awesome-image"
                  />
                </a>
                <p className="favorite-title awesome-title">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="favorites-footer">
            <p>✨ Want to suggest an artist or manga? <a href="mailto:youremail@example.com">Contact me!</a> ✨</p>
          </div>
        </div>
        {/* Subtle animated background effect */}
        <div className="favorites-bg-effect"></div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
