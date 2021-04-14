import React from 'react';

/* Icons ionic */
// import { logoGoogle, logoFacebook, logoTwitter } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../../theme/variables.css';

/* Ionic imports */
import {
  IonApp, IonText
} from '@ionic/react';

const Auth: React.FC = () => {
  return (
    <IonApp>
        <IonText>Страница не найдена</IonText>
    </IonApp>
  );
}

export default Auth;
