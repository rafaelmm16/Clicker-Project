const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const menuItems = document.querySelectorAll('.sidebar li');

let clickCount = 0;
let clickPower = 1; // Inicialmente, o poder de clique é 1

clickButton.addEventListener('click', () => {
    clickCount += clickPower; // Multiplica o clique pelo poder de clique atual
    clickCountDisplay.textContent = clickCount;
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const itemId = item.id;
        const quantityElement = item.querySelector('.quantity');
        const valueElement = item.querySelector('.value');
        const quantity = parseInt(quantityElement.textContent);
        const value = parseInt(valueElement.textContent);

        // Verifica se há pontos de clique suficientes para comprar o item
        if (clickCount >= value) {
            // Atualiza a quantidade de itens e os pontos de clique
            quantityElement.textContent = quantity + 1;
            clickCount -= value;
            clickCountDisplay.textContent = clickCount; // Atualiza a exibição dos cliques
            
            // Atualiza o poder de clique para refletir a compra do item
            clickPower += 1;
        } else {
            alert("Você não tem cliques suficientes para comprar este item.");
        }
    });
});
