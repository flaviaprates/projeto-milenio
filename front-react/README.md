## Instruções para uso do app

Para a utilização dessa `aplicação em React` é indispensável instalar todas as bibliotecas que foram utilizadas no projeto com o `npm install` e para dar start no projeto basta rodar `npm start` no terminal.

`OBS: Para o funcionamento completo do app, é indispensável que a API back-end esteja rodando.`

Abaixo estão listadas cada página com a sua funcionalidade.



### 1. `Main` http://localhost:3000/

Página principal da aplicação. Nela estão presentes 4 opcões de interação como ilustrado na imagem abaixo: 

![](https://i.imgur.com/OWgCBLL.png)


#### 1.1. `Encontrar a rota mais adequada dentre algumas opções`

Nessa opção é possível fazer uma requisição através do envio de alguns dados: `id` da rota salva anteriormente, local de `partida` e `destino` e, opcionalmente, o número `máximo de paradas`.

O retorno vem ao lado dos inputs como na imagem abaixo:

![](https://i.imgur.com/p36LJp1.png)

---

#### 1.2. `Encontrar a rota mais curta`

Nessa opção é possível fazer uma requisição através do envio de alguns dados: `id` da rota salva anteriormente, local de `partida` e `destino`.

O retorno vem ao lado dos inputs como na imagem abaixo:

![](https://i.imgur.com/bkuuMEL.png)

---

#### 1.3. `Ver todas as rotas salvas em um grafo`

Nessa opção é possível fazer uma requisição através do envio do `id` de uma rota salva anteriormente.

O retorno são todas as rotas salvas em um grafo e vem ao lado dos inputs como na imagem abaixo:

![](https://i.imgur.com/8O3kQ3u.png)

---

### 2. `Salvar um novo grafo` http://localhost:3000/graph

Nesse endpoint é possível salvar um novo grafo contendo novas rotas, através do envio de cada rota.

`Atenção: O grafo só será salvo se todos os campos forem preenchidos e se não houver grafo igual salvo anteriormente!`

Não há retorno e as rotas são salvas no banco de dados.

A página é ilustrada na imagem abaixo:

![](https://i.imgur.com/QuLqlWF.png)