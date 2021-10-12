
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';
class GoodsItem {
    constructor(product_name = 'default title', price = 0, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
    }
    render() {
        return `
        <div class="goods-item">
        <h3 class="productTitle">${this.product_name}</h3>
        <p class="productPrice">${this.price}</p>
        <button class="addButton" id_product="${this.id_product}">Добавить</button>
        </div>`;
    }
}


//const goodsItem = new GoodsItem('coat', 300)

class GoodsList {
    constructor() {
        this.goods = [];
        this.fetchGoods(() => {
            this.render();
        })
    }
    fetchGoods(callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API}${GOODS}`, true)
        xhr.send();
        xhr.onload = () => {
            this.goods = JSON.parse(xhr.responseText);
            callback();
        }
    }
    render() {
        const goodsItems = this.goods.map(({ product_name, price, id_product }) => {
            const goodsItem = new GoodsItem(product_name, price, id_product);
            return goodsItem.render()
        });
        document.querySelector('.goods-list').innerHTML = goodsItems.join('');
    }
    CalcAllProducts() {
        let totalPrice = 0;
        this.goods.forEach((_good) => {
            if (_good.price !== undefined) {
                totalPrice += _good.price
            }
            console.log(totalPrice)
        })
    }

}
onload = () => {
    const goodsList = new GoodsList();
    goodsList.CalcAllProducts();
}

let BasketEl = document.querySelector('.basket');// пыталась сделать, чтобы при нажатии на кнопку "корзина" появлялась сама корзина
const openBasketBtn = document.querySelector('.cart-button');
openBasketBtn.addEventListener('click', function () {
    BasketEl.classList.toggle('hidden');
})

class BasketItem extends GoodsItem { //класс продукт в корзине
    constructor(product_name = 'default title', price = 0, id_product) {
        super(product_name, price, id_product)  //у клсса-родителя берем базовые параметры
    }
    render() { //разметка товаров в корзине
        return `<div class="basket-item">
        <div class="basket-info">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        </div>
        <button class='deleteItem' onclick='deleteItem(${this.id_product})'>&times;</button>
        </div>`;
    }
}
class Basket { //класс самой корзины
    constructor(container) {
        this.CartGoods = [];
    }
    render() { //рендеринг страницы корзины со всеми экзеплярами товара.
        const basketItems = this.CartGoods.map(({ product_name, price, id_product }) => {
            const basketItems = new BasketItem(product_name, price, id_product);
            return basketItems.render()
        });
        document.querySelector('.cart').innerHTML = basketItems.join('');
    }
}

