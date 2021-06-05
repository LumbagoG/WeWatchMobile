import { IonApp, IonAvatar, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { addCircle, chatbubbles, ellipsisHorizontal, ellipsisVertical, home, person, play } from 'ionicons/icons';
import React from 'react'
import { Route, useHistory } from 'react-router';
import { useAuth } from '../../hooks/auth.hook';

import './Profile.css'

const Profile: React.FC = () => {
  const [present] = useIonActionSheet();

  const history = useHistory();
  const auth = useAuth();

  const logoutHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    auth.logout();
    history.push('/')
  }
  return (
    <IonApp>
      <IonToolbar
        color="var(--ion-background-body-color)"
        className="chat-toolbar"
      >

        <IonButtons slot="primary">
          <IonButton
            onClick={() =>
              present({
                buttons: [
                  { text: "Создать комнату" },
                  { text: "Создать чат" },
                  { text: "Закрыть" },
                ],
                header: "Действия",
              })
            }
          >
            <IonIcon
              slot="icon-only"
              ios={ellipsisHorizontal}
              md={ellipsisVertical}
            />
          </IonButton>
        </IonButtons>

        <IonTitle>Профиль</IonTitle>
      </IonToolbar>

      <IonContent
        className="chat-rooms-wrapper"
        scrollEvents={ true }
        onIonScrollStart={() => { }}
        onIonScroll={() => { }}
        onIonScrollEnd={() => { }}
        fullscreen>

        <IonHeader translucent no-border>
          <IonImg src='/images/profile/accaunt.jpg' />
          
        </IonHeader>

        <IonContent className="ion-justify-content-center" fullscreen >

          <IonItem className="profile-top">
          
            
            
          </IonItem>
          
              

              
          <IonButton onClick={ logoutHandler } slot='end' expand="full" color="danger">Выйти</IonButton>

            
        </IonContent>

      </IonContent>

      {/*-- Tabs wrapper --*/}
      <IonContent className="tabs-wrapper">
        <IonTabs className="tab">

          {/* Routs */}
          <IonRouterOutlet>
            <Route path="/main/home" />
            <Route path="/main/play" />
            <Route path="/main/add" />
            <Route path="/main/chat" />
            <Route path="/main/profile" />
          </IonRouterOutlet>

          {/* Bottom tabs */}
          <IonTabBar class="tab-bar" slot="bottom">
            <IonTabButton class="tab-button" tab="home" href="/main/home">
              <IonIcon class="tab-icon" icon={home} />
            </IonTabButton>
            <IonTabButton class="tab-button" tab="play" href="/main/video">
              <IonIcon class="tab-icon" icon={play} />
            </IonTabButton>
            <IonTabButton class="tab-button" tab="add" href="/main/add">
              <IonIcon class="tab-icon" icon={addCircle} />
            </IonTabButton>
            <IonTabButton class="tab-button" tab="chat" href="/main/chat">
              <IonIcon class="tab-icon" icon={chatbubbles} />
            </IonTabButton>
            <IonTabButton class="tab-button" tab="profile" href="/main/profile">
              <IonIcon class="tab-icon" icon={person} />
            </IonTabButton>
          </IonTabBar>
        
        </IonTabs>
      </IonContent>
    </IonApp>
  )
}

export default Profile;