

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
