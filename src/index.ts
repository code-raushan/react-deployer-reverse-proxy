import httpProxy from 'http-proxy'
import express, {Request, Response} from 'express';
import { BASE_PATH } from './config';

const app = express();

const proxy = httpProxy.createProxy();


app.use((req:Request, res:Response)=>{
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    const resolvedPath = `${BASE_PATH}/${subdomain}`;
    
    return proxy.web(req, res, {target: resolvedPath, changeOrigin: true})
});

proxy.on('proxyReq', (proxyReq, req, res)=>{
    const url = req.url;
    if(url==='/'){
        proxyReq.path+='index.html';
    }
})

app.listen(9000, ()=>{
    console.log(`Reverse Proxy running at http://localhost:9000`);
})
