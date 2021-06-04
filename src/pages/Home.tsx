import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
} from "@ionic/react";

import { User } from "models";
import api from "api";

import "./Home.css";

class Home extends React.Component {
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
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonInput
            name="email"
            type="text"
            value={this.state.email}
            onIonChange={(evt) => {
              const inputEle = evt.target as HTMLInputElement;
              this.setState({ email: inputEle.value });
            }}
          />
          <IonInput
            name="password"
            type="password"
            value={this.state.password}
            onIonChange={(evt) => {
              const inputEle = evt.target as HTMLInputElement;
              this.setState({ password: inputEle.value });
            }}
          />
          <IonButton onClick={this.attemptLogin}>Login</IonButton>
          {JSON.stringify(this.state.loggedInUser)}
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
