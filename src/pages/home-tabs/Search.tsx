import { 
  IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,

} from '@ionic/react';

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
         
      <IonGrid>
      <IonRow className="ion-justify-content-center">

            <IonCol size="12" sizeMd="8" sizeLg="6" className="ion-padding">
            <IonSearchbar 
              placeholder="Search"
              debounce={0} // Optional: Optional debounce for input delay
              showClearButton="focus"
              
       
               />
             </IonCol>
          </IonRow>
        </IonGrid>
       
      </IonContent>
    </IonPage>
  );
};

export default Search;