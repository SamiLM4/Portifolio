export default function ProjectCard({ repo, langColor }) {

    function handleMouseMove(e) {

        const rect = e.currentTarget.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
    }

    const description = repo.description || "Sem descrição disponível."

    return (

        <div className="project-card" onMouseMove={handleMouseMove}>

            <div className="project-header">

                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-title"
                >
                    {repo.name}
                </a>

            </div>

            <p className="project-desc">
                {description}
            </p>

            <div className="project-footer">

                <div className="project-lang">

                    {repo.language ? (
                        <>
                            <span
                                className="lang-dot"
                                style={{ backgroundColor: langColor }}
                            />
                            <span>{repo.language}</span>
                        </>
                    ) : (
                        <span>N/A</span>
                    )}

                </div>

                <div className="project-stats">

                    <span className="stat">
                        ⭐ {repo.stargazers_count}
                    </span>

                    <span className="stat">
                        🍴 {repo.forks_count}
                    </span>

                </div>

            </div>

        </div>
    )
}