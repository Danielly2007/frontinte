// Obtém os elementos necessários
const modal = document.getElementById("myModal");
const lapis = [...document.querySelectorAll(".lapis1")]; // Botão para abrir o modal
const fechar = document.getElementById("fechar"); // Botão para fechar o modal
const closeSpan = document.getElementsByClassName("close")[0]; // O "X" do modal

// Função para abrir o modal
lapis.forEach((e)=>{
    e.addEventListener("click",()=>{
        modal.classList.toggle("active");
        console.log(modal)
    })
    
})

// Função para fechar o modal
fechar.onclick = function() {
    modal.classList.remove("active"); // Remove a classe "active", ocultando o modal
}

closeSpan.onclick = function() {
    modal.classList.remove("active"); // Remove a classe "active" quando o usuário clicar no "X"
}

// Fecha o modal quando o usuário clica fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("active"); // Remove a classe "active" quando o usuário clicar fora do modal
    }
}

// Função para enviar o formulário
document.getElementById('myForm').onsubmit = function(event) {
    event.preventDefault(); // Evitar o envio do formulário para o servidor
  
    const name = document.getElementById('name').value;
    const preco = document.getElementById('preco').value;
    const marca = document.getElementById('marca').value;
  
    // Simulando o envio dos dados
    console.log(`Nome: ${name}`);
    console.log(`Preço: ${preco}`);
    console.log(`Marca: ${marca}`);
};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Simulando um banco de dados com um array de itens
let itens = [
  { id: 1, nome: 'Cassandra Dark Blosson', preco: '100', marca: 'Marca A' },
  { id: 2, nome: 'Her Code Touch', preco: '120', marca: 'Marca B' },
  { id: 3, nome: 'Malbec Desodorante', preco: '90', marca: 'Marca C' }
];

// Endpoint GET para listar todos os itens
app.get('http://localhost:8080/perfumaria', (req, res) => {
  res.status(200).json(itens);
});

// Endpoint POST para adicionar um novo item
app.post('http://localhost:8080/perfumaria/perfume', (req, res) => {
  const { nome, preco, marca } = req.body;

  // Verifica se todos os campos necessários foram preenchidos
  if (!nome || !preco || !marca) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  // Criando um novo item com um ID único
  const novoItem = {
    id: itens.length + 1, // Incrementa o ID para criar um novo item
    nome,
    preco,
    marca
  };

  // Adiciona o novo item ao array de itens
  itens.push(novoItem);

  console.log('Novo item adicionado:', novoItem);
  res.status(201).json({ mensagem: 'Item adicionado com sucesso', item: novoItem });
});

// Endpoint PUT para atualizar um item existente
app.put('http://localhost:8080/perfumaria/10/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, preco, marca } = req.body;

  // Encontra o item pelo ID
  const itemIndex = itens.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ mensagem: 'Item não encontrado' });
  }

  // Atualiza os campos do item
  if (nome) itens[itemIndex].nome = nome;
  if (preco) itens[itemIndex].preco = preco;
  if (marca) itens[itemIndex].marca = marca;

  console.log('Item atualizado:', itens[itemIndex]);
  res.status(200).json({ mensagem: 'Item atualizado com sucesso', item: itens[itemIndex] });
});

// Endpoint DELETE para remover um item
app.delete('http://localhost:8080/perfumaria/7/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Encontra o item pelo ID
  const itemIndex = itens.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ mensagem: 'Item não encontrado' });
  }

  // Remove o item do array
  const itemRemovido = itens.splice(itemIndex, 1)[0];

  console.log('Item removido:', itemRemovido);
  res.status(200).json({ mensagem: 'Item removido com sucesso', item: itemRemovido });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});






