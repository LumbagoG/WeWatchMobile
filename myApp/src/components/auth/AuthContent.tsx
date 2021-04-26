import React, {useState, useEffect, useContext} from 'react';

/* Icons ionic */
import { logoGoogle, logoFacebook, logoTwitter } from 'ionicons/icons';

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
  IonApp, IonGrid, IonTitle, IonRow, IonCol,
  IonRippleEffect, IonIcon, IonLabel, IonInput,
  IonItem, IonText, IonFooter, IonToolbar, IonButton
} from '@ionic/react';

/* Any imports */
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import 'materialize-css';

function listSocialBtn() {
  const btnIcons = [logoGoogle, logoFacebook, logoTwitter];

  return btnIcons.map((elem, index) =>
    <IonItem color='transparent' lines='none' key={index}>
      <div className="ion-activatable ripple-parent item-hover-cursor">
        <IonIcon class='auth-btn-social' icon={elem}></IonIcon>
        <IonRippleEffect></IonRippleEffect>
      </div>
    </IonItem>
  )
}

const AuthContent: React.FC = () => {
  const message = useMessage();
  const auth = useContext(AuthContext);

  const { request, error, clearError, loading } = useHttp();
  const [form, setForm] = useState({
    login: '', password: ''
  });

  // Debug
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

  // state change inputs
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // fetch to backend
  const loginHandler = async () => {
    try {
      const data = await request('https://wewatch-mobile.herokuapp.com/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) { }
  };

  return (
    <IonApp>
      <IonGrid>

        {/* Title */}
        <IonRow class='ion-justify-content-center'>
          <IonCol>
            <IonTitle class='auth-title-ww ion-text-center'>
              WeWatch
              </IonTitle>
          </IonCol>
        </IonRow>
        {/* /Title */}


        {/* SocialsBtn */}
        <IonRow class='auth-container icons'>
          {listSocialBtn()}
        </IonRow>
        {/* /SocialsBtn */}

        {/* Inputs */}
        <IonRow class='auth-container'>
          <IonItem class='auth-items-wrapper-login' color='transparent' lines='none'>
            <IonLabel className="auth-label" position="stacked">Логин</IonLabel>
            <IonInput
              id="login"
              name="login" 
              className="auth-input" 
              type='email'
              value={form.login}
              onIonChange={changeHandler}
            > 
            </IonInput>
          </IonItem>

          <IonItem class='auth-items-wrapper-pass' color='transparent' lines='none'>
            <IonLabel className="auth-label" position="stacked">Пароль</IonLabel>
            <IonInput 
              id="password"
              name="password"
              className="auth-input" 
              type='password'
              value={form.password}
              onIonChange={changeHandler}
              >
            </IonInput>
          </IonItem>
        </IonRow>
        {/* /Inputs */}


        {/* ForgotPassword */}
        <IonRow class='auth-container help'>
          <IonText>
            <p className='item-hover-cursor'>Забыли пароль?</p>
          </IonText>
        </IonRow>
        {/* /ForgotPassword */}


        {/* AuthBtn */}
        <IonRow class='auth-container btn-group'>
          <IonItem class='wrapper-btn-group' color='transparent' lines='none'>
            <div className="ion-activatable ripple-parent btn-auth item-hover-cursor">
            <IonButton
                fill="clear"
                expand="block"
                style={{color: 'white', width: '100%'}}
                onClick={loginHandler}
                disabled={loading}
              >Войти</IonButton>

              <IonRippleEffect></IonRippleEffect>
            </div>
          </IonItem>
          <IonItem href='/reg' class='wrapper-btn-group' color='transparent' lines='none'>
            <div className="ion-activatable ripple-parent btn-reg item-hover-cursor">
              <IonText>Регистрация</IonText>
              <IonRippleEffect></IonRippleEffect>
            </div>
          </IonItem>
        </IonRow>
      </IonGrid>
      {/* /AuthBtn */}


      {/* Footer */}
      <IonFooter className="ion-no-border footer-auth">
        <IonToolbar className='footer-auth-group-text' color='transparent'>

          <p>Имеются проблемы? <IonText className='item-hover-cursor' color='primary'>Получить помощь</IonText></p>

        </IonToolbar>
      </IonFooter>
      {/* /Footer */}

    </IonApp>
  );
}

export default AuthContent;
