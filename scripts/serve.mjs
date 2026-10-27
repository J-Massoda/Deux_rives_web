import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end('Bad request');return;}
  const target=path.resolve(dist,'.'+pathname);
  if(target!==dist&&!target.startsWith(dist+path.sep)){res.writeHead(403).end('Forbidden');return;}
  let file=target;
  try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');const bytes=fs.readFileSync(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(bytes);}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Page introuvable');}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/`));
if(process.argv.includes('--watch')){
  let timer;
  const rebuild=()=>{clearTimeout(timer);timer=setTimeout(()=>{const child=spawn(process.execPath,[path.join(root,'scripts/build.mjs')],{stdio:'inherit'});child.on('exit',code=>{if(code)console.error('Build failed; previous output may still be present.');});},180);};
  for(const item of ['src','assets'])fs.watch(path.join(root,item),{recursive:true},rebuild);
  for(const item of ['site.config.mjs','scripts/build.mjs'])fs.watch(path.join(root,item),rebuild);
}
