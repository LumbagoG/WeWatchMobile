import * as React from "react";

/* Icons ionic */
import {
  home,
  addCircle,
  chatbubbles,
  play,
  person,
  ellipsisHorizontal,
  ellipsisVertical,
  chevronDownCircleOutline,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Styles imports */
import "../../theme/variables.css";
import "./chat.css";

/* Ionic imports */
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonApp,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonText,
  useIonActionSheet,
  IonImg,
} from "@ionic/react";

import { RefresherEventDetail } from "@ionic/core";

/* Socet.io import */
import socketIOClient from "socket.io-client";

/* Local imports */
import { Route } from "react-router";

import rooms from '../../data/rooms';
import IonReactNav from "../../components/chat/IonReactNav";
import RoomDetail from '../../components/chat/RoomDetail';

const Chat: React.FC = () => {
  const ENDPOINT = `http://localhost:${window.location.port}`;

  const [room, setRoom] = React.useState(rooms[0])
  const [present] = useIonActionSheet();
  const [message, setMessage] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredSearch, setFilteredSearch] = React.useState([
    ...rooms
  ]);

  //Refresher
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Комнаты обновляются");

    setTimeout(() => {
      console.log("Комнаты были обновлены!");
      event.detail.complete();
    }, 2000);
  }

  //Socet IO
  React.useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("chat message", (msg) => {
      setMessage(msg);
      console.log(message);
    });
  }, [ENDPOINT, message]);


  //Filtering searchsearch rooms
  React.useEffect(() => {
    let tempSearchResult = rooms.filter((ele) =>
      ele.title.includes(searchQuery)
    );

    if (filteredSearch.length === 0) setFilteredSearch([...rooms])
    console.log(filteredSearch);

    setFilteredSearch([...tempSearchResult]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <IonApp>

        {/* Custon nav */}
        <IonReactNav detail={() => <RoomDetail {...room} />}>

          {/*-- First chat toolbar --*/}
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

            <IonTitle>Чаты</IonTitle>
          </IonToolbar>

          {/*-- Second chat toolbar --*/}
          <IonToolbar
            color="var(--ion-background-body-color)"
            className="search-toolbar"
          >
            <IonButtons>
              <IonSearchbar
                color="var(--ion-background-body-color)"
                className="search-toolbar"
                placeholder="Поиск комнат"
                value={searchQuery}
                onIonChange={(e) => setSearchQuery(e.detail.value)}
              />
            </IonButtons>
          </IonToolbar>

          {/*-- Chat rooms wrapper --*/}
          <IonContent
            className="chat-rooms-wrapper"
            scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}
            fullscreen
          >
            {/*-- Custom Refresher Content --*/}
            <IonRefresher style={{ background: 'none !important'}} slot="fixed" onIonRefresh={doRefresh}>
              <IonRefresherContent
                style={{ background: 'none !important'}}
                pullingIcon={chevronDownCircleOutline}
                pullingText="Потяните вниз для обновления"
                refreshingSpinner="bubbles"
                refreshingText="Обновление..."
              />
            </IonRefresher>

            {/*-- Chat rooms list --*/}
            
              
            <IonContent>
              <IonGrid className="chat-rooms-list">
                <IonRow>
                  
                    <IonCol
                      size="12"
                      size-xs="12"
                      size-sm="12"
                      size-md="12"
                      size-lg="12"
                    >
                      <IonList>

                        {/*-- Item room --*/}
                        {filteredSearch.map((roomItem, i) => (
                        
                          <IonItem 
                            button 
                            key={i} 
                            onClick={ () => setRoom(rooms[i])} 
                            className="ion-react-nav-detail-btn">
                              { console.log(i , room)}
                          
                            <img style={{ width: '3em', marginRight: '1em' }} src="/images/rooms/general-room.png" alt="" />
                          
                            <IonLabel>
                              <IonText>{roomItem.title}</IonText>
                            </IonLabel>
                          </IonItem>
                        ))}

                      </IonList>
                    </IonCol>
                 

                  {/*-- Chat rooms modal --*/}
                  <IonCol className="ion-text-center">
                    <IonModal isOpen={showModal} cssClass="my-custom-class ion-text-center">
                      <IonText></IonText>
                      <IonButton
                        color="secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Закрыть
                      </IonButton>
                    </IonModal>
                    <IonButton color="primary" onClick={() => setShowModal(true)}>
                      Больше информации
                    </IonButton>
                  </IonCol>

                </IonRow>
              </IonGrid>
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
        
        </IonReactNav>
    </IonApp>
  );
};

export default Chat;