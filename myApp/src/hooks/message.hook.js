import {useCallback} from 'react';

import {useIonToast} from '@ionic/react';

export const useMessage = () => {
  const [present] = useIonToast();

  return useCallback(text => {

    if (text) 
      present({
        color: 'dark',
        position: 'top',
        message: text,
        onDidDismiss: () => console.log(`Предупреждение - ${text}`),
        onWillDismiss: () => console.log(`Предупреждение закрыто - ${text}`),
        duration: 2000
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};