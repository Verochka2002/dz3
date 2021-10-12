//попробовала сделать с промисами, но страница перестала обновляться
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

const service = function (method, postfix) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${API}${postfix}`, true)
        xhr.send();
        xhr.onload = (event) => {
            resolve(JSON.parse(event.target.responseText));
        }
    })
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.fetchGoods(() => {
            this.render();
        })
    }
    fetchGoods() {
        service('GET', GOODS).then((goodsList) => {
            this.goods = goodsList;
        })
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

class BasketItem { //класс для элементов корзины
    constructor(title = 'default title', price = 0) {
        this.title = title;
        this.price = price;
    }
}

class Basket { //класс для самой корзины
    constructor() { }
    deleteFromBasket() { } //метод для удаления товаров из корзины
    addNumber() { } //увеличения числа товаров в самой корзине
}
