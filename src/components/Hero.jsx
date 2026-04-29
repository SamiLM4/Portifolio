function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container hero-content">
                <div className="glass-card profile-card">
                    <img
                        src="https://github.com/SamiLM4.png"
                        alt="Murilo Profile"
                        className="profile-img"
                    />

                    <h1>Olá, eu sou <span>Murilo</span></h1>

                    <p className="subtitle">
                        Desenvolvedor & Criador de Soluções
                    </p>

                    <p className="bio">
                        Explorando o mundo do desenvolvimento de software e criando projetos incríveis.
                    </p>

                    <div className="hero-actions">

                        <a href="#projects" className="btn btn-primary">
                            Ver Meus Projetos
                        </a>

                        <a
                            href="https://github.com/SamiLM4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            Acessar GitHub
                        </a>

                        <a href="#certificates" className="btn btn-primary">
                            Ver Meus Certificados
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero