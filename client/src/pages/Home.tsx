import { useState } from 'react';

/**
 * Portal Cativo - Minimalismo Corporativo
 * Design: Azul corporativo (#001F3F), Branco, Laranja (#FF6B35)
 * Tipografia: Poppins (títulos), Inter (corpo)
 * Vídeo de fundo: MP4 local
 * Fluxo: Botão inicial → Formulário ao clicar
 */

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      console.log('Acesso à rede liberado para:', formData);
    }, 1500);
  };

  const handleBackClick = () => {
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', company: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="captive-portal-wrapper">
      {/* Vídeo de Fundo Local */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={handleVideoCanPlay}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Overlay Escuro */}
      <div className={`overlay ${videoLoaded ? 'visible' : 'hidden'}`} />

      {/* Conteúdo Principal */}
      <div className={`portal-content ${videoLoaded ? 'visible' : 'hidden'}`}>
        {/* Logo - Aparece com o vídeo */}
        <div className="logo-container">
          <img src="/images/logo-urca.png" alt="Grupo Urca Energia" />
        </div>

        {/* Conteúdo Dinâmico */}
        {!showForm ? (
          // Tela Inicial com Botão
          <div className="initial-screen">
            <div className="welcome-message">
              <h1 className="welcome-title">Bem-vindo</h1>
              <p className="welcome-subtitle">
                Transformando energia em oportunidades
              </p>
            </div>

            <button
              className="form-button initial-button"
              onClick={() => setShowForm(true)}
            >
              Acessar Portal
            </button>
          </div>
        ) : !submitted ? (
          // Formulário
          <div className="form-card">
            <div className="form-header">
              <div className="form-header-logo">
                <img src="/images/logo-urca.png" alt="Grupo Urca Energia" className="form-logo" />
              </div>
              <h1 className="form-title">Acesso à Rede</h1>
              <p className="form-subtitle">
                Preencha os dados abaixo para continuar
              </p>
            </div>

            <div className="form-divider" />

            <form onSubmit={handleSubmit}>
              {/* Campo Nome */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              {/* Campo Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="seu.email@empresa.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {/* Campo Telefone */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="(11) 9999-9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone}</div>
                )}
              </div>

              {/* Campo Empresa */}
              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-input"
                  placeholder="Nome da sua empresa"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.company && (
                  <div className="error-message">{errors.company}</div>
                )}
              </div>

              {/* Botões */}
              <div className="form-buttons">
                <button
                  type="submit"
                  className="form-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processando...' : 'Acessar Portal'}
                </button>
                <button
                  type="button"
                  className="form-button-secondary"
                  onClick={handleBackClick}
                  disabled={isLoading}
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Tela de Sucesso
          <div className="form-card success-card">
            <div style={{ textAlign: 'center' }}>
              <div className="success-icon">✓</div>
              <h2 className="form-title success-title">
                Acesso Liberado!
              </h2>
              <p className="form-subtitle">
                Bem-vindo, {formData.name.split(' ')[0]}!
              </p>
              <p className="form-subtitle">
                Sua conexão com a rede foi autorizada. Você pode agora acessar
                todos os recursos disponíveis.
              </p>
              <div className="form-divider" />
              <p className="success-timestamp">
                Acesso em: {new Date().toLocaleString('pt-BR')}
              </p>

              <button
                className="form-button-secondary"
                onClick={handleBackClick}
                style={{ marginTop: '1.5rem' }}
              >
                Fazer novo acesso
              </button>
            </div>
          </div>
        )}

        {/* Rodápé */}
        {videoLoaded && (
          <div className="footer-text">
            <p>© 2025 Grupo Urca Energia. Todos os direitos reservados.</p>
          </div>
        )}
      </div>

      {/* Loading Screen */}
      {!videoLoaded && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}
