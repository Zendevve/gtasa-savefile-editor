import React from 'react';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />

      <main className="flex-1 relative w-full min-w-0 flex flex-col">
        <div className="border-4 border-black bg-white p-4 lg:p-8 shadow-[8px_8px_0px_0px_#000] lg:shadow-[12px_12px_0px_0px_#000] flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};
