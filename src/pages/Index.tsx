import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [onlinePlayers, setOnlinePlayers] = useState('0');
  const [registeredUsers, setRegisteredUsers] = useState('0');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPrivilege, setSelectedPrivilege] = useState<any>(null);

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'shop', label: 'Магазин', icon: 'ShoppingCart' },
    { id: 'servers', label: 'Сервера', icon: 'Server' },
    { id: 'top', label: 'Топ игроков', icon: 'Trophy' },
    { id: 'forum', label: 'Форум', icon: 'MessageSquare' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ];

  useEffect(() => {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      setRegisteredUsers(storedUsers);
    }

    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/9e9c3f3b-b5ad-4a03-8dc2-7724325a988e');
        const data = await response.json();
        if (data.online) {
          setOnlinePlayers(data.online);
        }
      } catch (error) {
        console.error('Ошибка получения статуса сервера:', error);
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Игроков онлайн', value: onlinePlayers, icon: 'Users' },
    { label: 'Серверов', value: '1', icon: 'Server' },
    { label: 'Зарегистрировано', value: registeredUsers, icon: 'UserPlus' },
  ];

  const shopItems = [
    { name: 'VIP статус', price: '350₽', description: 'Доступ к VIP возможностям на 30 дней', popular: true },
    { name: 'ADMIN', price: '550₽', description: 'Полный доступ к администраторским функциям', popular: false },
  ];

  const topPlayers = [
    { rank: 1, name: 'ProGamer2024', score: 15420, avatar: '🏆' },
    { rank: 2, name: 'ShadowKiller', score: 14890, avatar: '⚔️' },
    { rank: 3, name: 'NightHunter', score: 13567, avatar: '🎯' },
    { rank: 4, name: 'CyberNinja', score: 12345, avatar: '🥷' },
    { rank: 5, name: 'IceWizard', score: 11234, avatar: '❄️' },
  ];

  const servers = [
    { name: '[Горизонт Сисек] 21+', players: onlinePlayers + '/32', ping: '15ms', status: 'online', ip: '46.174.50.10:27208' },
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
              <h1 className="text-2xl font-gaming font-bold glow-cyan">[Горизонт Сисек] 21+</h1>
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

            <div className="flex gap-2">
              <Button variant="outline" className="border-primary/50 hover:border-glow" onClick={() => setShowLoginModal(true)}>
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-glow" onClick={() => setShowRegisterModal(true)}>
                <Icon name="UserPlus" size={18} className="mr-2" />
                Регистрация
              </Button>
            </div>
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
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg font-gaming border-glow" onClick={() => setActiveSection('connect')}>
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать играть
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg font-gaming border-primary/50 hover:border-glow" onClick={() => setActiveSection('about')}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {shopItems.map((item, idx) => (
                <Card key={idx} className="p-8 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow relative overflow-hidden">
                  {item.popular && (
                    <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                      Популярно
                    </Badge>
                  )}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name={item.name === 'VIP статус' ? 'Crown' : 'ShieldCheck'} className="text-primary" size={32} />
                      </div>
                      <h3 className="text-3xl font-gaming font-bold">{item.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-4xl font-gaming font-bold text-primary glow-cyan">{item.price}</span>
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-primary to-secondary border-glow"
                        onClick={() => {
                          setSelectedPrivilege(item);
                          setShowPurchaseModal(true);
                        }}
                      >
                        <Icon name="ShoppingCart" size={20} className="mr-2" />
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
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-cyan mb-4">ПРАВИЛА СЕРВЕРА</h2>
              <p className="text-muted-foreground text-lg">Обязательны к прочтению для всех игроков</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 card-glow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon name="ShieldAlert" className="text-accent" size={28} />
                  </div>
                  <h3 className="text-3xl font-gaming font-bold text-accent glow-purple">ОБЩИЕ ПРАВИЛА СЕРВЕРА</h3>
                </div>
                <div className="space-y-4 text-foreground/90">
                  <div className="flex gap-3">
                    <span className="font-gaming font-bold text-primary min-w-[2rem]">1.</span>
                    <p>Запрещён флуд/спам. <span className="text-muted-foreground">(Мут/гаг | При повторном бан 10 мин.)</span></p>
                  </div>
                  <div className="flex gap-3 pl-8">
                    <span className="font-gaming font-bold text-primary/70 min-w-[2rem]">1.1.</span>
                    <p>Запрещено обходить индивидуальный мут\гаг. Мут будет действовать до конца карты. <span className="text-muted-foreground">(При повторном нарушении/обход мута любыми способами бан на 10 мин.)</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-gaming font-bold text-primary min-w-[2rem]">2.</span>
                    <p>Запрещено оскорблять игроков. <span className="text-muted-foreground">(Первый кик | При повторном нарушении бан на 10-30 мин.)</span></p>
                  </div>
                  <div className="flex gap-3 pl-8">
                    <span className="font-gaming font-bold text-primary/70 min-w-[2rem]">2.1.</span>
                    <p>Дружеское оскорбление, шуточное общение, когда тот кого оскорбили, не высказал претензии, не несет за собой оскорбительный характер.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-gaming font-bold text-primary min-w-[2rem]">3.</span>
                    <p>Запрещена реклама в любом виде. <span className="text-muted-foreground">(Бан навсегда/лишение привилегий.)</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-gaming font-bold text-primary min-w-[2rem]">4.</span>
                    <p>Запрещены спреи (лого) с "порнографией", оскорблением игроков, свастика в любом виде. <span className="text-muted-foreground">(Карается киком | При повторном бан 10 мин.)</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-gaming font-bold text-primary min-w-[2rem]">5.</span>
                    <p>Запрещено упоминание родных в любой форме. <span className="text-muted-foreground">(Бан навсегда/лишение привилегий.)</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-gaming font-bold text-primary min-w-[2rem]">6.</span>
                    <p>Запрещены ники с оскорблениями. <span className="text-muted-foreground">(Переименование | При повторном Бан на 10 минут).</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-gaming font-bold text-primary min-w-[2rem]">7.</span>
                    <p>Разрешено употребление ненормативной лексики в пределах разумного и без цели оскорбления. <span className="text-muted-foreground">(Мут/гаг | При повторном бан 10 мин.)</span></p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 card-glow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" className="text-secondary" size={28} />
                  </div>
                  <h3 className="text-3xl font-gaming font-bold text-secondary glow-purple">ПРАВИЛА ДЛЯ АДМИНИСТРАТОРОВ</h3>
                </div>
                <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-foreground/90">
                    <span className="font-gaming font-bold text-secondary">Администратор</span> — игрок с расширенными возможностями на сервере (голосования, смена карты, кик, бан).
                  </p>
                </div>
                <h4 className="text-xl font-gaming font-bold mb-4 text-accent">Администраторские права снимаются за:</h4>
                <div className="space-y-3 text-foreground/90">
                  {[
                    'Решение главных администраторов/доверенных лиц',
                    'Многочисленные жалобы от других игроков',
                    'Нарушение или несоблюдение правил',
                    'Передачу админки третьим лицам',
                    'Рекламу своих или иных проектов',
                    'Посторонние/вредоносные ссылки в чате',
                    'Несообщение контактов главных администраторов заинтересованным игрокам',
                    'Действия, направленные на уменьшение числа игроков',
                    'Использование админки в личных целях',
                    'Выдачу HP/воскрешение/бессмертие/скорость (кроме разрешенных случаев)',
                    'Выдачу себя за главного администратора',
                    'Оскорбление/упоминание родителей в грубой форме',
                    'Использование привилегий для попадания за пределы карты',
                    'Действия, повлекшие аварийный перезапуск сервера',
                    'Шлепки игроков с дамагом, поджигание'
                  ].map((rule, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="font-gaming font-bold text-secondary min-w-[2rem]">{idx + 1}.</span>
                      <p>{rule}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 card-glow bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="AlertCircle" className="text-primary" size={28} />
                  </div>
                  <h3 className="text-3xl font-gaming font-bold text-primary glow-cyan">ЖАЛОБЫ НА ИГРОКОВ</h3>
                </div>
                <p className="text-lg mb-6 text-foreground/90">
                  Жалобы на игроков с привилегиями принимаем <span className="font-gaming font-bold text-primary">только в Telegram канале!</span>
                </p>
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary text-lg font-gaming border-glow"
                    onClick={() => window.open('https://t.me/Gorizont_sisek/114', '_blank')}
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Подать жалобу в Telegram
                  </Button>
                </div>
              </Card>

              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted/30 rounded-lg border border-border/50">
                  <Icon name="Info" className="text-primary" size={24} />
                  <p className="text-muted-foreground">
                    Незнание правил не освобождает от ответственности
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-cyan mb-4">КОНТАКТЫ</h2>
              <p className="text-muted-foreground text-lg">Свяжись с нами в Telegram</p>
            </div>
            <div className="max-w-md mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all card-glow text-center">
                <Icon name="Send" size={64} className="mx-auto mb-6 text-primary" />
                <h3 className="text-2xl font-gaming font-bold mb-3">Telegram</h3>
                <p className="text-muted-foreground mb-6 text-lg">t.me/Gorizont_sisek</p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary border-glow w-full"
                  onClick={() => window.open('https://t.me/Gorizont_sisek', '_blank')}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Перейти в Telegram
                </Button>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'connect' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-cyan mb-4">ПОДКЛЮЧЕНИЕ К СЕРВЕРУ</h2>
              <p className="text-muted-foreground text-lg">Скопируй IP и подключайся</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <Card className="p-10 bg-card/50 backdrop-blur border-border/50 card-glow text-center">
                <div className="mb-8">
                  <Icon name="Server" size={80} className="mx-auto mb-6 text-primary animate-pulse-glow" />
                  <h3 className="text-3xl font-gaming font-bold mb-4 glow-cyan">[Горизонт Сисек] 21+</h3>
                </div>
                <div className="bg-muted/30 rounded-lg p-6 border border-primary/30 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">IP адрес сервера:</p>
                  <p className="text-4xl font-gaming font-bold text-primary glow-cyan">46.174.50.10:27208</p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary text-lg font-gaming border-glow w-full"
                  onClick={() => {
                    navigator.clipboard.writeText('46.174.50.10:27208');
                  }}
                >
                  <Icon name="Copy" size={20} className="mr-2" />
                  Скопировать IP
                </Button>
                <p className="text-muted-foreground mt-6">Открой Counter-Strike → Найти серверы → Добавить сервер</p>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-gaming font-bold glow-purple mb-4">О СЕРВЕРЕ</h2>
              <p className="text-muted-foreground text-lg">Почему именно мы?</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 card-glow">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-gaming font-bold mb-3 text-primary">Стабильность и производительность</h3>
                    <p className="text-foreground/90 text-lg">Мощный сервер с круглосуточной поддержкой обеспечивает бесперебойную игру без лагов и вылетов. Низкий пинг и высокая стабильность соединения.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 card-glow">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" className="text-secondary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-gaming font-bold mb-3 text-secondary">Дружное сообщество</h3>
                    <p className="text-foreground/90 text-lg">Активное игровое сообщество с адекватными игроками. Регулярные турниры, ивенты и конкурсы с призами. Присоединяйся к нашему Telegram-каналу!</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 card-glow">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" className="text-accent" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-gaming font-bold mb-3 text-accent">Честная игра</h3>
                    <p className="text-foreground/90 text-lg">Строгие правила против читеров и нарушителей. Активная администрация следит за порядком 24/7. Система античита защищает от недобросовестных игроков.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 card-glow bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Star" className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-gaming font-bold mb-3 text-primary">Уникальные возможности</h3>
                    <p className="text-foreground/90 text-lg">Эксклюзивные VIP и Admin привилегии, доступные карты и моды. Создай свою легенду на нашем сервере уже сегодня!</p>
                  </div>
                </div>
              </Card>

              <div className="text-center pt-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary text-xl font-gaming border-glow"
                  onClick={() => setActiveSection('connect')}
                >
                  <Icon name="Play" size={24} className="mr-2" />
                  Начать играть сейчас
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card/30 backdrop-blur py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Gamepad2" className="text-primary" size={24} />
            <span className="text-xl font-gaming font-bold glow-cyan">[Горизонт Сисек] 21+</span>
          </div>
          <p className="text-muted-foreground">© 2024 Горизонт Сисек. Все права защищены.</p>
        </div>
      </footer>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
          <Card className="p-8 bg-card border-primary/50 max-w-md w-full card-glow" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-gaming font-bold text-primary glow-cyan">ВХОД</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">STEAM ID</label>
                <input 
                  type="text" 
                  placeholder="STEAM_0:0:12345678" 
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-lg font-gaming border-glow mt-6">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRegisterModal(false)}>
          <Card className="p-8 bg-card border-primary/50 max-w-md w-full card-glow" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-gaming font-bold text-primary glow-cyan">РЕГИСТРАЦИЯ</h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">STEAM ID</label>
                <input 
                  type="text" 
                  placeholder="STEAM_0:0:12345678" 
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Подтвердите пароль</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary text-lg font-gaming border-glow mt-6"
                onClick={() => {
                  const currentCount = parseInt(localStorage.getItem('registeredUsers') || '0');
                  const newCount = currentCount + 1;
                  localStorage.setItem('registeredUsers', newCount.toString());
                  setRegisteredUsers(newCount.toString());
                  setShowRegisterModal(false);
                }}
              >
                <Icon name="UserPlus" size={20} className="mr-2" />
                Зарегистрироваться
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showPurchaseModal && selectedPrivilege && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPurchaseModal(false)}>
          <Card className="p-8 bg-card border-primary/50 max-w-lg w-full card-glow" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-gaming font-bold text-primary glow-cyan">ПОКУПКА {selectedPrivilege.name.toUpperCase()}</h3>
              <button onClick={() => setShowPurchaseModal(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="mb-6 p-6 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Привилегия:</span>
                <span className="font-gaming font-bold text-lg">{selectedPrivilege.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Цена:</span>
                <span className="font-gaming font-bold text-2xl text-primary glow-cyan">{selectedPrivilege.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Выберите сервер</label>
                <select className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none">
                  <option>[Горизонт Сисек] 21+ - 46.174.50.10:27208</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Способ привязки</label>
                <select className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none">
                  <option>STEAM ID + Пароль</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">STEAM ID</label>
                <input 
                  type="text" 
                  placeholder="STEAM_0:0:12345678" 
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-lg font-gaming border-glow mt-6">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Оплатить {selectedPrivilege.price}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;