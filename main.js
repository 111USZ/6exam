const apiUrl = 'https://raw.githubusercontent.com/diyor011/apibest/master/api.json';

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Ошибка сети');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return [];
    }
}

function renderProducts(products, searchTerm = '') {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    // Применение поиска
    let filteredProducts = products;
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.fulldesc.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.pic}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.fulldesc}</p>
            <p class="price">$${product.price}</p>
        `;
        productList.appendChild(productCard);
    });
}

document.getElementById('search-button').addEventListener('click', async () => {
    const searchTerm = document.getElementById('search').value;
    const products = await fetchProducts();
    renderProducts(products, searchTerm);
});

// Начальная загрузка продуктов
(async function() {
    const products = await fetchProducts();
    renderProducts(products);
})();
