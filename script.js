document.addEventListener('DOMContentLoaded', () => {
    const username = 'SamiLM4';
    // Buscando até 100 repositórios para garantir que pegue todos
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
    const projectsGrid = document.getElementById('projects-grid');
    const loading = document.getElementById('loading');
    const paginationContainer = document.getElementById('pagination');

    let allRepos = [];
    let currentPage = 1;
    const itemsPerPage = 6;

    // Language colors map
    const langColors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Python': '#3572A5',
        'PHP': '#4F5D95',
        'Java': '#b07219',
        'C#': '#178600',
        'C++': '#f34b7d',
        'Vue': '#41b883',
        'React': '#61dafb',
        'Jupyter Notebook': '#DA5B0B'
    };

    async function fetchProjects() {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Não foi possível carregar os projetos.');
            }

            const repos = await response.json();
            
            loading.style.display = 'none';

            // Ordenando os repositórios por quantidade de estrelas (maior para menor)
            allRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

            if (allRepos.length === 0) {
                projectsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Nenhum projeto público encontrado.</p>';
                return;
            }

            renderPage(1);

        } catch (error) {
            console.error('Error fetching projects:', error);
            loading.innerHTML = `
                <div style="color: #ef4444; text-align: center;">
                    <i class="ph ph-warning-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Erro ao carregar os projetos.</p>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Por favor, tente novamente mais tarde.</p>
                </div>
            `;
        }
    }

    function renderPage(page) {
        currentPage = page;
        projectsGrid.innerHTML = '';
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const reposToShow = allRepos.slice(startIndex, endIndex);

        reposToShow.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            const langColor = langColors[repo.language] || '#8b949e';
            const description = repo.description || 'Sem descrição disponível.';
            
            card.innerHTML = `
                <div class="project-header">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-title">
                        <i class="ph ph-folder-notch"></i>
                        ${repo.name}
                    </a>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo">
                            <i class="ph ph-github-logo"></i>
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo" style="margin-left: 8px;">
                                <i class="ph ph-arrow-square-out"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
                <p class="project-desc">${description}</p>
                <div class="project-footer">
                    <div class="project-lang">
                        ${repo.language ? `
                            <span class="lang-dot" style="background-color: ${langColor}"></span>
                            <span>${repo.language}</span>
                        ` : '<span>N/A</span>'}
                    </div>
                    <div class="project-stats">
                        <span class="stat" title="Stars"><i class="ph ph-star"></i> ${repo.stargazers_count}</span>
                        <span class="stat" title="Forks"><i class="ph ph-git-fork"></i> ${repo.forks_count}</span>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });

        // Add glow effect on hover
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        renderPagination();
    }

    function renderPagination() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(allRepos.length / itemsPerPage);
        
        if (totalPages <= 1) return;

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerHTML = '<i class="ph ph-caret-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) renderPage(currentPage - 1);
        });
        paginationContainer.appendChild(prevBtn);

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => renderPage(i));
            paginationContainer.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerHTML = '<i class="ph ph-caret-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) renderPage(currentPage + 1);
        });
        paginationContainer.appendChild(nextBtn);
    }

    fetchProjects();
});
