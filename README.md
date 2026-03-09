# Paperclip Pinokio App

Pinokio wrapper for [paperclipai/paperclip](https://github.com/paperclipai/paperclip).

## What this app does

- Clones Paperclip into:
  - `sandbox/server`
  - `sandbox/ui`
- Installs dependencies in both clones
- Builds UI from `sandbox/ui`
- Copies built UI into `sandbox/server/server/ui-dist`
- Starts Paperclip from `sandbox/server` and exposes the local web UI inside Pinokio
- Uses `sandbox/config/settings.json` for runtime port/env config

## Files

- `pinokio.js` - app menu and actions
- `install.js` - clone + install + build + config bootstrap
- `update.js` - pull + reinstall + rebuild UI
- `start.js` - run server with one click
- `sandbox/config/settings.json` - editable runtime settings

## Config

Edit `sandbox/config/settings.json`:

```json
{
  "serverPort": 3030,
  "uiPort": 3031,
  "env": {
    "OPENAI_API_KEY": "",
    "ANTHROPIC_API_KEY": ""
  }
}
```

Notes:
- `serverPort` is used as `PORT` for Paperclip.
- `env` is injected directly into the Paperclip process, so cloud integrations and API keys work normally.
- `uiPort` is included for compatibility with the requested schema.

## Run

1. Click `Install`
2. Click `Start`
3. Click `Open Paperclip`

## Update

Click `Update` to:
- pull latest git changes
- reinstall dependencies
- rebuild UI
- refresh server static UI bundle
