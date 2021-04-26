import React, { useState, useEffect } from 'react';

/* Icons ionic */
import { home, addCircle, chatbubbles, play, person, search, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

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
  IonTabs, IonRouterOutlet,
  IonTabBar, IonTabButton,
  IonIcon, IonApp, IonToolbar, IonTitle, IonButtons, IonButton
} from '@ionic/react';

/* Socet.io import */
import socketIOClient from "socket.io-client";

/* Local imports */
import { Route } from 'react-router';


const Chat: React.FC = () => {
  const ENDPOINT = `http://localhost:${window.location.port}`

  const [message, setMessage] = useState('')

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)

    socket.on('chat message', msg => {
      setMessage(msg)
    })
  }, [ENDPOINT])

  console.log(message);

  return (
    <IonApp>
      <IonToolbar>
        <IonButtons slot="secondary">
          <IonButton>
            <IonIcon slot="icon-only" icon={search} />
          </IonButton>
        </IonButtons>

        <IonButtons slot="primary">
          <IonButton>
            <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
          </IonButton>
        </IonButtons>

        <IonTitle>Чаты</IonTitle>
      </IonToolbar>

      <IonTabs className='tab'>
        {/* Routs */}
        <IonRouterOutlet>
          <Route path="/main/home" exact={true} />
          <Route path="/main/play" exact={true} />
          <Route path="/main/add" exact={true} />
          <Route path="/main/chat" exact={true} />
          <Route path="/main/profile" exact={true} />
        </IonRouterOutlet>
        {/* /Routs */}

        {/* Bottom tabs */}
        <IonTabBar class='tab-bar' slot="bottom">
          <IonTabButton class='tab-button' tab="home" href="/main/home">
            <IonIcon class='tab-icon' icon={home} />
          </IonTabButton>
          <IonTabButton class='tab-button' tab="play" href="/main/video">
            <IonIcon class='tab-icon' icon={play} />
          </IonTabButton>
          <IonTabButton class='tab-button' tab="add" href="/main/add">
            <IonIcon class='tab-icon' icon={addCircle} />
          </IonTabButton>
          <IonTabButton class='tab-button' tab="chat" href="/main/chat">
            <IonIcon class='tab-icon' icon={chatbubbles} />
          </IonTabButton>
          <IonTabButton class='tab-button' tab="profile" href="/main/profile">
            <IonIcon class='tab-icon' icon={person} />
          </IonTabButton>
          {/* /Bottom tabs */}

        </IonTabBar>
      </IonTabs>
    </IonApp>

  );
}

export default Chat;
