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
    history.push('/');
    window.location.reload();
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
                  { text: "Изменить профиль" },
                  { text: "Настройки" },
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

      <IonContent fullscreen slot="fixed" >
        <div className="card">
          <div className="header">
            <div className="avatar">
              <img src="/images/profile/gleb.jpg" alt="" />
            </div>
            </div>
            <div className="card-body">
              <div className="user-meta ion-text-center">
                <h3 className="playername">daddy-dan</h3>
                <h5 className="country">daddy-dan</h5>
              </div>

              <IonButton onClick={logoutHandler} expand="full" color="danger">Выйти</IonButton>

            </div>
          </div>
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