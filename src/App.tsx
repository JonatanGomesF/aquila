import React, { useState, useEffect, useRef } from 'react'
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  UserCheck, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  MessageSquare,
  Car,
  AlertCircle
} from 'lucide-react'

// Informações estáticas do site
const PHONE_NUMBER = '+5511930436391'
const PHONE_DISPLAY = '(11) 93043-6391'
const EMAIL_CONTACT = 'espacoaquila@gmail.com'

interface Service {
  id: number
  name: string
  description: string
  price: string
  fixedPrice: boolean
  image: string
  icon: React.ReactNode
  neonGlow: 'cyan' | 'purple' | 'magenta'
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  
  // Modal de Orçamento
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [budgetForm, setBudgetForm] = useState({
    nome: '',
    whatsapp: '',
    veiculo: '',
    ano: '',
    observacoes: ''
  })
  
  // Notificação de erro/validação
  const [formError, setFormError] = useState('')

  // Controlar o scroll do header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderScrolled(true)
      } else {
        setIsHeaderScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lista de Serviços
  const services: Service[] = [
    {
      id: 1,
      name: 'Higienização e Hidratação de Bancos de Couro',
      description: 'Limpeza profunda e hidratação para preservar o couro, recuperar seu aspecto e prolongar sua vida útil.',
      price: 'Orçamento personalizado',
      fixedPrice: false,
      image: '/images/couro.jpg',
      icon: <Sparkles className="w-6 h-6 text-neon-cyan" />,
      neonGlow: 'cyan'
    },
    {
      id: 2,
      name: 'Restauração e Vitrificação de Faróis',
      description: 'Recupere a transparência, aparência e proteção dos seus faróis com restauração e vitrificação.',
      price: 'R$ 150',
      fixedPrice: true,
      image: '/images/farois.jpg',
      icon: <Award className="w-6 h-6 text-neon-purple" />,
      neonGlow: 'purple'
    },
    {
      id: 3,
      name: 'Lavagem Técnica',
      description: 'Limpeza detalhada utilizando técnicas e produtos adequados para preservar a pintura e os componentes do veículo.',
      price: 'Orçamento personalizado',
      fixedPrice: false,
      image: '/images/lavagem.jpg',
      icon: <ShieldCheck className="w-6 h-6 text-neon-magenta" />,
      neonGlow: 'magenta'
    },
    {
      id: 4,
      name: 'Limpeza Técnica do Motor + Proteção',
      description: 'Limpeza técnica do cofre do motor com cuidado nos componentes e aplicação de proteção para um acabamento impecável.',
      price: 'R$ 150',
      fixedPrice: true,
      image: '/images/motor.jpg',
      icon: <Car className="w-6 h-6 text-neon-cyan" />,
      neonGlow: 'cyan'
    },
    {
      id: 5,
      name: 'Higienização de Estofados',
      description: 'Higienização profunda dos estofados para remover sujeiras, manchas e odores.',
      price: 'Orçamento personalizado',
      fixedPrice: false,
      image: '/images/estofados.jpg',
      icon: <Sparkles className="w-6 h-6 text-neon-purple" />,
      neonGlow: 'purple'
    },
    {
      id: 6,
      name: 'Descontaminação de Pintura + Proteção Cerâmica',
      description: 'Remoção de contaminantes da pintura e aplicação de proteção cerâmica para aumentar brilho, proteção e durabilidade.',
      price: 'Orçamento personalizado',
      fixedPrice: false,
      image: '/images/ceramica.jpg',
      icon: <ShieldCheck className="w-6 h-6 text-neon-magenta" />,
      neonGlow: 'magenta'
    },
    {
      id: 7,
      name: 'Higienização Interna',
      description: 'Limpeza completa do interior do veículo, cuidando de painéis, plásticos, carpetes, bancos e demais superfícies.',
      price: 'Orçamento personalizado',
      fixedPrice: false,
      image: '/images/interna.jpg',
      icon: <UserCheck className="w-6 h-6 text-neon-cyan" />,
      neonGlow: 'cyan'
    }
  ]

  // Galeria de Resultados
  const galleryImages = [
    {
      url: '/images/lavagem.jpg',
      title: 'Lavagem Técnica Detalhada'
    },
    {
      url: '/images/ceramica.jpg',
      title: 'Correção de Pintura e Brilho'
    },
    {
      url: '/images/couro.jpg',
      title: 'Hidratação Premium de Couro'
    },
    {
      url: '/images/motor-unsplash.jpg',
      title: 'Limpeza e Proteção do Motor'
    },
    {
      url: '/images/farois.jpg',
      title: 'Restauração de Faróis'
    },
    {
      url: '/images/showroom.jpg',
      title: 'Finalização Premium Showroom'
    }
  ]

  // Carrossel Mobile
  const galleryRef = useRef<HTMLDivElement>(null)
  
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 300
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Abrir Modal de Orçamento
  const openBudgetModal = (serviceName: string) => {
    setSelectedService(serviceName)
    setBudgetForm(prev => ({ ...prev, service: serviceName }))
    setIsModalOpen(true)
    setFormError('')
  }

  // Enviar Orçamento para WhatsApp
  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!budgetForm.nome || !budgetForm.whatsapp || !budgetForm.veiculo) {
      setFormError('Por favor, preencha os campos obrigatórios (Nome, WhatsApp e Veículo).')
      return
    }

    const message = `Olá, Áquila! Gostaria de solicitar um orçamento.
Nome: ${budgetForm.nome}
Veículo: ${budgetForm.veiculo}
Ano: ${budgetForm.ano || 'Não informado'}
Serviço: ${selectedService}
Observações: ${budgetForm.observacoes || 'Nenhuma'}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    setIsModalOpen(false)
    setBudgetForm({
      nome: '',
      whatsapp: '',
      veiculo: '',
      ano: '',
      observacoes: ''
    })
  }

  // Enviar Agendamento Rápido
  const handleQuickBook = (serviceName: string, price: string) => {
    const message = `Olá, Áquila! Gostaria de agendar o serviço de "${serviceName}" (${price}) para o meu carro.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  // Conversa Geral WhatsApp
  const handleGeneralWhatsApp = () => {
    const message = `Olá, Áquila! Gostaria de saber mais sobre os serviços de estética automotiva.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-neon-cyan/30 selection:text-white font-sans honeycomb-pattern flex flex-col relative">
      
      {/* HEADER */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isHeaderScrolled 
            ? 'bg-dark-bg/85 backdrop-blur-md border-b border-dark-border py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo / Nome */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Áquila Logotipo" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-bold text-xl tracking-wider text-white relative">
              ÁQUILA
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Início</a>
            <a href="#servicos" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Serviços</a>
            <a href="#resultados" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Resultados</a>
            <a href="#diferenciais" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Diferenciais</a>
            <a href="#contato" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Contato</a>
          </nav>

          {/* CTA Header Desktop */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={handleGeneralWhatsApp}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"></span>
              <span className="relative block px-5 py-2 rounded-full bg-dark-bg text-sm font-semibold transition-all group-hover:bg-transparent text-white">
                FALAR COM A ÁQUILA
              </span>
            </button>
          </div>

          {/* Botão Hamburger Mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Menu principal"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-dark-bg/95 border-b border-dark-border backdrop-blur-lg animate-fade-in">
            <nav className="flex flex-col py-6 px-6 gap-4">
              <a 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-neon-cyan transition-colors py-2"
              >
                Início
              </a>
              <a 
                href="#servicos" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-neon-cyan transition-colors py-2"
              >
                Serviços
              </a>
              <a 
                href="#resultados" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-neon-cyan transition-colors py-2"
              >
                Resultados
              </a>
              <a 
                href="#diferenciais" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-neon-cyan transition-colors py-2"
              >
                Diferenciais
              </a>
              <a 
                href="#contato" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-neon-cyan transition-colors py-2"
              >
                Contato
              </a>
              
              <button 
                onClick={() => {
                  setIsMenuOpen(false)
                  handleGeneralWhatsApp()
                }}
                className="mt-4 w-full text-center py-3 bg-gradient-to-r from-neon-cyan to-neon-blue font-bold rounded-lg hover:opacity-95 transition-opacity"
              >
                Falar no WhatsApp
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
          
          {/* Fundo da Hero: Detalhando Carro com Gradiente Escuro */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/85 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src="/images/hero.jpg" 
              alt="Estúdio de detailing automotivo escuro" 
              className="w-full h-full object-cover"
            />
            {/* Lâmpadas colmeia overlay no topo */}
            <div className="honeycomb-overlay opacity-30"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center z-20 flex flex-col items-center">
            
            {/* Emblema da Áquila em Destaque */}
            <div className="mb-8 relative animate-fade-in">
              <div className="absolute inset-0 bg-neon-cyan/20 blur-2xl rounded-full scale-75 animate-pulse-glow"></div>
              <img 
                src="/logo.png" 
                alt="Emblema Áquila" 
                className="h-28 w-28 md:h-36 md:w-36 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] animate-float"
              />
            </div>

            {/* Título Principal */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6 uppercase leading-tight animate-slide-up">
              Estética Automotiva <br/>
              <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
                Em Outro Nível.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 font-light animate-slide-up [animation-delay:200ms]">
              Cuidado, proteção e acabamento premium para o seu veículo em um estúdio de detailing de alto padrão.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slide-up [animation-delay:400ms] mb-12">
              <button 
                onClick={() => openBudgetModal('Todos os Serviços')}
                className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-extrabold rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-[1.02] transition-all"
              >
                SOLICITAR ORÇAMENTO
              </button>
              
              <button 
                onClick={handleGeneralWhatsApp}
                className="px-8 py-4 bg-transparent border border-neon-purple text-white font-extrabold rounded-lg shadow-[0_0_15px_rgba(157,0,255,0.2)] hover:bg-neon-purple/10 hover:shadow-[0_0_25px_rgba(157,0,255,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-neon-purple" />
                FALAR NO WHATSAPP
              </button>
            </div>

            {/* Link de navegação inferior */}
            <a 
              href="#servicos" 
              className="text-gray-500 hover:text-neon-cyan transition-colors text-sm font-medium animate-bounce flex flex-col items-center gap-1 mt-6"
            >
              Conheça nossos serviços
              <span>↓</span>
            </a>

          </div>
        </section>

        {/* SEÇÃO DE SERVIÇOS */}
        <section id="servicos" className="py-24 bg-dark-bg/60 border-t border-dark-border relative">
          
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header da Seção */}
            <div className="text-center mb-16">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight mb-4">
                Nossos Serviços
              </h2>
              <div className="h-[2px] w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-4"></div>
              <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
                Seu carro merece mais do que uma simples lavagem.
              </p>
            </div>

            {/* Grid de Serviços */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`group relative rounded-2xl bg-dark-card border border-dark-border overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                    service.neonGlow === 'cyan' ? 'hover:neon-border-glow-cyan' : 
                    service.neonGlow === 'purple' ? 'hover:neon-border-glow-purple' : 
                    'hover:neon-border-glow-magenta'
                  }`}
                >
                  
                  {/* Imagem do Serviço */}
                  <div className="h-56 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10 opacity-70"></div>
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png' }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Badge de Preço */}
                    <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md border border-dark-border px-3 py-1 rounded-full text-xs font-semibold text-white">
                      {service.price}
                    </div>
                  </div>

                  {/* Detalhes do Serviço */}
                  <div className="p-6 flex flex-col justify-between h-[calc(100%-14rem)] min-h-[220px]">
                    <div>
                      {/* Ícone e Nome */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-black/40 border border-dark-border">
                          {service.icon}
                        </div>
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-neon-cyan transition-colors line-clamp-1">
                          {service.name}
                        </h3>
                      </div>
                      
                      {/* Descrição */}
                      <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Botões do Serviço */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      {service.fixedPrice ? (
                        <>
                          <button 
                            onClick={() => handleQuickBook(service.name, service.price)}
                            className="py-2.5 px-3 bg-gradient-to-r from-neon-purple to-neon-magenta text-white text-xs font-extrabold rounded-lg hover:opacity-95 transition-opacity"
                          >
                            Agendar Serviço
                          </button>
                          <button 
                            onClick={() => handleQuickBook(service.name, service.price)}
                            className="py-2.5 px-3 bg-transparent border border-dark-border text-gray-300 text-xs font-bold rounded-lg hover:border-gray-500 hover:text-white transition-colors"
                          >
                            WhatsApp
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => openBudgetModal(service.name)}
                            className="py-2.5 px-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-black text-xs font-extrabold rounded-lg hover:opacity-95 transition-opacity"
                          >
                            Solicitar Orçamento
                          </button>
                          <button 
                            onClick={() => openBudgetModal(service.name)}
                            className="py-2.5 px-3 bg-transparent border border-dark-border text-gray-300 text-xs font-bold rounded-lg hover:border-gray-500 hover:text-white transition-colors"
                          >
                            WhatsApp
                          </button>
                        </>
                      )}
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SEÇÃO GALERIA / RESULTADOS */}
        <section id="resultados" className="py-24 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header da Seção */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight mb-4">
                  Detalhes que fazem a diferença.
                </h2>
                <div className="h-[2px] w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mb-4"></div>
                <p className="text-gray-400 text-lg font-light">
                  Confira a perfeição do acabamento premium em cada detalhe.
                </p>
              </div>

              {/* Botões do Carrossel (Visíveis no Mobile/Tablet) */}
              <div className="flex items-center gap-3 mt-6 md:mt-0">
                <button 
                  onClick={() => scrollGallery('left')}
                  className="p-3 bg-dark-card border border-dark-border hover:border-neon-cyan rounded-full transition-colors group"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan" />
                </button>
                <button 
                  onClick={() => scrollGallery('right')}
                  className="p-3 bg-dark-card border border-dark-border hover:border-neon-cyan rounded-full transition-colors group"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan" />
                </button>
              </div>
            </div>

            {/* Container Carrossel (Horizontal no Mobile, Grid no Desktop) */}
            <div 
              ref={galleryRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:pb-0 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryImages.map((image, idx) => (
                <div 
                  key={idx}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-full snap-start group relative rounded-2xl overflow-hidden border border-dark-border bg-dark-card aspect-[4/3] transition-all"
                >
                  {/* Imagem */}
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png' }}
                  />
                  
                  {/* Overlay Escuro com Texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-neon-cyan font-display text-xs uppercase tracking-wider mb-1">Áquila Detailing</p>
                    <h4 className="font-display font-bold text-lg text-white">{image.title}</h4>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SEÇÃO DIFERENCIAIS */}
        <section id="diferenciais" className="py-24 bg-dark-bg/60 border-t border-b border-dark-border relative">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header da Seção */}
            <div className="text-center mb-16">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight mb-4">
                Por que escolher a Áquila?
              </h2>
              <div className="h-[2px] w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-4"></div>
              <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
                Elevamos a estética do seu veículo através de processos cientificamente estruturados.
              </p>
            </div>

            {/* Cards de Diferenciais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Diferencial 1 */}
              <div className="group bg-dark-card border border-dark-border p-6 rounded-2xl hover:neon-border-glow-cyan transition-all duration-300">
                <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 w-fit rounded-xl mb-6">
                  <UserCheck className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  Atendimento personalizado
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Cada veículo recebe uma avaliação individual e planejamento específico de estética.
                </p>
              </div>

              {/* Diferencial 2 */}
              <div className="group bg-dark-card border border-dark-border p-6 rounded-2xl hover:neon-border-glow-purple transition-all duration-300">
                <div className="p-3 bg-neon-purple/10 border border-neon-purple/20 w-fit rounded-xl mb-6">
                  <ShieldCheck className="w-6 h-6 text-neon-purple" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-neon-purple transition-colors">
                  Técnica e precisão
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Processos meticulosos e detalhados para preservar cada reentrância e superfície do seu carro.
                </p>
              </div>

              {/* Diferencial 3 */}
              <div className="group bg-dark-card border border-dark-border p-6 rounded-2xl hover:neon-border-glow-magenta transition-all duration-300">
                <div className="p-3 bg-neon-magenta/10 border border-neon-magenta/20 w-fit rounded-xl mb-6">
                  <Sparkles className="w-6 h-6 text-neon-magenta" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-neon-magenta transition-colors">
                  Produtos de qualidade
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Utilização exclusiva de compostos importados, ceras de alta carnaúba e coatings cerâmicos de ponta.
                </p>
              </div>

              {/* Diferencial 4 */}
              <div className="group bg-dark-card border border-dark-border p-6 rounded-2xl hover:neon-border-glow-cyan transition-all duration-300">
                <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 w-fit rounded-xl mb-6">
                  <Award className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  Acabamento premium
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Garantia de mais brilho, profundidade de cor e proteção robusta em cada serviço prestado.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* CTA FINAL SECTION */}
        <section className="relative py-32 flex items-center justify-center overflow-hidden">
          
          {/* Fundo do CTA Final */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/90 via-dark-bg/70 to-dark-bg z-10"></div>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img 
              src="/images/ceramica.jpg" 
              alt="Carro premium polido brilhando sob luz profissional" 
              className="w-full h-full object-cover"
            />
            {/* Lâmpadas colmeia overlay */}
            <div className="honeycomb-overlay opacity-30"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center z-20 relative flex flex-col items-center">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-6 uppercase tracking-tight">
              Seu carro merece esse cuidado.
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 font-light">
              Agende seu horário e descubra um novo nível de estética automotiva.
            </p>

            <button 
              onClick={handleGeneralWhatsApp}
              className="px-8 py-5 w-full sm:w-auto bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-white font-extrabold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              FALAR COM A ÁQUILA NO WHATSAPP
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="contato" className="bg-black border-t border-dark-border pt-16 pb-24 md:pb-16 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Coluna 1: Nome e Descrição */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Áquila" className="h-8 w-auto" />
              <span className="font-display font-bold text-white text-lg tracking-wider">ÁQUILA</span>
            </div>
            <p className="text-sm font-light text-gray-500 leading-relaxed max-w-xs">
              Estética automotiva premium. Cuidado minucioso e revestimentos de alta durabilidade para o seu veículo.
            </p>
          </div>

          {/* Coluna 2: Horários */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-neon-purple" />
              Horário de Funcionamento
            </h4>
            <ul className="text-sm font-light flex flex-col gap-2">
              <li className="flex justify-between">
                <span>Segunda a Sábado</span>
                <span className="text-white font-medium">08h às 18h</span>
              </li>
              <li className="text-xs text-gray-600 flex items-center gap-1.5 mt-1">
                <AlertCircle className="w-3 h-3 text-neon-magenta flex-shrink-0" />
                Somente com hora marcada
              </li>
            </ul>
          </div>

          {/* Coluna 3: Endereço */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neon-cyan" />
              Localização
            </h4>
            <p className="text-sm font-light leading-relaxed">
              Rua Terezinha da Conceição Alves, 27<br />
              Jardim Europa, Itu - SP<br />
              CEP 13308-451, Brasil
            </p>
          </div>

          {/* Coluna 4: Contato */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-neon-magenta" />
              Contatos
            </h4>
            <ul className="text-sm font-light flex flex-col gap-3">
              <li>
                <a 
                  href={`mailto:${EMAIL_CONTACT}`} 
                  className="hover:text-neon-cyan transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                  {EMAIL_CONTACT}
                </a>
              </li>
              <li>
                <a 
                  href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-cyan transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha Divisória de Direitos */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; 2026 Áquila &mdash; Todos os direitos reservados.
          </p>
          
          <button 
            onClick={handleGeneralWhatsApp}
            className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border hover:border-neon-cyan hover:text-white rounded-lg transition-all text-xs"
          >
            <MessageSquare className="w-4 h-4 text-neon-cyan" />
            Fale Conosco
          </button>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE DO WHATSAPP (Desktop / Tablet) */}
      <button
        onClick={handleGeneralWhatsApp}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all group flex items-center justify-center animate-pulse-glow"
        title="Fale Conosco no WhatsApp"
        aria-label="Fale conosco no WhatsApp"
      >
        <svg 
          className="w-7 h-7 fill-current" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.791-4.382 9.794-9.786.002-2.593-1.007-5.031-2.842-6.866C16.386 2.116 13.948 1.1 11.39 1.1 5.99 1.1 1.602 5.485 1.6 10.89c-.001 1.516.405 2.999 1.173 4.303l-.986 3.6 3.694-.969zm12.39-4.832c-.3-.15-1.782-.88-2.052-.977-.27-.098-.467-.147-.663.15-.197.296-.763.977-.935 1.173-.172.197-.344.22-.644.07-1.129-.567-1.928-1.228-2.658-2.482-.19-.328-.19-.537-.034-.73.14-.173.3-.35.45-.523.15-.172.2-.296.3-.492.1-.197.05-.369-.025-.52-.075-.15-.663-1.597-.91-2.185-.24-.582-.487-.5-.663-.51-.17-.008-.368-.01-.565-.01-.197 0-.517.073-.787.37-.27.295-1.031 1.008-1.031 2.455s1.054 2.845 1.202 3.042c.148.197 2.075 3.168 5.027 4.444.702.304 1.25.486 1.677.621.705.224 1.346.193 1.854.118.566-.084 1.782-.73 2.032-1.432.25-.702.25-1.303.175-1.43-.075-.128-.27-.2-.57-.35z"/>
        </svg>
        <span className="absolute right-full mr-3 bg-dark-card border border-dark-border text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Fale conosco
        </span>
      </button>

      {/* BOTTOM MOBILE FLOATING CTA BAR (Visível apenas em telas menores) */}
      <div className="fixed bottom-0 left-0 w-full z-45 md:hidden p-4 bg-dark-bg/90 backdrop-blur-md border-t border-dark-border flex justify-stretch">
        <button 
          onClick={() => openBudgetModal('Todos os Serviços')}
          className="w-full py-4.5 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-white font-extrabold rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2.5 text-base"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.791-4.382 9.794-9.786.002-2.593-1.007-5.031-2.842-6.866C16.386 2.116 13.948 1.1 11.39 1.1 5.99 1.1 1.602 5.485 1.6 10.89c-.001 1.516.405 2.999 1.173 4.303l-.986 3.6 3.694-.969zm12.39-4.832c-.3-.15-1.782-.88-2.052-.977-.27-.098-.467-.147-.663.15-.197.296-.763.977-.935 1.173-.172.197-.344.22-.644.07-1.129-.567-1.928-1.228-2.658-2.482-.19-.328-.19-.537-.034-.73.14-.173.3-.35.45-.523.15-.172.2-.296.3-.492.1-.197.05-.369-.025-.52-.075-.15-.663-1.597-.91-2.185-.24-.582-.487-.5-.663-.51-.17-.008-.368-.01-.565-.01-.197 0-.517.073-.787.37-.27.295-1.031 1.008-1.031 2.455s1.054 2.845 1.202 3.042c.148.197 2.075 3.168 5.027 4.444.702.304 1.25.486 1.677.621.705.224 1.346.193 1.854.118.566-.084 1.782-.73 2.032-1.432.25-.702.25-1.303.175-1.43-.075-.128-.27-.2-.57-.35z"/>
          </svg>
          ORÇAR PELO WHATSAPP
        </button>
      </div>

      {/* MODAL DE ORÇAMENTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Escuro */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          ></div>

          {/* Caixa do Modal */}
          <div className="relative bg-dark-card border border-dark-border w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-slide-up z-10">
            
            {/* Linha Decorativa Superior */}
            <div className="h-1.5 w-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple"></div>

            {/* Cabeçalho do Modal */}
            <div className="p-6 pb-4 flex justify-between items-start border-b border-dark-border">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Solicitar Orçamento</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Preencha os dados abaixo e entraremos em contato pelo WhatsApp.
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-dark-border transition-all"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleBudgetSubmit} className="p-6 space-y-4">
              
              {/* Notificação de Erro */}
              {formError && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neon-magenta/15 border border-neon-magenta/30 text-neon-magenta text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Serviço Selecionado (Informativo) */}
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1.5">
                  Serviço Solicitado
                </label>
                <input 
                  type="text" 
                  value={selectedService}
                  readOnly 
                  className="w-full bg-black border border-dark-border text-neon-cyan font-semibold text-sm px-4 py-3 rounded-lg focus:outline-none cursor-default"
                />
              </div>

              {/* Campo Nome */}
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">
                  Nome Completo <span className="text-neon-magenta">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Seu nome"
                  required
                  value={budgetForm.nome}
                  onChange={(e) => setBudgetForm({ ...budgetForm, nome: e.target.value })}
                  className="w-full bg-black border border-dark-border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>

              {/* Campo WhatsApp */}
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">
                  Número de WhatsApp <span className="text-neon-magenta">*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="Ex: (11) 99999-9999"
                  required
                  value={budgetForm.whatsapp}
                  onChange={(e) => setBudgetForm({ ...budgetForm, whatsapp: e.target.value })}
                  className="w-full bg-black border border-dark-border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>

              {/* Grid Veículo e Ano */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">
                    Modelo do Veículo <span className="text-neon-magenta">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: Golf GTI"
                    required
                    value={budgetForm.veiculo}
                    onChange={(e) => setBudgetForm({ ...budgetForm, veiculo: e.target.value })}
                    className="w-full bg-black border border-dark-border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5">
                    Ano
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: 2021"
                    value={budgetForm.ano}
                    onChange={(e) => setBudgetForm({ ...budgetForm, ano: e.target.value })}
                    className="w-full bg-black border border-dark-border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
              </div>

              {/* Campo Observações */}
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-1.5">
                  Observações adicionais (Opcional)
                </label>
                <textarea 
                  rows={3}
                  placeholder="Detalhes sobre o estado do carro, preferências, etc."
                  value={budgetForm.observacoes}
                  onChange={(e) => setBudgetForm({ ...budgetForm, observacoes: e.target.value })}
                  className="w-full bg-black border border-dark-border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                ></textarea>
              </div>

              {/* Botão Enviar */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-extrabold rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  ENVIAR ORÇAMENTO PELO WHATSAPP
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}

export default App
