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
  //Hooks
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    login: '', email: '', password: '', repeatPassword: ''
  });
  const [progressBar, setProgressBar] = useState({
    lenght: 0.1, color: 'danger'
  })
  const [agreement, setAgreement] = useState({
    accepted: false
  })

  // Loggin errors
  const regErrors = useEffect(() => {
    message(error)
    clearError();
  }, [error, message, clearError])

  // State progress bar
  const progressBarHandler = useEffect(() => {

    if (form.password.length <= 5)
      setProgressBar({ lenght: 0.1, color: 'danger' })

    else if (form.password.length <= 10)
      setProgressBar({ lenght: 0.5, color: 'warning' })

    else if (form.password.length >= 15)
      setProgressBar({ lenght: 1, color: 'success' })

  }, [form.password.length, progressBar.color, progressBar.lenght])

  // state change inputs
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // State agreement input
  const changeAgreementhandler = (event) => {
    setAgreement({ accepted: event.target.checked })
  }

  // fetch to backend
  const registerHandler = async () => {
    try {

      const data = await request(
        'https://wewatch-mobile.herokuapp.com/api/auth/register',
        'POST',
        { login: form.login, email: form.email, password: form.password }
      );

      message(data.message);

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

        {/* Inputs */}
        <IonRow className='auth-container ion-justify-content-center'>

          <IonItem className='auth-items-wrapper-login' color='transparent' lines='none'>
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

          <IonItem className='auth-items-wrapper-login' color='transparent' lines='none'>
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

          <IonItem className='auth-items-wrapper-pass' color='transparent' lines='none'>
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

          <IonRow className='auth-container help'>

            <IonProgressBar
              className="progress-pass"
              color={progressBar.color}
              value={progressBar.lenght} />

          </IonRow>

          <IonItem className='auth-items-wrapper-pass' color='transparent' lines='none'>
            <IonLabel className="auth-label repeat" position="stacked">Повтор пароля</IonLabel>
            <IonInput
              id="repeatPassword"
              name="repeatPassword"
              className="auth-input"
              type='password'
              value={form.repeatPassword}
              onIonChange={changeHandler}>
            </IonInput>
          </IonItem>
        </IonRow>

        {/* ForgotPassword */}
        <IonRow className='auth-container accept'>

          <IonItem className='reg-accept' color='transparent' lines='none'>
            <IonText className='text-accept'>Я принимаю условия пользовательского соглашения</IonText>
            <IonCheckbox slot="start" value='Pepperoni' onIonChange={changeAgreementhandler} />
          </IonItem>

        </IonRow>

        {/* AuthBtn */}
        <IonRow className='auth-container btn-group ion-justify-content-center ion-align-items-center'>
          <IonItem className='wrapper-btn-group' color='transparent' lines='none'>

            <IonButton
              fill="solid"
              expand="block"
              style={{ color: 'white', width: '100%', height: '70%', margin: 0 }}
              onClick={registerHandler}
              disabled={
                (progressBar.color !== 'danger' && agreement.accepted
                  && (form.repeatPassword === form.password)) ? false : true
              }
            >Зарегистрироваться</IonButton>

            <IonRippleEffect></IonRippleEffect>

          </IonItem>

          <IonItem href='/' className='wrapper-btn-group exit' color='transparent' lines='none'>
            <IonText className='text-accept'><p className='item-hover-cursor text-accept'>Назад</p></IonText>
          </IonItem>

        </IonRow>
      </IonGrid>

      {/* Footer */}
      <IonFooter className="ion-no-border footer-auth">
        <IonToolbar className='footer-auth-group-text' color='transparent'>

          <IonText>Имеются проблемы? <IonText className='item-hover-cursor' color='primary'>Получить помощь</IonText></IonText>

        </IonToolbar>
      </IonFooter>

    </IonApp>
  );
}

export default RegContent;
