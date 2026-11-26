import { GithubCommitTicker } from "@/components/github-commit-ticker";
import { RobloxPlayerTicker } from "@/components/roblox-player-ticker";
import { parseProject } from "@/lib/projects";
import type { Profile, RobloxDataMap } from "@/lib/types";

export function ProjectsSection({
  profile,
  robloxData = {},
}: {
  profile: Profile;
  robloxData?: RobloxDataMap;
}) {
  const projects = profile.projects || [];
  if (projects.length === 0) return null;

  const parsedProjects = projects.map(parseProject);

  return (
    <section id="projects" className="aero-band aero-band-projects">
      <div className="aero-band-inner">
        <div className="aero-section-head">
          <div>
            <h2>Projects</h2>
          </div>
          {profile.github ? (
            <a
              className="aero-btn aero-btn-leaf"
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
            >
              @{profile.github} on GitHub
            </a>
          ) : null}
        </div>

        <div className="aero-window aero-window-delay-1">
          <div className="aero-titlebar">
            <span className="orb" aria-hidden="true" />
            <span>Currently Building</span>
          </div>
          <div className="aero-window-body">
            <ul className="project-grid">
              {parsedProjects.map((project) => (
                <li key={project.name} className="project-card">
                  <div className="project-card-titlebar aero-titlebar">
                    <div className="project-card-titlebar-left">
                      <span className="orb" aria-hidden="true" />
                      <h3 className="project-card-title">{project.name}</h3>
                    </div>
                    <div className="project-card-titlebar-right">
                      {project.dateRange ? (
                        <span className="project-card-date">{project.dateRange}</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="project-card-body">
                    {project.url.includes("github.com") ? (
                      <div className="project-card-commit-row">
                        <GithubCommitTicker repoUrl={project.url} />
                      </div>
                    ) : project.url.includes("roblox.com/games/") ? (
                      <div className="project-card-commit-row">
                        <RobloxPlayerTicker
                          gameUrl={project.url}
                          universeId={project.robloxUniverseId}
                          initialPeak={
                            project.robloxUniverseId
                              ? robloxData[project.robloxUniverseId]
                              : undefined
                          }
                          githubRepo={
                            profile.github ? `${profile.github}/resume` : undefined
                          }
                        />
                      </div>
                    ) : null}

                    {project.tags.length > 0 ? (
                      <ul className="project-tags" aria-label="Technologies used">
                        {project.tags.map((tag) => (
                          <li key={tag} className="project-tag">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <p className="project-card-desc">{project.description}</p>

                    <div className="project-card-footer">
                      <a
                        className="aero-btn aero-btn-chrome project-card-link"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View project
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
