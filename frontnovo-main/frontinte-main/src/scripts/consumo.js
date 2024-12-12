async function getPerfumaria() {
  const listaDiv = document.getElementById('lista');
  const altDiv = document.getElementById('alt');

  // Limpar a lista antes de preencher com novos itens
  listaDiv.innerHTML = '';
  altDiv.innerHTML = '';

  // Buscar os dados da API
  fetch('http://localhost:8080/perfumaria', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Verificar os dados no console
      lista(data); // Passar os dados para a função lista
    })
    .catch(error => {
      console.error('Erro ao carregar os dados:', error);
    });

  // Função que vai preencher a lista de itens
  function lista(itens) {
    itens.forEach((item) => {
      // Criar o item de lista
      const itemDiv = document.createElement('div');      
      itemDiv.classList.add('item'); // Adicionar uma classe para o item (opcional)

      // Criar os botões de editar e excluir
      const altButtonsDiv = document.createElement('div');
      altButtonsDiv.innerHTML = `
        <button class="lapis" onclick="editItem(${item.id})">
            <img src="/src/assets/images/lapis.png" class="lapis1">
        </button>
        <button class="lixo" onclick="${deleteItem(item.id)}">
            <img src="/src/assets/images/lixo.png" class="lixo1">
        </button>
      `;
      
      // Adicionar as informações do item (nome, marca, preço)
      const itemDetailsDiv = document.createElement('div');
      itemDetailsDiv.innerHTML = `
        <td>${item.name}</td>
        <td>${item.marca}</td>
        <td>${item.preco}</td>
        <td>${item.estoque}</td>
      `;

      // Adicionar os botões e detalhes do item ao div do item
      itemDiv.appendChild(altButtonsDiv);
      itemDiv.appendChild(itemDetailsDiv);

      // Adicionar o item na lista principal
      listaDiv.appendChild(itemDiv);
    });
  }
}

// Função de edição (abre o modal e preenche com os dados do item)
async function editItem(id) {
  console.log('Editar item com id:', id);

  // Buscar o item pelo ID
  try {
    const response = await fetch(`http://localhost:8080/perfumaria/${id}`);
    const item = await response.json();

    if (!response.ok) {
      throw new Error('Erro ao carregar os dados para edição');
    }

    // Preencher os campos do modal com os dados do item
    const modal = document.getElementById('myModal');
    const form = modal.querySelector('form');

    form.querySelector('[name="name"]').value = item.name;
    form.querySelector('[name="marca"]').value = item.marca;
    form.querySelector('[name="preco"]').value = item.preco;
    form.querySelector('[name="estoque"]').value = item.estoque;
    
    // Mostrar o modal
    modal.style.display = 'block';

    // Função de salvar a edição (enviar os dados via PUT)
    form.onsubmit = async (event) => {
      event.preventDefault();

      const updatedItem = {
        name: form.name.value,
        marca: form.marca.value,
        preco: form.preco.value,
        estoque: form.estoque.value,
      };

      // Atualizar o item via PUT
      try {
        const updateResponse = await fetch(`http://localhost:8080/perfumaria/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        });

        if (!updateResponse.ok) {
          throw new Error('Erro ao atualizar o item');
        }

        // Fechar o modal
        modal.style.display = 'none';

        // Recarregar a lista de itens após edição
        getPerfumaria();
      } catch (error) {
        console.error('Erro ao editar o item:', error);
      }
    };
  } catch (error) {
    console.error('Erro ao carregar os dados do item para edição:', error);
  }
}

// Função de exclusão (remove o item da lista e da API)
async function deleteItem(id) {
  console.log('Excluir item com id:', id);

  // Confirmar a exclusão com o usuário
  if (confirm('Tem certeza que deseja excluir este item?')) {
    try {
      // Enviar requisição DELETE para a API
      const response = await fetch(`http://localhost:8080/perfumaria/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir o item');
      }

      // Recarregar a lista de itens após a exclusão
      getPerfumaria();
    } catch (error) {
      console.error('Erro ao excluir o item:', error);
    }
  }
}


// Chamar a função para carregar os dados da perfumaria
