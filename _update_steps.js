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
        path: "sandbox/ui",
        message: [
          "git pull",
          "npx --yes pnpm@9.15.9 install",
          "npx --yes pnpm@9.15.9 --filter @paperclipai/ui build",
        ],
      },
    },
    {
      method: "shell.run",
      params: {
        message: [
          "node -e \"const fs=require('fs');const src='sandbox/ui/ui/dist';const dst='sandbox/server/server/ui-dist';if(!fs.existsSync(src)){throw new Error('UI build not found: '+src);}fs.rmSync(dst,{recursive:true,force:true});fs.mkdirSync(dst,{recursive:true});fs.cpSync(src,dst,{recursive:true});console.log('Updated server/ui-dist from latest UI build');\"",
        ],
      },
    },
  ],
};
