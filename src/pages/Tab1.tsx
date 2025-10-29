import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import Dashboard from '../components/dashboard/DashboardContainer';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">DashBoard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Dashboard/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
