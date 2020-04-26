import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";
import "st-ionic";
import "../assets/theme.scss";

@component
export class TemplateName extends st.component implements ILifecycle {

  onIonButtonClick = async () => {

    // https://ionicframework.com/docs/api/action-sheet
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = "Albums";
    actionSheet.buttons = [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        console.log('Delete clicked');
      }
    }, {
      text: 'Share',
      icon: 'share',
      handler: () => {
        console.log('Share clicked');
      }
    }, {
      text: 'Favorite',
      icon: 'heart',
      handler: () => {
        console.log('Favorite clicked');
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];
    document.body.appendChild(actionSheet);
    actionSheet.present();
  };

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
            </ion-buttons>
            <ion-title>TemplateName</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-tabs>
            <ion-tab tab="tab-schedule">
              {/* https://ionicframework.com/docs/api/button */}
              <ion-button onClick={this.onIonButtonClick}>
                <ion-icon slot="start" name="star"></ion-icon>
                Welcome to Ionic 4 with SpringType
              </ion-button>
            </ion-tab>

            <ion-tab tab="tab-map" component="page-map">
              <ion-nav></ion-nav>
            </ion-tab>

            <ion-tab tab="tab-about" component="page-about">
              <ion-nav></ion-nav>
            </ion-tab>

            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="tab-schedule">
                <ion-icon name="calendar"></ion-icon>
                <ion-label>Schedule</ion-label>
                <ion-badge>6</ion-badge>
              </ion-tab-button>

              <ion-tab-button tab="tab-map">
                <ion-icon name="map"></ion-icon>
                <ion-label>Map</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab-about">
                <ion-icon name="information-circle"></ion-icon>
                <ion-label>About</ion-label>
              </ion-tab-button>
            </ion-tab-bar>
          </ion-tabs>
        </ion-content>
      </ion-app>
    );
  }
}

// render the app
st.render(<TemplateName />);
