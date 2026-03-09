module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "mkdir -p sandbox",
          "mkdir -p sandbox/config",
          "mkdir -p sandbox/data",
        ],
      },
    },

    {
      when: "{{!exists('sandbox/server/.git')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/paperclipai/paperclip.git sandbox/server",
      },
    },
    {
      when: "{{!exists('sandbox/ui/.git')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/paperclipai/paperclip.git sandbox/ui",
      },
    },

    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: [
          "npx --yes pnpm@9.15.9 install",
        ],
      },
    },
    {
      method: "shell.run",
      params: {
        path: "sandbox/ui",
        message: [
          "npx --yes pnpm@9.15.9 install",
        ],
      },
    },

    {
      method: "shell.run",
      params: {
        path: "sandbox/ui",
        message: ["npx --yes pnpm@9.15.9 --filter @paperclipai/ui build"],
      },
    },

    {
      method: "shell.run",
      params: {
        message: [
          "node -e \"const fs=require('fs');const src='sandbox/ui/ui/dist';const dst='sandbox/server/server/ui-dist';if(!fs.existsSync(src)){throw new Error('UI build not found: '+src);}fs.rmSync(dst,{recursive:true,force:true});fs.mkdirSync(dst,{recursive:true});fs.cpSync(src,dst,{recursive:true});console.log('Copied UI dist to server/ui-dist');\"",
        ],
      },
    },

    {
      when: "{{!exists('sandbox/config/settings.json')}}",
      method: "shell.run",
      params: {
        message: [
          "node -e \"const fs=require('fs');const p='sandbox/config/settings.json';const v={serverPort:3030,uiPort:3031,env:{}};fs.mkdirSync('sandbox/config',{recursive:true});fs.writeFileSync(p,JSON.stringify(v,null,2));console.log('Created '+p);\"",
        ],
      },
    },
  ],
};
