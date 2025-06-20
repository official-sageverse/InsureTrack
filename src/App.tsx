import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Bell, Menu, X, MessageSquare } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PolicyList from './components/PolicyList';
import PolicyForm from './components/PolicyForm';
import SMSSettings from './components/SMSSettings';
import { usePolicies } from './hooks/usePolicies';
import { Policy } from './types/policy';

type View = 'dashboard' | 'policies';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSMSSettingsOpen, setIsSMSSettingsOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | undefined>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { policies, addPolicy, updatePolicy, deletePolicy } = usePolicies();

  // Listen for custom events to open policy form and SMS settings
  useEffect(() => {
    const handleOpenPolicyForm = () => {
      handleAddPolicy();
    };

    const handleOpenSMSSettings = () => {
      setIsSMSSettingsOpen(true);
    };

    window.addEventListener('openPolicyForm', handleOpenPolicyForm);
    window.addEventListener('openSMSSettings', handleOpenSMSSettings);
    
    return () => {
      window.removeEventListener('openPolicyForm', handleOpenPolicyForm);
      window.removeEventListener('openSMSSettings', handleOpenSMSSettings);
    };
  }, []);

  const handleAddPolicy = () => {
    setEditingPolicy(undefined);
    setIsFormOpen(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setEditingPolicy(policy);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (policyData: Omit<Policy, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPolicy) {
      updatePolicy(editingPolicy.id, policyData);
    } else {
      addPolicy(policyData);
    }
    setIsFormOpen(false);
    setEditingPolicy(undefined);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPolicy(undefined);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'policies', label: 'Policies', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:w-64 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-white">InsureTrack</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as View);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-4 text-left transition-all duration-200 group rounded-xl mb-2 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-5 w-5 mr-4 transition-transform duration-200 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span className="font-medium text-base">{item.label}</span>
              </button>
            );
          })}
          
          {/* SMS Settings Button */}
          <button
            onClick={() => {
              setIsSMSSettingsOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center px-4 py-4 text-left transition-all duration-200 group text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl mb-2"
          >
            <MessageSquare className="h-5 w-5 mr-4 transition-transform duration-200 group-hover:scale-105" />
            <span className="font-medium text-base">SMS Settings</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium">InsureTrack v1.0</p>
            <p className="text-xs text-gray-400 mt-1">Policy Management System</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 backdrop-blur-sm bg-opacity-95 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {currentView === 'dashboard' ? 'Dashboard' : 'Policy Management'}
                </h1>
              </div>
              
              {/* Mobile title */}
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">
                  {currentView === 'dashboard' ? 'Dashboard' : 'Policies'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* SMS Settings Button - Desktop */}
              <button
                onClick={() => setIsSMSSettingsOpen(true)}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-green-200 shadow-sm hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
              >
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">SMS Settings</span>
                <span className="sm:hidden">SMS</span>
              </button>
              
              {/* SMS Settings Button - Mobile */}
              <button
                onClick={() => setIsSMSSettingsOpen(true)}
                className="md:hidden p-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full border border-green-200 shadow-sm hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
              
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-blue-200 shadow-sm">
                <span className="hidden sm:inline">
                  {policies.length} {policies.length === 1 ? 'Policy' : 'Policies'}
                </span>
                <span className="sm:hidden">{policies.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 pb-20 sm:pb-6">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'policies' && (
            <PolicyList
              policies={policies}
              onEdit={handleEditPolicy}
              onDelete={deletePolicy}
              onAdd={handleAddPolicy}
            />
          )}
        </main>
      </div>

      {/* Policy Form Modal */}
      <PolicyForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        policy={editingPolicy}
        mode={editingPolicy ? 'edit' : 'create'}
      />

      {/* SMS Settings Modal */}
      <SMSSettings
        isOpen={isSMSSettingsOpen}
        onClose={() => setIsSMSSettingsOpen(false)}
      />
    </div>
  );
}

export default App;