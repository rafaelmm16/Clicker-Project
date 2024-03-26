const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const menuItems = document.querySelectorAll('.sidebar li');
const clickPointsDisplay = document.getElementById('click-points');

let clickCount = 0;
let clickPoints = 0;
let clickPower = 1; // Inicialmente, o poder de clique é 1

clickButton.addEventListener('click', () => {
    clickCount += clickPower; // Multiplica o clique pelo poder de clique atual
    clickCountDisplay.textContent = clickCount;

    // Atualiza a quantidade de pontos de clique
    clickPoints++;
    clickPointsDisplay.textContent = clickPoints;
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const itemId = item.id;
        const quantityElement = item.querySelector('.quantity');
        const valueElement = item.querySelector('.value');
        const quantity = parseInt(quantityElement.textContent);
        const value = parseInt(valueElement.textContent);

        // Verifica se há pontos de clique suficientes para comprar o item
        if (clickPoints >= value) {
            // Atualiza a quantidade de itens e os pontos de clique
            quantityElement.textContent = quantity + 1;
            clickPoints -= value;
            clickPointsDisplay.textContent = clickPoints; // Atualiza a exibição dos pontos de clique
            
            // Atualiza o poder de clique para refletir a compra do item
            clickPower += 1;
        } else {
            alert("Você não tem pontos de clique suficientes para comprar este item.");
        }
    });
});
