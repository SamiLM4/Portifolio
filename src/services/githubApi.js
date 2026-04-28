export async function getRepos(username) {

    const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    )

    if (!response.ok) {
        throw new Error("Erro ao carregar projetos")
    }

    const data = await response.json()

    return data
}