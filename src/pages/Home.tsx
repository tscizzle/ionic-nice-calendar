import React, { useReducer } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import _ from "lodash";

import api from "api";
import { User } from "models";

import logo from "assets/images/calendar.svg";

import "./Home.css";

type HomeProps = {};

type HomeState = {
  email: string;
  password: string;
  loginErr: string;
  registerErr: string;
  loggedInUser: User | null;
};

class Home extends React.Component<HomeProps, HomeState> {
  state = {
    email: "",
    password: "",
    loginErr: "",
    registerErr: "",
    loggedInUser: null,
  };

  /* Lifecycle methods. */

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    const loggedInUser = this.state.loggedInUser;
    let username = _.isNull(loggedInUser)
      ? ""
      : (loggedInUser as User).username;
    const shortUsername = _.first(_.split(username, "."));
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Nice Calendar</IonTitle>
            <IonButtons slot="secondary">
              <IonButton>{username.split(".")[0]}</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonImg className="cal-logo" src={logo} alt="" />
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              name="email"
              type="text"
              value={this.state.email}
              onIonChange={(evt) => {
                const inputEle = evt.target as HTMLInputElement;
                this.setState({ email: inputEle.value });
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              name="password"
              type="password"
              value={this.state.password}
              onIonChange={(evt) => {
                const inputEle = evt.target as HTMLInputElement;
                this.setState({ password: inputEle.value });
              }}
            />
          </IonItem>
          <IonButton
            className="ion-margin"
            expand="block"
            onClick={this.attemptLogin}
          >
            Login
          </IonButton>
          {username && (
            <IonCard>
              <IonCardContent>{username}</IonCardContent>
            </IonCard>
          )}
        </IonContent>
      </IonPage>
    );
  }

  /* Helpers. */

  fetchUser = () => {
    api.getLoggedInUser().then(({ user }) => {
      this.setState({ loggedInUser: user || null });
    });
  };

  attemptLogin = () => {
    const { email, password } = this.state;

    api.login({ email, password }).then(({ err }) => {
      if (err) {
        this.setState({ loginErr: err.message });
      } else {
        this.fetchUser();
      }
    });
  };

  attemptRegister = () => {
    const { email, password } = this.state;

    api.register({ email, password }).then(({ err }) => {
      if (err) {
        this.setState({ registerErr: err.message });
      } else {
        this.fetchUser();
      }
    });
  };
}

export default Home;
