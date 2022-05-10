## Instruções para uso da API

Para a utilização dessa `API` é indispensável instalar todas as bibliotecas que foram utilizadas no projeto com o `npm install` e para dar start no projeto basta rodar `npm run dev` no terminal.

Essa `API` possui uma rota para `cadastrar dados`, uma para `localizar um dado específico`, uma para `encontrar todas as rotas entre dois pontos` e uma para `encontrar a rota mais curta entre dois pontos`.

Abaixo estão os exemplos de uso de cada rota.



#### 1. `Cadastrar dados - POST` http://localhost:8080/graph

Nesse endpoint você pode fazer o cadastro de um grafo contendo rotas. Para isso você deve passar no `body` as propriedades como no exemplo abaixo:

```json=
{
	"data": [
    {
      "source": "A", "target": "B", "distance":6
    },
    {
      "source": "A", "target": "E", "distance":4
    },
    {
      "source": "B", "target": "A", "distance":6
    }
  ]
}
```

O retorno segue o exemplo abaixo:

```json=
{
	"id": 10,
	"data": [
		{
			"source": "A",
			"target": "B",
			"distance": 6
		},
		{
			"source": "A",
			"target": "E",
			"distance": 4
		},
		{
			"source": "B",
			"target": "A",
			"distance": 6
		}
	]
}
```

---

#### 2. `Localizar um dado específico - GET` http://localhost:8080/graph/:id

Nesse endpoint você pode localizar um dado específico salvo anteriormente, contendo um grupo de grafos, através do seu id. Não tem requisição no `body` e a resposta será como no exemplo abaixo:

```json=
{
	"id": 10,
	"data": [
		{
			"source": "A",
			"target": "B",
			"distance": 6
		},
		{
			"source": "A",
			"target": "E",
			"distance": 4
		},
		{
			"source": "B",
			"target": "A",
			"distance": 6
		}
	]
}
```

---

#### 3. `Encontrar todas as rotas entre dois pontos - POST` http://localhost:8080/routes/:id/from/:source/to/:target?maxStops=:maxStops

Nesse endpoint você pode encontrar todas as rotas possíveis entre dois pontos (cidades) que podem existir dentro de um dado específico salvo anteriormente e passado com seu id como parâmetro na URL. As cidades de partida e destino serão passadas também por parâmetros na URL. O parâmetro maxStops é opcional, se passado, serão retornadas todas as rotas possíveis calculadas até o número especificado de paradas. Caso o parâmetro maxStops não seja informado, retornará todas as rotas diretas se houver.

Não tem requisição no `body` e, para a requisição `http://localhost:8080/routes/8/from/b/to/c?maxStops=3`, será retornada a resposta como no exemplo abaixo:

```json=
{
	"routes": [
		{
			"route": "BC",
			"stops": 1
		},
		{
			"route": "BABC",
			"stops": 3
		},
		{
			"route": "BAEC",
			"stops": 3
		},
		{
			"route": "BCBC",
			"stops": 3
		},
		{
			"route": "BCEC",
			"stops": 3
		},
		{
			"route": "BDBC",
			"stops": 3
		}
	]
}
```

---

#### 4. `Encontrar a rota mais curta entre dois pontos - POST` http://localhost:8080/distance/:id/from/:source/to/:target

Nesse endpoint você pode encontrar a rota mais curta, ou seja, de menor distância entre dois pontos (cidades) dentro de um dado específico salvo anteriormente e passado com seu id como parâmetro na URL. As cidades de partida e destino serão passadas também por parâmetros na URL.

Não tem requisição no `body` e, para a requisição `http://localhost:8080/distance/6/from/a/to/c`, será retornada a resposta como no exemplo abaixo:

```json=
{
	"distance": 2,
	"path": [
		"B",
		"C"
	]
}
```