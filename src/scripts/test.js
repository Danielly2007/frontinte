function getPerfumaria() {
    // Simulando a resposta da API com dados mock (pode ser substituído por uma requisição fetch real)
    const mock = [
        {
            id: 8,
            Marca: 'Eua de perfum',
            Preco: 799.99,
            imagem: null,
            nome: 'Cassandra Dark Blossom'
        },
        {
            id: 9,
            Marca: 'Channel',
            Preco: 229.9,
            imagem: null,
            nome: 'Her Code Touch'
        },
        // {
        //     id: 10,
        //     Marca: 'Avon',
        //     Preco: 250.7,
        //     imagem: null,
        //     nome: 'Malbec Desodorante Colônia'
        // },
        // {
        //     id: 11,
        //     Marca: 'Oboticario',
        //     Preco: 174.9,
        //     imagem: null,
        //     nome: 'Glamour Secrets Black Intense Desodorante Colônia'
        // },
        // {
        //     id: 12,
        //     Marca: 'Jequiti',
        //     Preco: 119.9,
        //     imagem: null,
        //     nome: 'Quasar Classic Desodorante'
        // }
    ];

    const listaDiv = document.getElementById('lista');
    const altDiv = document.getElementById('alt');

    // Limpar a lista antes de preencher com novos itens
    listaDiv.innerHTML = '';
    altDiv.innerHTML = '';

    // Iterar sobre os itens e criar o HTML dinâmico
    mock.forEach(item => {
        // Adicionar item à lista
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p1 class="teste">${item.nome}</p1>
        `;
        listaDiv.appendChild(itemDiv);

        // Adicionar botões de editar e excluir
        const altButtonsDiv = document.createElement('div');
        altButtonsDiv.innerHTML = `
            <button class="lapis" onclick="editItem(${item.id})">
                <img src="/src/assets/images/lapis.png" class="lapis1">
            </button>
            <button class="lixo" onclick="deleteItem(${item.id})">
                <img src="/src/assets/images/lixo.png" class="lixo1">
            </button>
        `;
        altDiv.appendChild(altButtonsDiv);
    });
}

// Função de edição (vai abrir o modal e preencher com os dados do item)
function editItem(id) {
    // Aqui você pode buscar o item pelo ID e preencher o modal com os dados
    console.log('Editar item com id:', id);
    // Exemplo: abrir o modal e preencher os campos
    document.getElementById('myModal').style.display = 'block';
}

// Função de exclusão (vai remover o item da lista)
function deleteItem(id) {
    // Aqui você pode fazer a exclusão do item (remover do mock ou da API)
    console.log('Excluir item com id:', id);
    // Exemplo: remover do mock e atualizar a lista
    // Mock sendo atualizado, você pode substituir por uma requisição API
    const index = mock.findIndex(item => item.id === id);
    if (index > -1) {
        mock.splice(index, 1);
        getPerfumaria(); // Recarregar a lista após exclusão
    }
}

// Chamar a função para carregar os dados da perfumaria
getPerfumaria();
