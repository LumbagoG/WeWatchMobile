import React from 'react';

/* Icons ionic */
import { home, addCircle, chatbubbles, play, person } from 'ionicons/icons';

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
import './main.css';

/* Ionic imports */
import { 
  IonTabs, IonRouterOutlet, 
  IonTabBar, IonTabButton, 
  IonIcon, IonApp, IonContent, IonSlides, IonSlide, IonButton
} from '@ionic/react';

/* Local imports */
import { Route } from 'react-router';

const slideOpts = {
  initialSlide: 0,
  speed: 400
};

const Main: React.FC = () => {

  return (
    <IonApp>

    <IonContent fullscreen className="ion-padding" scroll-y="false">
          <IonSlides>

            <IonSlide>
              <div className="slide">
                <img src="https://github.com/ionic-team/ionic-docs/blob/master/src/demos/api/slides/slide-1.png?raw=true" alt=''/>
                <h2>Добро пожаловать WeWatch!</h2>
                <p>Откройте для себя общение на новом уровне</p>
              </div>
            </IonSlide>

            <IonSlide>
              <div className="slide">
                <img src="https://github.com/ionic-team/ionic-docs/blob/master/src/demos/api/slides/slide-1.png?raw=true" alt=''/>
                <h2>Добро пожаловать WeWatch!</h2>
                <p>Откройте для себя общение на новом уровне</p>
              </div>
            </IonSlide>

            <IonSlide>
              <div className="slide">
                <img src="https://github.com/ionic-team/ionic-docs/blob/master/src/demos/api/slides/slide-1.png?raw=true" alt=''/>
                <h2>Добро пожаловать WeWatch!</h2>
                <p>Откройте для себя общение на новом уровне</p>
              </div>
            </IonSlide>

            <IonSlide>
              <img src="./slide-4.png" alt=''/>
              <h2>Хочешь общения?</h2>
              <IonButton href='/main/chat' fill="clear">Да</IonButton>
            </IonSlide>

          </IonSlides>
        </IonContent>
    
      

      <IonTabs className='tab'>
        {/* Routs */}
        <IonRouterOutlet>
          <Route path="/main/home" exact={true}/>
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

export default Main;
