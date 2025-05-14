import React, { useState } from 'react';
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
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText
} from '@ionic/react';

interface WikiResult {
  title: string;
  snippet: string;
  pageId: number;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WikiResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchText: string) => {
    setQuery(searchText);
    if (!searchText.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          searchText
        )}&utf8=&format=json&origin=*`
      );
      const data = await response.json();

      if (data.query && data.query.search) {
        setResults(
          data.query.search.map((item: any) => ({
            title: item.title,
            snippet: item.snippet,
            pageId: item.pageid
          }))
        );
      } else {
        setResults([]);
      }
    } catch (err) {
      setError('Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Test Search Bar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          placeholder="Type here..."
          value={query}
          onIonInput={e => handleSearch(e.detail.value!)}
        />
        
        {loading && (
          <IonSpinner name="crescent" />
        )}

        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonList>
          {results.map(result => (
            <IonItem key={result.pageId}>
              <IonLabel>
                <h2>{result.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Search;
