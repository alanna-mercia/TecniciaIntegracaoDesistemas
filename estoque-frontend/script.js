const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
let jwtToken = ''; // Variável para armazenar o token JWT

// Função para realizar login
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Enviar dados para a API de login para obter o token JWT
  fetch('https://api.exemplo.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      jwtToken = data.token; // Armazena o token JWT
      loginContainer.style.display = 'none';
      dashboardContainer.style.display = 'block';
      loadStockData();  // Carregar dados do estoque
      loadOrderData();  // Carregar dados dos pedidos
    } else {
      alert('Falha na autenticação!');
    }
  })
  .catch(error => {
    console.error('Erro ao fazer login:', error);
    alert('Erro ao autenticar, tente novamente.');
  });
});

// Função para carregar dados do estoque
function loadStockData() {
  fetch('https://api.exemplo.com/estoque', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwtToken}`, // Passa o token JWT nos headers
    },
  })
  .then(response => response.json())
  .then(stockData => {
    const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
    stockData.forEach(item => {
      const row = stockTable.insertRow();
      row.innerHTML = `
        <td>${item.produto}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${item.preco.toFixed(2)}</td>
      `;
    });
  })
  .catch(error => {
    console.error('Erro ao carregar estoque:', error);
  });
}

// Função para carregar dados dos pedidos
function loadOrderData() {
  fetch('https://api.exemplo.com/pedidos', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  })
  .then(response => response.json())
  .then(ordersData => {
    const orderTable = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    ordersData.forEach(order => {
      const row = orderTable.insertRow();
      row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.cliente}</td>
        <td>${order.produto}</td>
        <td>${order.status}</td>
        <td>
          <button class="approve" onclick="approveOrder(${order.id})">Aprovar</button>
          <button class="reject" onclick="rejectOrder(${order.id})">Rejeitar</button>
        </td>
      `;
    });
  })
  .catch(error => {
    console.error('Erro ao carregar pedidos:', error);
  });
}

// Função para aprovar um pedido
function approveOrder(orderId) {
  fetch(`https://api.exemplo.com/pedidos/${orderId}/aprovar`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    alert('Pedido aprovado!');
    loadOrderData(); // Recarrega a lista de pedidos após a aprovação
  })
  .catch(error => {
    console.error('Erro ao aprovar pedido:', error);
  });
}

// Função para rejeitar um pedido
function rejectOrder(orderId) {
  fetch(`https://api.exemplo.com/pedidos/${orderId}/rejeitar`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    alert('Pedido rejeitado!');
    loadOrderData(); // Recarrega a lista de pedidos após a rejeição
  })
  .catch(error => {
    console.error('Erro ao rejeitar pedido:', error);
  });
}
