import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { PlayerEditor } from './pages/PlayerEditor';
import { Weapons } from './pages/Weapons';
import { Vehicles } from './pages/Vehicles';
import { Missions } from './pages/Missions';
import { Garages } from './pages/Garages';
import { Settings } from './pages/Settings';
import { General } from './pages/General';
import { Fixes } from './pages/Fixes';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'general':
        return <General />;
      case 'player':
        return <PlayerEditor />;
      case 'weapons':
        return <Weapons />;
      case 'vehicles':
        return <Vehicles />;
      case 'missions':
        return <Missions />;
      case 'garages':
        return <Garages />;
      case 'fixes':
        return <Fixes />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppLayout>
  );
}

export default App;

