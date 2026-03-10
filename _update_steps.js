module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: ["git pull", "npx --yes pnpm@9.15.9 install"],
      },
    },
    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: [
          "npx --yes pnpm@9.15.9 --filter @paperclipai/ui build",
        ],
      },
    },
    {
      method: "shell.run",
      params: {
        message: [
          "node -e \"const fs=require('fs');const candidates=['sandbox/server/ui/dist','sandbox/ui/ui/dist','sandbox/ui/dist'];const src=candidates.find(fs.existsSync);const dst='sandbox/server/server/ui-dist';if(!src){throw new Error('UI build not found. Checked: '+candidates.join(', '));}fs.rmSync(dst,{recursive:true,force:true});fs.mkdirSync(dst,{recursive:true});fs.cpSync(src,dst,{recursive:true});console.log('Updated server/ui-dist from '+src);\"",
        ],
      },
    },
  ],
};
