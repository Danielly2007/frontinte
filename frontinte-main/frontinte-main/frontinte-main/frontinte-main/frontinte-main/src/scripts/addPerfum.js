document.getElementById('formAdicionarItem').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const marca = document.getElementById('marca').value; 
    const preco = document.getElementById('preco').value;

    // Criar um objeto com os dados do formulário
    const data = {
        nome: nome,
        marca: marca,
        preco: preco,
    };

    try {
        // Configurações da requisição
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Converte os dados para JSON
        };

        const response = await fetch('http://localhost:8080/perfumaria', requestOptions);
        // /perfume

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const result = await response.text(); // Lê a resposta como texto

        // Ação após o cadastro
        alert(result); // Mostra a mensagem retornada pela API
        console.log('Dados cadastrados:', result);

        // Limpar os campos do formulário
        document.getElementById('nome').value = '';
        document.getElementById('marca').value = '';
        document.getElementById('preco').value = '';

        // Chama a função para atualizar a lista de itens após o cadastro
        getPerfumaria(); // A função que já preenche a lista de itens na tela

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Ocorreu um erro ao cadastrar. Tente novamente mais tarde.');
    }
});

// Função para buscar e exibir os itens da perfumaria
async function getPerfumaria() {
    const listaDiv = document.getElementById('lista');
    listaDiv.innerHTML = ''; // Limpar a lista antes de preencher com novos itens

    try {
        const response = await fetch('http://localhost:8080/perfumaria', { method: 'GET' });
        const data = await response.json(); // Lê os dados como JSON

        // Iterar sobre os itens e criar o HTML dinâmico
        data.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item'); // Classe opcional para os itens

            // Criar os botões de editar e excluir
            const altButtonsDiv = document.createElement('div');
            altButtonsDiv.innerHTML = `
                <button class="lapis" onclick="editItem(${item.id})">
                    <img src="/src/assets/images/lapis.png" class="lapis1">
                </button>
                <button class="lixo" onclick="deleteItem(${item.id})">
                    <img src="/src/assets/images/lixo.png" class="lixo1">
                </button>
            `;
            
            // Criar as informações do item
            const itemDetailsDiv = document.createElement('div');
            itemDetailsDiv.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.marca}</td>
                <td>${item.preco}</td>
            `;

            // Adicionar os botões e detalhes do item ao div do item
            itemDiv.appendChild(altButtonsDiv);
            itemDiv.appendChild(itemDetailsDiv);

            // Adicionar o item na lista principal
            listaDiv.appendChild(itemDiv);
        });

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Ocorreu um erro ao carregar os dados.');
    }
}

// Chama a função para carregar a lista de itens ao iniciar
getPerfumaria();
