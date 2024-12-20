document.getElementById('formAdicionarItem').addEventListener('submit', async function(event) {
    event.preventDefault();

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

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const result = await response.text(); // Lê a resposta como texto

        // Ação após o cadastro
        alert(result); // Mostra a mensagem retornada pela API
        console.log('Dados do usuário:', result);
        

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Ocorreu um erro ao cadastrar. Tente novamente mais tarde.');
    }
});