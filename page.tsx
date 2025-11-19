import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Zap, Bot, X, TrendingUp, ShieldCheck, Cpu, Menu, ChevronRight, Plus, Minus, Trash2 } from 'lucide-react';

// --- Données ---

const PRODUCTS = [
  {
    id: 1,
    name: "The MVP (Minimum Viable Plantain)",
    price: 19.99,
    tag: "Best Seller",
    description: "La banane de base. Itérative, agile et sans pépins. Parfaite pour scaler votre décoration.",
    image: "🍌",
    aiScore: 98,
    features: ["Polymère Grade A", "Zéro Latence", "Compatible 5G"]
  },
  {
    id: 2,
    name: "Neural Yellow V4",
    price: 45.00,
    tag: "New",
    description: "Entraînée sur 4 milliards d'images de fruits. Une courbure optimisée par algorithme génétique.",
    image: "🍌",
    aiScore: 99,
    features: ["Auto-nettoyante", "Smart Texture", "Blockchain verified"]
  },
  {
    id: 3,
    name: "Cyber-Banana Pro Max",
    price: 129.99,
    tag: "Premium",
    description: "Finition chrome bleu cobalt. Pour les CEO qui veulent disrupter la coupe de fruits.",
    image: "🤖",
    aiScore: 100,
    features: ["Titane Aérospatial", "Non-Fungible", "Édition Limitée"]
  },
  {
    id: 4,
    name: "Quantum Cavendish",
    price: 89.50,
    tag: "Experimental",
    description: "Existe simultanément en état mûr et vert tant que vous ne l'observez pas.",
    image: "🌌",
    aiScore: 85,
    features: ["Superposition", "Entanglement", "Zéro Calories"]
  }
];

// --- Composants ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon }: any) => {
  const baseStyles = "flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md",
    outline: "border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
    danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

const Badge = ({ children, color = 'indigo' }: any) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${color}-500/20 text-${color}-300 border border-${color}-500/30`}>
    {children}
  </span>
);

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, total }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col h-full transform transition-transform duration-300 animate-slideIn">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="text-indigo-400" /> Panier
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Bot size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl font-semibold">Votre panier est vide</p>
              <p className="text-sm mt-2">L'IA n'a détecté aucune transaction.</p>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={item.id} className="bg-white/5 rounded-xl p-4 flex gap-4 border border-white/5 animate-fadeIn">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-4xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-indigo-400 font-mono">{item.price.toFixed(2)} €</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/10 rounded text-white"><Minus size={16} /></button>
                    <span className="font-mono text-white w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/10 rounded text-white"><Plus size={16} /></button>
                    <div className="flex-1"></div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
          <div className="flex justify-between mb-2 text-gray-400">
            <span>Sous-total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-400">
            <span>Taxes (IA + Carbone)</span>
            <span>{(total * 0.2).toFixed(2)} €</span>
          </div>
          <div className="flex justify-between mb-8 text-2xl font-bold text-white">
            <span>Total</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {(total * 1.2).toFixed(2)} €
            </span>
          </div>
          <Button className="w-full" icon={ShieldCheck} onClick={() => alert("Paiement simulé ! Merci d'avoir investi dans le futur de la banane.")}>
            Procéder au paiement sécurisé
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Application Principale ---

export default function HecIaBananas() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const runAiAnalysis = (id: number) => {
    setAnalyzingId(id);
    setTimeout(() => setAnalyzingId(null), 2000);
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="text-white w-6 h-6" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              BANAN<span className="text-indigo-500">.AI</span>
            </span>
            <Badge color="purple">HEC EDITION</Badge>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Solutions</a>
              <a href="#" className="hover:text-white transition-colors">Analytics</a>
              <a href="#" className="hover:text-white transition-colors">Enterprise</a>
            </div>
            <button 
              className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors group"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6 text-slate-300 group-hover:text-indigo-400 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs flex items-center justify-center rounded-full font-bold border border-slate-900">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
              <Zap size={16} />
              <span>Nouvelle V3.0 : Potassium Artificiel</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Disruptez votre <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Consommation de Fruits
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg">
              Nos bananes en polymère haute densité sont optimisées par Deep Learning pour une courbure parfaite. Zéro déchet organique. 100% KPI friendly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button icon={ChevronRight}>Explorer le catalogue</Button>
              <Button variant="secondary">Lire le Whitepaper</Button>
            </div>
            <div className="flex gap-8 pt-4 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-sm text-slate-500">Unités déployées</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-sm text-slate-500">Uptime (Ne pourrit pas)</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="relative z-10 text-[15rem] md:text-[20rem] animate-float drop-shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
              🍌
            </div>
            {/* Floating Cards */}
            <div className="absolute top-1/4 right-0 bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">ROI Potassium</p>
                  <p className="font-bold text-green-400">+245%</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-1/4 left-0 bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl animate-bounce duration-[4000ms]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                  <Cpu size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">AI Processing</p>
                  <p className="font-bold text-blue-400">12 TFLOPS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-white">Nos Modèles Phares</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Chaque banane est un chef-d'œuvre d'ingénierie synthétique, conçue pour maximiser l'impact visuel dans votre open-space ou votre loft à la Defense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group relative bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
                
                {/* Image Area */}
                <div className="h-64 bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent"></div>
                  <span className="text-8xl group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl">{product.image}</span>
                  <div className="absolute top-4 right-4">
                    <Badge color={product.tag === 'Best Seller' ? 'yellow' : product.tag === 'New' ? 'green' : 'purple'}>
                      {product.tag}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                        <Star size={14} fill="currentColor" />
                        <span className="text-slate-400 ml-1">Score IA: {product.aiScore}/100</span>
                      </div>
                    </div>
                    <span className="text-xl font-mono font-bold text-white">{product.price}€</span>
                  </div>
                  
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {product.description}
                  </p>

                  {/* AI Features list */}
                  <div className="space-y-2 pt-2">
                    {product.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => runAiAnalysis(product.id)}
                      className="flex items-center justify-center py-2 px-4 rounded-xl text-sm font-medium bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5"
                    >
                      {analyzingId === product.id ? (
                        <span className="flex items-center gap-2">
                           <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></span>
                           Scanning...
                        </span>
                      ) : (
                        <>
                          <TrendingUp size={16} className="mr-2" /> Analyser
                        </>
                      )}
                    </button>
                    <Button onClick={() => addToCart(product)} className="py-2 text-sm px-4">
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Bot className="text-indigo-500" /> BANAN.AI
              </div>
              <p className="text-slate-400 text-sm">
                Pionnier mondial de la disruption fructifère synthétique.
                Incubé à HEC Paris, propulsé par le potassium virtuel.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produits</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-indigo-400">Bananes Consumer</a></li>
                <li><a href="#" className="hover:text-indigo-400">Bananes Enterprise</a></li>
                <li><a href="#" className="hover:text-indigo-400">API de Maturation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-indigo-400">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-400">Certificats Blockchain</a></li>
                <li><a href="#" className="hover:text-indigo-400">Étude de cas HEC</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="email@hec.edu" 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-indigo-500 text-white"
                />
                <button className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg text-white transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2024 Banan'AI. Tous droits réservés. Ceci est une parodie.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={total}
      />
    </div>
  );
}