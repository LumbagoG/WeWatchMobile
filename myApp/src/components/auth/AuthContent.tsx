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
import './style.css';

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

function listSocialBtn() {
  const btnIcons = [logoGoogle, logoFacebook, logoTwitter];

  return btnIcons.map((elem, index) =>
    <IonRow className='ion-activatable ripple-parent item-hover-cursor wrapper-btns' color='transparent' key={index}>
        <IonIcon class='auth-btn-social' icon={elem}></IonIcon>
        <IonRippleEffect></IonRippleEffect>
    </IonRow>
  )
}

const AuthContent: React.FC = () => {
  const message = useMessage();
  const auth = useContext(AuthContext);

  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    login: '', password: ''
  });

  // Loggin errors
  useEffect(() => {

    message(error)
    clearError();

  }, [error, message, clearError])

  // state change inputs
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  // fetch to backend
  const loginHandler = async () => {
    try {
      const data = await request('https://wewatch-mobile.herokuapp.com/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
      
    } catch (e) { console.log('Возникла ошибка - ' + e) }
  };

  return (
    <IonApp>
      <IonGrid className='ion-justify-content-center'>
        {/* Title */}
        <IonRow>
          <IonCol>
            <IonTitle className='auth-title-ww ion-text-center'>
              WeWatch
            </IonTitle>
          </IonCol>
        </IonRow>

        {/* SocialsBtn */}
        <IonRow className='auth-container icons ion-justify-content-center ion-align-items-center'>
          {
            listSocialBtn()
          }
        </IonRow>

        {/* Inputs */}
        <IonRow className='auth-container ion-justify-content-center'>
          <IonItem className='auth-items-wrapper-login' color='transparent' lines='none'>
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

          <IonItem className='auth-items-wrapper-pass' color='transparent' lines='none'>
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

        {/* ForgotPassword */}
        <IonRow className='auth-container help'>
            <IonText className='item-hover-cursor'>Забыли пароль?</IonText>
        </IonRow>

        {/* AuthBtn */}
        <IonRow className='auth-container btn-group ion-justify-content-center ion-align-items-center'>
          <IonItem className='wrapper-btn-group' color='transparent' lines='none'>
            
            <IonButton
                fill="solid"
                expand="block"
                style={{color: 'white', width: '100%', height: '70%', margin: 0}}
                onClick={loginHandler}
                disabled={ ((form.login.length && form.password.length) !== 0) ? false : true }
              >Войти</IonButton>

            <IonRippleEffect></IonRippleEffect>

          </IonItem>

          <IonItem href='/reg' className='wrapper-btn-group' color='transparent' lines='none'>
          
            <IonButton
                fill="solid"
                expand="block"
                style={{width: '100%', height: '70%', margin: 0}}
              >Регистрация</IonButton>

            <IonRippleEffect></IonRippleEffect>

          </IonItem>
        </IonRow>
      </IonGrid>

      {/* Footer */}
      <IonFooter className="ion-no-border footer-auth">
        <IonToolbar className='footer-auth-group-text' color='transparent'>

          <IonText color='#fff'>Имеются проблемы? <IonText className='item-hover-cursor' color='primary'>Получить помощь</IonText></IonText>

        </IonToolbar>
      </IonFooter>

    </IonApp>
  );
}

export default AuthContent;