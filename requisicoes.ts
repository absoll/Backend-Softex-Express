//const express = require('express');
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const livros = [
    {id: 1, titulo: "Aprendendo JavaScript", autor: "John Doe"},
    {id: 2, titulo: "Aprendendo Python", autor: "Maria Doe"}
]

app.get('/livros', (req: Request, res: Response) => {
    res.send(livros); 
});

app.get('/livros/:id', (req: Request, res: Response) =>{
    const livro = livros.find((l) => l.id === parseInt(req.params.id));

    if(!livro){
        return res.status(404).json({messagem: "Livro nao encontrado"});
    }
    res.send(livro);
});


app.get('/teste', (req: Request, res: Response) => {
    res.send(`teste`);
})


app.post('/post', (req:Request, res:Response) => {
  
    //Recebe tudo q vinher e coloca em obj. Não importa o q venha
    //const obj = req.body
    //console.log(obj)
    //console.log(obj.titulo)
  
    //Recebe o que vinher e coloca na variavel correspondente. Isso no formato JSON.
    const {titulo} = req.body
    console.log(titulo); //Se por acabo nao vinher um nome do dicionario "titulo", esse valor fica vazio(nao existe)
  
    if(!titulo)
      return res.status(404).json({msg: "error"});
  
    res.send(`Recebido. `);
  });

  app.put('/livro', (req: Request, res: Response) => {  
    const {titulo, autor} = req.body
  
    res.json({msg: "Atualizado PUT"})
  })
  
  //Para valores dinamicos vindo da URL
  app.put('/livro/:id', (req: Request, res: Response) => {  
    const {titulo, autor} = req.body
    const id = req.params.id
    console.log(id)
  
    res.json({msg: "Atualizado PUT dinamico"})
  })

  //Para MAIS DE UM valor dinamico vindo da URL
  app.put('/livro/:id/:teste', (req: Request, res: Response) => {  
    const {titulo, autor} = req.body
    const id = req.params.id
    const teste = req.params.teste
    console.log(`ID: ${id} | Teste: ${teste} | Titulo: ${titulo} | Autor: ${autor}`)
  
    res.json({msg: "Atualizado PUT mais de um dinamico"})
  })


const porta: number = 3000

app.listen(porta, () => {
    console.log(`Servidor porta: http://localhost:${porta}`)
})

//IMPORTANTE:
//https://expressjs.com/pt-br/guide/routing.html

//Caso queira criar caminhos nao definidos, como por exemplo com letras reptidas e tal... Usa os casos de *(qualquer coisa), ?(possuindo essa letra ou nao) e + (qualquer quantidade repetida da letra anterior)
//ab?cd => acd , abcd
//ab*cd => abcd, abxcd, abRABDOMcd, ab123cd
//ab+cd => abcd, abbcd, abbbcd