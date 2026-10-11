# Live Resume

Deployed site for [Ernest Raday](https://ejrad.github.io/resume/) — resume content plus an auto-updating TryHackMe streak and recently completed rooms.

## Local

```bash
npm install
npm run update:demo   # or npm run update once TryHackMe IDs are set
npm run dev           # http://127.0.0.1:43127
```

## Configure

Edit [`config/profile.json`](config/profile.json) for resume copy and TryHackMe IDs.  
Details: [`SETUP.md`](SETUP.md).

## Deploy

Push to `main`. GitHub Actions builds the static site and deploys to **GitHub Pages** at:

`https://ejrad.github.io/resume/`

Enable Pages: Settings → Pages → Source: **GitHub Actions**.
