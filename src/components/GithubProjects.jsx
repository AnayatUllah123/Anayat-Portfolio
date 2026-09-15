import { ExternalLink, GitFork, Github, Star, GitBranch, Code2 } from 'lucide-react';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { profile } from '../data/portfolioData';
export default function GithubProjects() {
    const { loading, repos, error, username } = useGithubRepos();
    return <section id="github" className="section shell github-section">
  <div className="section-head"><div><span className="section-kicker">OPEN SOURCE</span><h2>GitHub activity with <em>real code.</em></h2></div><a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> @{username}</a></div>
  <div className="github-shell reveal"><aside className="github-profile-card"><div className="github-avatar"><Github /></div><span>PUBLIC PROFILE</span><h3>{profile.name}</h3><p>Repositories, experiments and implementation work from my ongoing development journey.</p><div className="github-mini-stats"><div><b>{repos.length || '—'}</b><small>Loaded repos</small></div><div><b>Full Stack</b><small>Focus</small></div></div><a href={profile.github} target="_blank" rel="noreferrer">Open GitHub profile <ExternalLink size={14}/></a></aside>
   <div className="repo-grid">{loading && Array.from({ length: 4 }).map((_, i) => <div className="repo-card skeleton" key={i}/>)}{!loading && repos.slice(0, 6).map((r, i) => <a className="repo-card" key={r.id} href={r.html_url} target="_blank" rel="noreferrer"><div className="repo-number">0{i + 1}</div><div className="repo-top"><span><Code2 size={14}/>{r.language || 'Repository'}</span><ExternalLink size={15}/></div><h3>{r.name.replaceAll('-', ' ')}</h3><p>{r.description || 'Explore the repository for source code, implementation details and project structure.'}</p><footer><span><Star size={12}/>{r.stargazers_count}</span><span><GitFork size={12}/>{r.forks_count}</span><span><GitBranch size={12}/> main</span></footer><div className="repo-shine"/></a>)}{!loading && error && <div className="github-fallback"><Github /><span>Live GitHub feed is unavailable right now.</span><a href={profile.github} target="_blank" rel="noreferrer">Open profile →</a></div>}</div>
  </div>
 </section>;
}
