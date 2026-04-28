import { useEffect, useState } from "react"
import { getRepos } from "../services/githubApi"
import ProjectCard from "./ProjectCard"
import Pagination from "./Pagination"

const username = "SamiLM4"

const langColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    PHP: "#4F5D95",
    Java: "#b07219",
    "C#": "#178600",
    "C++": "#f34b7d",
    Vue: "#41b883",
    React: "#61dafb",
    "Jupyter Notebook": "#DA5B0B",
}

export default function Projects() {

    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    useEffect(() => {

        async function fetchProjects() {

            try {

                const data = await getRepos(username)

                const sorted = data.sort(
                    (a, b) => b.stargazers_count - a.stargazers_count
                )

                setRepos(sorted)

            } catch (err) {
                console.error(err)
            }

            setLoading(false)
        }

        fetchProjects()

    }, [])

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    const reposToShow = repos.slice(start, end)

    const totalPages = Math.ceil(repos.length / itemsPerPage)

    return (
        <section id="projects" className="projects-section">

            <div className="container">

                <div className="section-header">
                    <h2>Meus <span>Projetos</span></h2>
                    <p>Repositórios públicos puxados diretamente do GitHub.</p>
                </div>

                {loading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Carregando projetos...</p>
                    </div>
                )}

                <div className="projects-grid">

                    {reposToShow.map(repo => (

                        <ProjectCard
                            key={repo.id}
                            repo={repo}
                            langColor={langColors[repo.language] || "#8b949e"}
                        />

                    ))}

                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />

            </div>

        </section>
    )
}