import React from "react";

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  useIonActionSheet,
  IonIcon,
} from "@ionic/react";

import { ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import Iframe from 'react-iframe'
interface RoomDetailProps {
  id: number;
  title: string;
  detail: string;
  icon: string;
}

const RoomDetail: React.FC<RoomDetailProps> = ({
  id,
  title,
  detail,
  icon,
}) => {
  const [present] = useIonActionSheet();
  
  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar
            color="var(--ion-background-body-color)"
            className="chat-toolbar"
          >
            <IonButtons slot="primary">
              <IonButton
                onClick={() =>
                  present({
                    buttons: [
                      { text: "Поделиться" },
                      { text: "Обновить" },
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

            <IonButtons slot="start">
            <IonBackButton defaultHref="/main/chat"></IonBackButton>
          </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
      </IonHeader>

      {/* Content room page */}
      
        <Iframe url="https://getstream.github.io/website-react-examples/social-messenger/"
          width="100%"
          height="100%"
          id="myId"
          frameBorder={2}
          />
      

    </React.Fragment>
  );
};

export default RoomDetail;
