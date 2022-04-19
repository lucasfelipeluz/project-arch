# Executando o container
docker-compose build && docker-compose up -d

# API
- GET /saldo/:idContaCorrente
<br>Essa rota irá buscar na memória cache, caso o cache já tenha expirado, fará uma requisição para o banco de dados buscando e somando todas as transações da Conta corrente e criará outro cache de saldo.
- POST /transacao
<br>Essa rota vai salvar no banco de dados a transação e vai buscar e somar todas outras transações da mesma conta (se tiver) e salvará o saldo no cache.
<br>![image](https://user-images.githubusercontent.com/65639478/163904747-49ca111f-dabf-48db-938e-ab7bb9267ace.png)
