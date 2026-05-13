import { useState } from "react"

const certificates = [
    {
        name: "ASP.NET 8",
        file: "/certificados/aspnet-8e9.pdf"
    },
    {
        name: "C# Avançado",
        file: "/certificados/csharp-avancado.pdf"
    },
    {
        name: "NLW Operator - IA",
        file: "/certificados/nlw-operator-ia-python.pdf"
    },
    {
        name: "Participação e Outros",
        file: "/certificados/certificados-participacao.pdf"
    },
    {
        name: "Introdução à Cybersecurity",
        file: "/certificados/introducao-cybersecurity.pdf"
    },
    {
        name: "Linux Unhatched",
        file: "/certificados/linux-unhatched.pdf"
    },
    {
        name: "Redes do Básico ao Avançado",
        file: "/certificados/redes-basico-avancado.pdf"
    },
    {
        name: "Automacao N8N",
        file: "/certificados/n8n.pdf"
    },
    {
        name: "Digital Tech Show 2026",
        file: "/certificados/DigitalTechShow2k26.pdf"
    }
]

export default function Certificates() {

    const [index, setIndex] = useState(0)

    function next() {
        setIndex((prev) => (prev + 1) % certificates.length)
    }

    function prev() {
        setIndex((prev) =>
            prev === 0 ? certificates.length - 1 : prev - 1
        )
    }

    const cert = certificates[index]

    return (

        <section id="certificates" className="certificates-section">

            <div className="container">

                <div className="section-header">
                    <h2>Meus <span>Certificados</span></h2>
                    <p>Alguns dos cursos e certificações que concluí.</p>
                </div>

                <div className="carousel">

                    <button onClick={prev} className="carousel-btn">
                        ◀
                    </button>

                    <div className="certificate-viewer">

                        <iframe
                            src={`${cert.file}#view=FitH`}
                            title={cert.name}
                            width="100%"
                            height="600"
                            style={{ border: "none" }}
                        />

                    </div>

                    <button onClick={next} className="carousel-btn">
                        ▶
                    </button>

                </div>

                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    {cert.name}
                </p>

            </div>

        </section>

    )
}