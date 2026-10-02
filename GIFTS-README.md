# Gift list

Edit `site/gifts.json` (the only file you need to touch).

```json
{"updated":"YYYY-MM-DD","items":[
  {"name":"","url":"","price":"","description":"","category":""}
]}
```

- Required: `name`. Optional: `url`, `price`, `description`, `category`.
- With `url`: the name becomes a link (http/https only) that opens in a new tab.
- Description-only item (no specific product): omit `url`; the name shows as plain text.
- Bump `updated` when you edit. Validate: `python3 -m json.tool site/gifts.json`.
- Items show in file order.
- Redeploy by rsync: sync `site/` to the server's web root (only `gifts.json` needs to change for list edits).
