import { Bell, Crown } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Badge } from './ui/badge';

const Header = ({ isPremium }) => {
  return (
    <header className="text-white p-6" style={{background: 'linear-gradient(135deg, #210F37 0%, #210F37 100%'}}>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <SidebarTrigger className="text-white hover:bg-white/20 h-8 w-8" />
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">LingoPlay GH</h1>
          {isPremium && (
            <Badge className="bg-yellow-500 text-yellow-900 border-yellow-400">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
        <Bell className="w-8 h-8" />
      </div>
    </header>
  );
};

export default Header;
