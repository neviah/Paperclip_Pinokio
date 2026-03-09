module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "sandbox/server",
        message: [
          "node -e \"const fs=require('fs');const cp=require('child_process');const path=require('path');const settingsPath=path.resolve('..','config','settings.json');let settings={serverPort:3030,uiPort:3031,env:{}};if(fs.existsSync(settingsPath)){settings=JSON.parse(fs.readFileSync(settingsPath,'utf8'));}const env={...process.env,HOST:'0.0.0.0',PORT:String(settings.serverPort||3030),...((settings&&settings.env)||{})};const bin=process.platform==='win32'?'pnpm.cmd':'pnpm';const args=['paperclipai','run','--yes','--data-dir',path.resolve('..','data')];const child=cp.spawn(bin,args,{cwd:process.cwd(),env,stdio:'inherit',shell:process.platform==='win32'});child.on('exit',(code)=>process.exit(code??0));\"",
        ],
        on: [
          {
            event: "/Server listening on .*:(\\d+)/",
            done: true,
          },
          {
            event: "/UI\\s+http:\\/\\/[^:]+:(\\d+)/",
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
