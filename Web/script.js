const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const menuItems = document.querySelectorAll('.sidebar li');

// Recupera a quantidade de cliques salva, se existir, ou define como 0
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let clickPower = 1; // Inicialmente, o poder de clique é 1

// Atualiza a exibição dos cliques ao carregar a página
clickCountDisplay.textContent = clickCount;

// Função para salvar a quantidade de cliques
const saveClickCount = () => {
    localStorage.setItem('clickCount', clickCount);
};

clickButton.addEventListener('click', () => {
    clickCount += clickPower; // Multiplica o clique pelo poder de clique atual
    clickCountDisplay.textContent = clickCount;
    saveClickCount(); // Salva a quantidade de cliques
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const itemId = item.id;
        const quantityElement = item.querySelector('.quantity');
        const valueElement = item.querySelector('.value');
        const quantity = parseInt(quantityElement.textContent);
        const value = parseInt(valueElement.textContent);

        // Calcula a porcentagem de aumento do poder de clique
        const increasePercentage = 0.1; // Por exemplo, 10%
        const increaseFactor = 1 + increasePercentage * quantity; // Fator de aumento exponencial

        // Verifica se há pontos de clique suficientes para comprar o item
        if (clickCount >= value) {
            // Atualiza a quantidade de itens e os pontos de clique
            quantityElement.textContent = quantity + 1;
            clickCount -= value;
            clickCountDisplay.textContent = clickCount; // Atualiza a exibição dos cliques
            
            // Atualiza o poder de clique para refletir a compra do item
            clickPower *= increaseFactor;

            saveClickCount(); // Salva a quantidade de cliques
        } else {
            alert("Você não tem cliques suficientes para comprar este item.");
        }
    });
});

