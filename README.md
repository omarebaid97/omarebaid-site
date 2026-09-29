# omarebaid-site

Omar's portfolio and gift list, live at https://omarebaid.com.

Static site, no build step. Plain HTML/CSS/JSON in `site/`.

## Editing the gift list

Edit `site/gifts.json` only. Format and rules are in [GIFTS-README.md](GIFTS-README.md).

## Deploying

From the repo root:

```sh
rsync -av --delete --exclude '.DS_Store' site/ homelab:/home/omar/omarebaid-site/site/
```

## deploy/

`deploy/` holds the nginx container config (`docker-compose.yml`, `nginx.conf`) as it runs on the server. It is a reference copy; the server's files are what actually run.
