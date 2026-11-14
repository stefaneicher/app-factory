#!/usr/bin/env node
import {cp,access,readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const [cmd,name]=process.argv.slice(2);
if(cmd==='create'){
 if(!/^[a-z][a-z0-9-]{1,48}$/.test(name??''))throw Error('Usage: create <app-name>');
 const target=resolve(name);try{await access(target);throw Error('Destination exists')}catch(e){if(e.code!=='ENOENT')throw e}
 await cp(resolve(root,'templates/base'),target,{recursive:true});await writeFile(resolve(target,'.factory.json'),JSON.stringify({factory:'app-factory',version:'0.1.0',app:name},null,2));console.log(target);
}else if(cmd==='check'||cmd==='upgrade'){const c=JSON.parse(await readFile('.factory.json','utf8'));console.log(c);if(cmd==='upgrade')console.log('Automated migrations not yet implemented');}else{console.log('create <name> | check | upgrade');process.exitCode=1}
