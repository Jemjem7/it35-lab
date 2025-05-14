import { IonButton, IonIcon } from '@ionic/react';
import { heartOutline, heart } from 'ionicons/icons';
import { useState, useEffect } from 'react';

interface ReactionPickerProps {
  onReactionSelect: (reaction: string) => void;
}

const ReactionPicker: React.FC<ReactionPickerProps> = ({ onReactionSelect }) => {
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    // Load saved like state from localStorage
    const saved = localStorage.getItem('reaction_liked');
    return saved === 'true';
  });

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    localStorage.setItem('reaction_liked', newLikedState.toString()); // Save state
    onReactionSelect('like');
  };

  return (
    <div className="reaction-picker">
      <IonButton 
        fill="clear" 
        size="small"
        onClick={handleLike}
        style={{
          '--padding-start': '4px',
          '--padding-end': '4px',
          '--background': 'transparent'
        }}
      >
        <IonIcon 
          icon={isLiked ? heart : heartOutline} 
          style={{ 
            color: isLiked ? '#e91e63' : 'inherit',
            fontSize: '24px',
            transition: 'all 0.2s ease'
          }} 
        />
      </IonButton>
    </div>
  );
};

export default ReactionPicker;
