import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'shop', label: 'Магазин', icon: 'ShoppingCart' },
    { id: 'servers', label: 'Сервера', icon: 'Server' },
    { id: 'top', label: 'Топ игроков', icon: 'Trophy' },
    { id: 'forum', label: 'Форум', icon: 'MessageSquare' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ];

  const stats = [
    { label: 'Игроков онлайн', value: '1,247', icon: 'Users' },
    { label: 'Серверов', value: '12', icon: 'Server' },
    { label: 'Зарегистрировано', value: '45,892', icon: 'UserPlus' },
  ];

  const shopItems = [
    { name: 'VIP статус', price: '499₽', description: 'Доступ к VIP возможностям на 30 дней', popular: true },
    { name: 'Premium набор', price: '999₽', description: 'Эксклюзивные предметы и бонусы', popular: false },
    { name: 'Starter Pack', price: '199₽', description: 'Стартовый набор для новичков', popular: false },
  ];

  const topPlayers = [
    { rank: 1, name: 'ProGamer2024', score: 15420, avatar: '🏆' },
    { rank: 2, name: 'ShadowKiller', score: 14890, avatar: '⚔️' },
    { rank: 3, name: 'NightHunter', score: 13567, avatar: '🎯' },
    { rank: 4, name: 'CyberNinja', score: 12345, avatar: '🥷' },
    { rank: 5, name: 'IceWizard', score: 11234, avatar: '❄️' },
  ];

  const servers = [
    { name: 'Основной #1', players: '247/300', ping: '15ms', status: 'online' },
    { name: 'PvP Arena #2', players: '189/250', ping: '22ms', status: 'online' },
    { name: 'Roleplay #3', players: '156/200', ping: '18ms', status: 'online' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-pulse-glow">
                <Icon name="Gamepad2" className="text-background" size={24} />
              </div>
              <h1 className="text-2xl font-gaming font-bold glow-cyan">SWORD GAMING</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-primary/20 text-primary border border-primary/50 border-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-glow">
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12">
        {activeSection === 'home' && (
          <div className="container mx-auto px-4 space-y-16">
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl -z-10" />
              <div className="text-center space-y-6 py-20">
                <h2 className="text-6xl md:text-8xl font-gaming font-bold glow-cyan animate-float">
                  ДОБРО ПОЖАЛОВАТЬ
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                  Присоединяйся к лучшему игровому сообществу. Создай свою легенду уже сегодня!
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg font-gaming border-glow">
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать играть
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg font-gaming border-primary/50 hover:border-glow">
                    <Icon name="Info" size={20} className="mr-2" />
                    Подробнее
                  </Button>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-gaming font-bold glow-cyan">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name={stat.icon as any} className="text-primary" size={24} />
                    </div>
                  </div>
                </Card>
              ))}
            </section>
          </div>
        )}

        {activeSection === 'shop' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-purple mb-4">МАГАЗИН</h2>
              <p className="text-muted-foreground text-lg">Прокачай свой аккаунт до максимума</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shopItems.map((item, idx) => (
                <Card key={idx} className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow relative overflow-hidden">
                  {item.popular && (
                    <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                      Популярно
                    </Badge>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-gaming font-bold">{item.name}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-3xl font-gaming font-bold text-primary glow-cyan">{item.price}</span>
                      <Button className="bg-gradient-to-r from-primary to-secondary border-glow">
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        Купить
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'top' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-cyan mb-4">ТОП ИГРОКОВ</h2>
              <p className="text-muted-foreground text-lg">Лучшие из лучших на нашем сервере</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {topPlayers.map((player) => (
                <Card key={player.rank} className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow">
                  <div className="flex items-center gap-6">
                    <div className={`text-4xl font-gaming font-bold ${
                      player.rank === 1 ? 'text-yellow-400' : 
                      player.rank === 2 ? 'text-gray-300' : 
                      player.rank === 3 ? 'text-orange-400' : 'text-muted-foreground'
                    }`}>
                      #{player.rank}
                    </div>
                    <div className="text-4xl">{player.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-gaming font-bold">{player.name}</h3>
                      <p className="text-sm text-muted-foreground">Очки: {player.score.toLocaleString()}</p>
                    </div>
                    {player.rank <= 3 && (
                      <Icon name="Medal" className="text-primary" size={32} />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'servers' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-purple mb-4">СЕРВЕРА</h2>
              <p className="text-muted-foreground text-lg">Выбери сервер и начни играть</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {servers.map((server, idx) => (
                <Card key={idx} className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Server" className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-gaming font-bold">{server.name}</h3>
                        <div className="flex gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            <Icon name="Users" size={14} className="inline mr-1" />
                            {server.players}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            <Icon name="Wifi" size={14} className="inline mr-1" />
                            {server.ping}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        <Icon name="Circle" size={8} className="mr-1 fill-current" />
                        Онлайн
                      </Badge>
                      <Button className="bg-gradient-to-r from-primary to-secondary border-glow">
                        <Icon name="Play" size={18} className="mr-2" />
                        Играть
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'forum' && (
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto py-20">
              <Icon name="MessageSquare" size={64} className="mx-auto mb-6 text-primary" />
              <h2 className="text-4xl font-gaming font-bold glow-cyan mb-4">ФОРУМ</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Раздел форума находится в разработке. Скоро здесь появится возможность общаться с другими игроками!
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary border-glow">
                <Icon name="Bell" size={18} className="mr-2" />
                Уведомить о запуске
              </Button>
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-cyan mb-4">КОНТАКТЫ</h2>
              <p className="text-muted-foreground text-lg">Свяжись с нами любым удобным способом</p>
            </div>
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow text-center">
                <Icon name="Send" size={40} className="mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-gaming font-bold mb-2">Telegram</h3>
                <p className="text-muted-foreground mb-4">@sword_gaming_support</p>
                <Button variant="outline" className="border-primary/50 hover:border-glow">
                  Написать
                </Button>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow text-center">
                <Icon name="AtSign" size={40} className="mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-gaming font-bold mb-2">Discord</h3>
                <p className="text-muted-foreground mb-4">discord.gg/sword-gaming</p>
                <Button variant="outline" className="border-secondary/50 hover:border-glow">
                  Присоединиться
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card/30 backdrop-blur py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Gamepad2" className="text-primary" size={24} />
            <span className="text-xl font-gaming font-bold glow-cyan">SWORD GAMING</span>
          </div>
          <p className="text-muted-foreground">© 2024 Sword Gaming. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
