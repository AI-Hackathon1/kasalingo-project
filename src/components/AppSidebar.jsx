import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  BookMarked, 
  User, 
  Crown,
  BarChart3,
  Users,
  ShoppingBag
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter
} from './ui/sidebar';
import { Button } from './ui/button';

export function AppSidebar({ activeTab, setActiveTab, isPremium, onUpgradeClick }) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'stories', label: 'Stories', icon: BookMarked },
  ];

  const premiumItems = [
    { id: 'store', label: 'Cultural Store', icon: ShoppingBag, premium: true },
    { id: 'progress', label: 'Progress Tracker', icon: BarChart3, premium: true },
    { id: 'family', label: 'Family Profiles', icon: Users, premium: true },
  ];

  const profileItems = [
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <Sidebar className="border-r-4" style={{borderColor: '#210F37'}}>
      <SidebarHeader className="p-4 border-b-2" style={{borderColor: '#210F37'}}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#210F37'}}>
            L
          </div>
          <h2 className="font-bold text-xl" style={{color: '#210F37'}}>LingoPlay GH</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent style={{backgroundColor: '#FBCFE8'}}>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-lg" style={{color: '#210F37'}}>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-all ${
                      activeTab === item.id 
                        ? 'text-white' 
                        : 'hover:bg-white/20'
                    }`}
                    style={activeTab === item.id ? {backgroundColor: '#210F37'} : {color: '#210F37'}}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-lg flex items-center gap-2" style={{color: '#210F37'}}>
            <Crown className="w-4 h-4 text-yellow-500" />
            Premium Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {premiumItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => {
                      if (!isPremium && item.premium) {
                        onUpgradeClick();
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    isActive={activeTab === item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-all ${
                      activeTab === item.id 
                        ? 'text-white' 
                        : !isPremium && item.premium 
                        ? 'opacity-60 hover:bg-white/10' 
                        : 'hover:bg-white/20'
                    }`}
                    style={activeTab === item.id ? {backgroundColor: '#210F37'} : {color: '#210F37'}}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    {!isPremium && item.premium && (
                      <Crown className="w-4 h-4 text-yellow-500 ml-auto" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-lg" style={{color: '#210F37'}}>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-all ${
                      activeTab === item.id 
                        ? 'text-white' 
                        : 'hover:bg-white/20'
                    }`}
                    style={activeTab === item.id ? {backgroundColor: '#210F37'} : {color: '#210F37'}}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    {isPremium && (
                      <Crown className="w-4 h-4 text-yellow-500 ml-auto" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!isPremium && (
        <SidebarFooter className="p-4 border-t-2" style={{borderColor: '#210F37'}}>
          <Button 
            onClick={onUpgradeClick}
            className="w-full text-white font-bold p-3 rounded-lg hover:opacity-80"
            style={{backgroundColor: '#210F37'}}
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
