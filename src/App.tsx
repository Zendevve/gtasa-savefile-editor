import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'player':
        return <div className="text-white">Player Editor (Coming Soon)</div>;
      case 'weapons':
        return <div className="text-white">Weapons Editor (Coming Soon)</div>;
      case 'vehicles':
        return <div className="text-white">Vehicles Editor (Coming Soon)</div>;
      case 'missions':
        return <div className="text-white">Missions Viewer (Coming Soon)</div>;
      case 'garages':
        return <div className="text-white">Garages Editor (Coming Soon)</div>;
      case 'settings':
        return <div className="text-white">Settings (Coming Soon)</div>;
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
