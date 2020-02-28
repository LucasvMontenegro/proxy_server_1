## Descriçao dos arquivos

## Rotas
### src/app.js
Possui duas rotas
    - Rota 1 : 'rotaUm' src/routers/rotaUmRoute
    - Rota 2 : 'rotaDois' src/routers/rotaDoisRoute

---

## Routers
## Router 1 POST
### src/routers/rotaUmRouter
Possui 1 router - POST
Apenas roteia para o verbo HTTP especifico e da um next() para o proxy 'apiProxy' (nome genérico para todos os proxies)

## Router 2 GET (param)
### src/routers/rotaDoismRouter
Possui 1 router - GET
Recebe um param /:id e da um next() para o apiProxy
---

## PROXY
### src/middleware/rotaUmProxy
Existem 3 arquivos de PROXY
    - 1 arquivo modelo 
    - 2 arquivos de proxy referentes aos routers rotaUmRouter e rotaDoismRouter

Ambos possuem:
    função restreamReq: intercepta e altera a request;
    função restreamRes: intercepta e altera a response
    objeto options: configuraçoes do createProxyMiddleware;
    função createProxyMiddleware: função que executa o PROXY;