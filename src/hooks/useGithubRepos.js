import { useEffect, useState } from 'react';
const username = import.meta.env.VITE_GITHUB_USERNAME || 'AnayatUllah123';
export function useGithubRepos() {
    const [state, setState] = useState({ loading: true, repos: [], error: false });
    useEffect(() => {
        const controller = new AbortController();
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' }
        })
            .then((response) => {
            if (!response.ok)
                throw new Error('GitHub request failed');
            return response.json();
        })
            .then((repos) => {
            const ranked = repos
                .filter((repo) => !repo.fork && !repo.archived)
                .sort((a, b) => {
                const scoreA = (a.stargazers_count || 0) * 4 + (a.forks_count || 0) * 2 + Date.parse(a.pushed_at || 0) / 1e13;
                const scoreB = (b.stargazers_count || 0) * 4 + (b.forks_count || 0) * 2 + Date.parse(b.pushed_at || 0) / 1e13;
                return scoreB - scoreA;
            })
                .slice(0, 6);
            setState({ loading: false, repos: ranked, error: false });
        })
            .catch((error) => {
            if (error.name !== 'AbortError')
                setState({ loading: false, repos: [], error: true });
        });
        return () => controller.abort();
    }, []);
    return { ...state, username };
}
