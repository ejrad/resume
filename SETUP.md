# Setup — Live Resume

This repo regenerates `README.md` from `config/profile.json` plus live TryHackMe data.

## 1. Edit your resume

Open [`config/profile.json`](config/profile.json) and fill in:

- name, tagline, summary
- experience, projects, skills, education
- links (`github`, `email`, `linkedin`, `website`)

## 2. Connect TryHackMe

In `config/profile.json` → `tryhackme`:

| Field | Where to get it |
| --- | --- |
| `username` | Your TryHackMe handle (`https://tryhackme.com/p/<username>`) |
| `userPublicId` | Profile → badge embed iframe → `userPublicId=` number |
| `userHash` | DevTools → Network on your public profile → request like `completed-rooms?user=<hash>` |

Or set GitHub **Actions variables** (Settings → Secrets and variables → Actions → Variables):

- `THM_USERNAME`
- `THM_USER_PUBLIC_ID`
- `THM_USER_HASH`

## 3. Refresh locally

```bash
npm install
npm run update        # live fetch when configured
npm run update:demo   # seeded demo rooms/streak
```

## 4. Auto-update on GitHub

[`.github/workflows/update-resume.yml`](.github/workflows/update-resume.yml) runs every 6 hours and on manual dispatch. Enable Actions, set the variables above, then **Run workflow**.

## Better Markdown

Widgets and room galleries use [Better Markdown](https://github.com/Cyborg-Taco/Better-Markdown) (`better-markdown-theta.vercel.app` APIs). Room title cards are also written to `assets/rooms/` so the README still looks good if a remote image is blocked.

## Push to GitHub (`ejrad/resume`)

This agent workspace cannot authenticate to GitHub by default. From a machine with access:

```bash
git clone https://github.com/ejrad/resume.git
cd resume
# copy this project's files in, or:
git remote add cursor <this-agent-remote-if-you-have-it>
```

Or from this project once `gh` / a PAT is available:

```bash
git remote add github https://github.com/ejrad/resume.git
git push -u github cursor/realtime-resume-da4e:main
```

## Profile README tip

To show this on your GitHub **profile**, you still need a public repo named exactly your username (`ejrad`). This project can live at [`ejrad/resume`](https://github.com/ejrad/resume) as a showcase repo.
