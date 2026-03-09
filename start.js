module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: ["npx --yes pnpm@9.15.9 install --prefer-offline"],
      },
    },
    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: [
          "node -e \"const fs=require('fs');const cp=require('child_process');const path=require('path');const settingsPath=path.resolve('..','config','settings.json');let settings={serverPort:3030,uiPort:3031,env:{}};if(fs.existsSync(settingsPath)){settings=JSON.parse(fs.readFileSync(settingsPath,'utf8'));}const port=String(settings.serverPort||3030);const url='http://127.0.0.1:'+port;console.log('PINOKIO_URL='+url);const env={...process.env,HOST:'0.0.0.0',PORT:port,PAPERCLIP_OPEN_ON_LISTEN:'false',...((settings&&settings.env)||{})};const bin=process.platform==='win32'?'npx.cmd':'npx';const args=['--yes','pnpm@9.15.9','paperclipai','run','--yes','--data-dir',path.resolve('..','data')];const child=cp.spawn(bin,args,{cwd:process.cwd(),env,stdio:'inherit',shell:process.platform==='win32'});child.on('exit',(code)=>process.exit(code??0));\"",
        ],
        on: [
          {
            event: "/PINOKIO_URL=(http:\\/\\/\\S+)/",
            done: true,
          },
        ],
      },
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}",
      },
    },
  ],
};
