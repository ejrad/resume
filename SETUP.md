# Setup

## Resume content

Edit `config/profile.json` (name, summary, experience, projects, skills, links).

## TryHackMe

In `config/profile.json` → `tryhackme`, or as repo **Actions variables**:

| Field / var | Source |
| --- | --- |
| `username` / `THM_USERNAME` | `https://tryhackme.com/p/<username>` |
| `userPublicId` / `THM_USER_PUBLIC_ID` | Badge iframe `userPublicId=` |
| `userHash` / `THM_USER_HASH` | Network tab → `completed-rooms?user=` |

Then:

```bash
npm run update
```

## GitHub Pages

1. Repo Settings → Pages → Build and deployment → Source: **GitHub Actions**
2. Push to `main` (or run **Deploy live resume** manually)
3. Site: `https://ejrad.github.io/resume/`
