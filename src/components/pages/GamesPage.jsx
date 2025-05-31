// src/components/pages/GamesPage.jsx
import { Card, CardContent } from '../ui/card';
import { Crown, Trophy, Star, Zap } from 'lucide-react';
import { Button } from '../ui/button';

// Game card component
const GameCard = ({ game, onClick, isPremium = false }) => (
  <Card className="border-4 hover:shadow-lg transition-shadow" style={{borderColor: '#210F37'}}>
    <CardContent className={`${game.color} p-6`}>
      <div className="text-center mb-4">
        <div className="text-8xl mb-3">{game.icon}</div>
        <h4 className="text-2xl font-bold mb-2" style={{color: '#210F37'}}>{game.title}</h4>
        <p className="text-lg mb-3" style={{color: '#210F37'}}>{game.description}</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-bold">
            {game.difficulty}
          </span>
          <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-lg font-bold flex items-center gap-1">
            <Star className="w-4 h-4" />
            {game.points} pts
          </span>
        </div>
      </div>
      <Button 
        onClick={onClick}
        className="w-full text-white text-xl p-6 hover:opacity-80 font-bold"
        style={{backgroundColor: '#210F37'}}
      >
        {isPremium ? '👑 Play Premium Game!' : '🎯 Play Game!'}
      </Button>
    </CardContent>
  </Card>
);

// Premium game card component
const PremiumGameCard = ({ game, onClick }) => (
  <Card className="border-4 border-yellow-400 hover:shadow-xl transition-all bg-gradient-to-br from-yellow-100 to-yellow-50">
    <CardContent className="p-6">
      <div className="relative">
        <Crown className="absolute top-0 right-0 w-8 h-8 text-yellow-500" />
        <div className="text-center mb-4">
          <div className="text-7xl mb-3">{game.icon}</div>
          <h4 className="text-2xl font-bold mb-2" style={{color: '#210F37'}}>{game.title}</h4>
          <p className="text-lg mb-3" style={{color: '#210F37'}}>{game.description}</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className={`px-3 py-2 rounded-full text-lg font-bold text-white ${
              game.difficulty === 'Easy' ? 'bg-green-500' :
              game.difficulty === 'Medium' ? 'bg-yellow-500' :
              game.difficulty === 'Hard' ? 'bg-orange-500' : 'bg-red-500'
            }`}>
              {game.difficulty}
            </span>
            <span className="bg-yellow-500 text-white px-3 py-2 rounded-full text-lg font-bold flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {game.points} pts
            </span>
          </div>
          <div className="space-y-2 mb-4">
            {game.features?.map((feature, index) => (
              <div key={index} className="px-3 py-2 rounded-lg text-lg font-medium border-2" style={{backgroundColor: '#FBCFE8', color: '#210F37', borderColor: '#210F37'}}>
                <Zap className="w-4 h-4 inline mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
        <Button 
          onClick={onClick}
          className="w-full text-white font-bold text-xl p-6 hover:opacity-80"
          style={{backgroundColor: '#210F37'}}
        >
          👑 Play Premium Game!
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Premium upgrade card component
const PremiumUpgradeCard = ({ onUpgradeClick }) => (
  <Card className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-50">
    <CardContent className="p-8 text-center">
      <Crown className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
      <h3 className="text-4xl font-bold mb-6" style={{color: '#210F37'}}>🌟 Unlock Super Cool Premium Games! 🌟</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-xl border-4" style={{backgroundColor: '#FBCFE8', borderColor: '#210F37'}}>
          <Trophy className="w-12 h-12 mx-auto mb-4" style={{color: '#210F37'}} />
          <h4 className="font-bold text-2xl mb-3" style={{color: '#210F37'}}>🏆 Super Challenges!</h4>
          <p className="text-lg text-gray-600">Amazing games with cool features!</p>
        </div>
        <div className="p-6 rounded-xl border-4" style={{backgroundColor: '#FBCFE8', borderColor: '#210F37'}}>
          <Zap className="w-12 h-12 mx-auto mb-4" style={{color: '#210F37'}} />
          <h4 className="font-bold text-2xl mb-3" style={{color: '#210F37'}}>⚡ Cool Features!</h4>
          <p className="text-lg text-gray-600">Voice games and fun activities!</p>
        </div>
        <div className="p-6 rounded-xl border-4" style={{backgroundColor: '#FBCFE8', borderColor: '#210F37'}}>
          <Star className="w-12 h-12 mx-auto mb-4" style={{color: '#210F37'}} />
          <h4 className="font-bold text-2xl mb-3" style={{color: '#210F37'}}>🌟 More Points!</h4>
          <p className="text-lg text-gray-600">Earn lots of coins and rewards!</p>
        </div>
      </div>
      <Button 
        onClick={onUpgradeClick} 
        className="text-white text-2xl p-8 hover:opacity-80 font-bold"
        style={{backgroundColor: '#210F37'}}
      >
        <Crown className="w-6 h-6 mr-3" />
        🎮 Get Premium Games Now! 🎮
      </Button>
    </CardContent>
  </Card>
);

// Main GamesPage component
const GamesPage = ({ setActiveGame, isPremium, onUpgradeClick }) => {
  // Game data
  const regularGames = [
    {
      id: 'fruit-match',
      title: 'Fruit Matching',
      description: 'Match fruits with their Twi names',
      difficulty: 'Easy',
      color: 'bg-white',
      icon: '🍎',
      points: 10
    },
    {
      id: 'color-match',
      title: 'Color Learning',
      description: 'Learn colors in Twi',
      difficulty: 'Easy',
      color: 'bg-white',
      icon: '🎨',
      points: 10
    },
    {
      id: 'number-quiz',
      title: 'Number Quiz',
      description: 'Test your number knowledge',
      difficulty: 'Easy',
      color: 'bg-white',
      icon: '🔢',
      points: 15
    }
  ];

  const premiumGames = [
    {
      id: 'cultural-quiz-master',
      title: 'Cultural Quiz Master',
      description: 'Advanced cultural knowledge with voice recognition',
      difficulty: 'Expert',
      color: 'bg-white',
      icon: '🏆',
      points: 50,
      features: ['Voice Recognition', 'Cultural Context', 'Leaderboard']
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8" style={{backgroundColor: '#FBCFE8', minHeight: '100vh'}}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4" style={{color: '#210F37'}}>🎮 Fun Learning Games! 🎮</h2>
        <p className="text-xl" style={{color: '#210F37'}}>Play and learn Twi at the same time!</p>
      </div>

      {/* Regular Games */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold" style={{color: '#210F37'}}>🌟 Free Games 🌟</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={() => setActiveGame(game.id)}
            />
          ))}
        </div>
      </div>

      {/* Premium Games or Upgrade Card */}
      {isPremium ? (
        <div className="space-y-6">
          <div className="flex items-center gap-3 justify-center">
            <Crown className="w-10 h-10 text-yellow-500" />
            <h3 className="text-4xl font-bold" style={{color: '#210F37'}}>👑 Premium Super Games! 👑</h3>
            <Crown className="w-10 h-10 text-yellow-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumGames.map((game) => (
              <PremiumGameCard 
                key={game.id} 
                game={game} 
                onClick={() => setActiveGame(game.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <PremiumUpgradeCard onUpgradeClick={onUpgradeClick} />
      )}
    </div>
  );
};

export default GamesPage;
