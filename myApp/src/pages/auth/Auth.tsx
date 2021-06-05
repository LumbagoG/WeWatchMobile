import React from 'react';

/* Icons ionic */
import { } from 'ionicons/icons';

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
  IonApp, IonRouterOutlet
} from '@ionic/react';

/* React imports */
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Local imports */
import Main from '../home/Main';
import AuthContent from '../../components/auth/AuthContent';
import RegContent from '../../components/auth/RegContent';
import Chat from '../chat/Chat';
import Profile from '../profile/Profile';

export const Auth = (isAunteficated: boolean) => {
  if (isAunteficated) {
    return (
      <IonApp>

        {/* Rout */}
        <IonReactRouter>
          
            <Route path='/main' component={Main} />
            <Route path='/main/chat' component={Chat} />
            <Route path='/main/profile' component={Profile} />
            
            <Route render={() => <Redirect to='/main/home'/>}/>

        </IonReactRouter>
        {/* /Rout main page */}

      </IonApp>
    ); 
  } else {
    return (
      <IonApp>

        {/* Rout */}
        <IonReactRouter>
          <IonRouterOutlet>

            <Route path='/' component={AuthContent}/>
            <Route path='/reg' component={RegContent}/>
            <Route render={() => <Redirect to='/'/>}/>

          </IonRouterOutlet>
        </IonReactRouter>
        {/* /Rout main page */}

      </IonApp>
    );
  }
}
