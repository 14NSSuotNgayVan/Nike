const url = new URL(window.location.href);
const productId = url.searchParams.get('productId');
const type = url.searchParams.get('type');
const productWrapper = document.querySelector(".selected-product-wrapper");
let textCenter;

const subQuantity = () => {
    const currentValue = parseInt(textCenter.innerText) || 0;
    if (currentValue > 1) {
        textCenter.innerText = currentValue - 1;
    }
}
const plusQuantity = (data) => {
    const currentValue = parseInt(textCenter.innerText) || 0;
    if (currentValue >= data) {
        alert("exceeding the quantity of product!");
    } else {
        textCenter.innerText = currentValue + 1;
    }
};
function formatNumber(number) {
    return number.toLocaleString('vi-VN');
}
const totalPrice = (salePrice, data) => {
    if (textCenter) {
        const currentValue = parseInt(textCenter.innerText) || 0;
        return salePrice ? salePrice * currentValue : data.price * currentValue;
    }
    return salePrice ? salePrice * 1 : data.price * 1;
}
const addSP = async (id) => {
    const selectSize = document.querySelector('#selected-size');
    if (await myFunction.addItemToCart(id, parseInt(textCenter.innerText), selectSize.value))
        window.location.href = '../html/cart.html';
    myFunction.showCartLabel();
};
const renderQuantity = async (productid) => {
    const productSize = await myFunction.getDataFromApi(myFunction.API_ENPOINT + `size.php`, { productid: productid });
    const selectSize = document.querySelector('#selected-size');
    const quantityLabel = document.querySelector('.selected-quantity');

    const quantityOfSize = productSize.findIndex(item => item.size === Number(selectSize.value));
    quantityLabel.innerHTML = `Quantity of size ${selectSize.value}: ${productSize[quantityOfSize].quantity}`;

}
const renderSize = async (productid) => {
    const productSize = await myFunction.getDataFromApi(myFunction.API_ENPOINT + `size.php`, { productid: productid });
    const listHtml = productSize.map(item => {
        return `
        <option value="${item.size}">${item.size}</option>
        `
    });
    return `
    <div>
        Size: <select name="size" id="selected-size" aria-label="label for the select" onChange ="renderQuantity('${productid}')" required>
        ${listHtml.join("")}
        </select>
    </div>`
}
const renderRate = (rate) => {
    let stringRate = "";
    for (let i = 0; i < rate; i++) {
        stringRate += "&#128970;";
    }
    return stringRate;
}
const renderSelectedProduct = async () => {
    const salePrice = await myFunction.getSalePrice(productId);
    const data = await myFunction.getProductByID(productId);
    const sizeHtml = await renderSize(productId);
    const product = `
    <div class="selected-image">
    ${type === 'sale' ? `<h4 class="selected-presentation"> <i class="fa fa-bell-o fa-2x"></i> On Sale</h4>` : ``}
    ${type === 'new' ? `<h4 class="selected-presentation"> <i class="fa fa-star-o fa-2x"></i> New</h4>` : ``}
    ${type === 'bestselling' ? `<h4 class="selected-presentation"> <i class="fa fa-heart-o fa-2x"></i> BestSelling</h4>` : ``}
        <img src="${data.imageSource}" />
    </div>
    <div class="selected-desc">
        <div class="selected-name">${data.name}</div>
        <div class="selected-origin">Việt Nam</div>
        <div class="selected-number">
            <div class="selected-price">${salePrice ? `<span class="old-price">${formatNumber(data.price * 10)}.000 VNĐ</span><u>${formatNumber(salePrice * 10)}.000 VNĐ</u>` : `<u>${formatNumber(data.price * 10)}.000 VNĐ</u>`}</div>
        </div>
        <div class="selected-rate">Reviews(<small>${data.salequantity} sold</small>) <span>${renderRate(data.rate)}</span></div>
        <p class="selected-desc-text">${data.description}</p>
        <div class="size-render">
            ${sizeHtml}
            <div class="selected-quantity">Quantity of size 00: 0</div>
        </div>
        <div class="selected-change-quantity">
            <span class="label-quantity">Quantity:</span>
            <svg class="btn btn-sub" onClick="subQuantity()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
            </svg>
            <span id ="quantity__center" class="quantity__center" contenteditable="true">1</span>
            <svg class="btn btn-plus" onClick="plusQuantity(${data.quantity})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
        <div><span class="selected-total-price">Total: ${formatNumber(totalPrice(salePrice, data) * 10)}.000VNĐ</span></div>
        <button class="btn btn-add-to-cart" onClick="addSP('${data.productid}')">Add to cart</button>
    </div>`;
    ;
    productWrapper.innerHTML = product;
    renderQuantity(productId);
    textCenter = document.getElementById('quantity__center');
    textCenter.addEventListener('input', function (event) {
        let currentContent = this.innerText;
        const maxLength = 5;
        if (currentContent.length > maxLength) {
            this.innerText = currentContent.slice(0, maxLength);
        }
        if (!/^\d+$/.test(this.innerText)) {
            this.innerText = this.innerText.replace(/[^\d]/g, '');
        }

    });
    textCenter.addEventListener('blur', function () {
        let currentContent = this.innerText;

        if (currentContent.trim() === "" || currentContent.trim() ==="0") {
            this.innerText = "1";
        }
    });
    textCenter.addEventListener('DOMSubtreeModified', function () {
        console.log("hii")
        const total = document.querySelector('.selected-total-price');
        total.innerHTML = `Total: ${formatNumber(totalPrice(salePrice, data) * 10)}.000VNĐ`;
    });
    textCenter.addEventListener('keydown', function (event) {
        const key = event.key;

        if (document.activeElement === this && (key === "ArrowUp" || key === "ArrowDown")) {
            event.preventDefault();

            let currentValue = parseInt(this.innerText) || 0;
            if (key === "ArrowUp") {
                currentValue += 1;
            } else if (key === "ArrowDown") {
                currentValue = Math.max(1, currentValue - 1);
            }
            this.innerText = currentValue;
        }
    });
}

renderSelectedProduct();
myFunction.showCartLabel();