import { Home, BookOpen, Gamepad2, BookMarked, User, ShoppingBag, Crown } from 'lucide-react';

const BottomNavigation = ({ activeTab, setActiveTab, isPremium, onUpgradeClick }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'stories', label: 'Stories', icon: BookMarked },
    { id: 'store', label: 'Store', icon: ShoppingBag, premium: true },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleTabClick = (tab) => {
    if (!isPremium && tab.premium) {
      onUpgradeClick();
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 z-40" style={{borderColor: '#210F37'}}>
      <div className="flex justify-around items-center py-2 px-4 max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isLocked = !isPremium && tab.premium;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors relative ${
                isActive 
                  ? 'text-white' 
                  : isLocked
                  ? 'text-gray-400'
                  : 'hover:text-white'
              }`}
              style={isActive ? {backgroundColor: '#210F37', color: 'white'} : {color: '#210F37'}}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
              {isLocked && (
                <Crown className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
