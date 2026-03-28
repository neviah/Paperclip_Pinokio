module.exports = {
  daemon: true,
  run: [
    {
      when: "{{exists('sandbox/server/.git')}}",
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: ["git checkout -- package.json pnpm-lock.yaml", "git pull"],
      },
    },
    {
      when: "{{exists('sandbox/ui/.git')}}",
      method: "shell.run",
      params: {
        path: "sandbox/ui",
        message: ["git checkout -- pnpm-lock.yaml", "git pull"],
      },
    },
    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: ["npx --yes pnpm@9.15.9 install --prod=false --prefer-offline"],
      },
    },
    {
      when: "{{!exists('sandbox/data/instances/default/config.json')}}",
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: [
          "node -e \"const cp=require('child_process');const path=require('path');const bin=process.platform==='win32'?'npx.cmd':'npx';const args=['--yes','paperclipai@latest','onboard','--yes','--data-dir',path.resolve('..','data')];const child=cp.spawn(bin,args,{cwd:process.cwd(),stdio:'inherit',shell:process.platform==='win32'});child.on('exit',(code)=>process.exit(code??0));\"",
        ],
      },
    },
    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: [
          "node -e \"const fs=require('fs');const cp=require('child_process');const path=require('path');const settingsPath=path.resolve('..','config','settings.json');let settings={serverPort:3030,uiPort:3031,env:{}};if(fs.existsSync(settingsPath)){settings=JSON.parse(fs.readFileSync(settingsPath,'utf8'));}const port=String(settings.serverPort||3030);const env={...process.env,HOST:'0.0.0.0',PORT:port,PAPERCLIP_OPEN_ON_LISTEN:'false',...((settings&&settings.env)||{})};const bin=process.platform==='win32'?'npx.cmd':'npx';const args=['--yes','paperclipai@latest','run','--data-dir',path.resolve('..','data')];const child=cp.spawn(bin,args,{cwd:process.cwd(),env,stdio:'inherit',shell:process.platform==='win32'});child.on('exit',(code)=>process.exit(code??0));\"",
        ],
        on: [
          {
            event: "/Server listening on .*:(\\d+)/",
            done: true,
          },
        ],
      },
    },
    {
      method: "local.set",
      params: {
        url: "http://127.0.0.1:{{input.event[1]}}",
      },
    },
  ],
};
