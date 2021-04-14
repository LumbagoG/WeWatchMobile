import React, { useEffect, useState } from 'react';

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
  IonApp, IonGrid, IonTitle, IonRow, IonCol,
  IonRippleEffect, IonLabel, IonInput,
  IonItem, IonText, IonFooter, IonToolbar,
  IonProgressBar, IonCheckbox, IonButton
} from '@ionic/react';
import { useMessage } from '../../hooks/message.hook';
import { useHttp } from '../../hooks/http.hook';
import 'materialize-css';

const RegContent: React.FC = () => {
  const message = useMessage();

  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    login: '', email: '', password: ''
  });

  // Debug
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

  let loading = false;

  // state change inputs
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // fetch to backend
  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', { ...form });
      message(data.message);
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


        {/* Inputs */}
        <IonRow class='auth-container'>
          <IonItem class='auth-items-wrapper-login' color='transparent' lines='none'>
            <IonLabel className="auth-label" position="stacked">Логин</IonLabel>
            <IonInput
              id="login"
              name="login"
              className="auth-input"
              type='text'
              value={form.login}
              onIonChange={changeHandler}>
            </IonInput>
          </IonItem>
          <IonItem class='auth-items-wrapper-login' color='transparent' lines='none'>
            <IonLabel className="auth-label" position="stacked">Почта</IonLabel>
            <IonInput
              id="email"
              name="email"
              className="auth-input"
              type='email'
              value={form.email}
              onIonChange={changeHandler}>
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
              onIonChange={changeHandler}>
            </IonInput>
          </IonItem>

          <IonRow class='auth-container help'>
            <IonProgressBar class="progress-pass" color='success' value={0.7}></IonProgressBar><br />
          </IonRow>

          <IonItem class='auth-items-wrapper-pass' color='transparent' lines='none'>
            <IonLabel className="auth-label repeat" position="stacked">Повторите пароль</IonLabel>
            <IonInput className="auth-input" type='password'></IonInput>
          </IonItem>
        </IonRow>
        {/* /Inputs */}

        {/* ForgotPassword */}
        <IonRow class='auth-container accept'>
          <IonItem class='reg-accept' color='transparent' lines='none'>
            <IonText class='text-accept'>Я принимаю условия пользовательского соглашения</IonText>
            <IonCheckbox slot="start" value='Pepperoni' checked={false} />
          </IonItem>
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
                onClick={registerHandler}
                disabled={loading}
              >Зарегистрироваться</IonButton>
              <IonRippleEffect></IonRippleEffect>
            </div>
          </IonItem>
          <IonItem href='/' class='wrapper-btn-group exit' color='transparent' lines='none'>
            <IonText class='text-accept'><p className='item-hover-cursor text-accept'>Назад</p></IonText>
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

export default RegContent;
