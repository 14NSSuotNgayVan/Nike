const searchInput = document.querySelector('#search-input');

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
}
function formatNumber(number) {
    return number.toLocaleString('vi-VN');
  }
const renderProduct = (data,type)=>{
    const dataList = data.map((product,index)=>{
        return `
        <div class="product-item" onClick="detailSP('${product.productid}','${type}')">
            ${product.quantity==0 ? '<img class="sold-out" src="../image/sold-out.png"/>':''}
            <div class="product-item__image"><img src="${product.imageSource}" alt="">
            </div>
            <div class="product-desc">
                <h4 class="product-desc__name">${product.name}</h4>
                <span class="product-desc__price">${formatNumber(product.price*10)}.000 VNĐ</span>
                <span class="product-desc__quantity">Units sold:${product.salequantity}</span>
            </div>
        </div>
        `;
    });
    return dataList.join("");
}

const renderSaleProduct = async()=>{
    const saleProductContainer = document.querySelector('.sale-wrapper');
    const localItems = await myFunction.getDataFromApi("http://localhost:8080/BaiTapThucHanhWeb/Web_ban_giay/L0%20JavaScript/PHP/giamgia.php");

    const dataList = localItems.map((product,index)=>{
        return `
        <div class="product-item" onClick="detailSP('${product.productid}','sale')"> 
        ${product.quantity==0 ? '<img class="sold-out" src="../image/sold-out.png"/>':''}
        <span class="product-desc__saleto">Sale to: ${formatDate(product.saleto)}</span>
            <div class="product-item__image"><img src="${product.imageSource}" alt="">
            </div>
            <div class="product-desc">
                <h4 class="product-desc__name">${product.name}</h4>
                <span class="product-desc__price"><span class="old-price">${formatNumber(product.price*10)}.000 VNĐ</span> -> ${formatNumber(product.saleprice*10)}.000 VNĐ</span>
                <span class="product-desc__quantity">Units sold:${product.salequantity}</span>
            </div>
        </div>
        `;
    })
    saleProductContainer.innerHTML += dataList.join("");
}
function detailSP(id,type){
    window.location.href = `../html/Product.html?productId=${id}&type=${type}`;
}
const addSP = async (e,id)=> {
    e.stopPropagation();
    const product =await myFunction.getProductByID(id);
    if(await myFunction.addItemToCart(id)) myFunction.showToastify(`Bạn vừa thêm ${ product.name} vào giỏ hàng !`,'../html/cart.html');
    myFunction.showCartLabel();
};
const handleSearch = async ()=>{
    const searchProductContainer = document.querySelector('#search-wrapper');
    const renderSearch = document.querySelector('#search-wrapper .render-search');
    var newParagraph = document.querySelector('#search-wrapper h3');
    newParagraph.classList.add('product-container-tittle');
    if(searchInput.value.trim()){

        const searchProduct = await myFunction.postDataToApi(myFunction.API_ENPOINT + `tatcasanpham.php?price=${searchInput.value.trim()}`); 
        if(searchProduct.length >0){
            newParagraph.innerHTML = `List product has price like '${searchInput.value} VNĐ'`;
            renderSearch.innerHTML = renderProduct(searchProduct,'');
            searchProductContainer.classList.remove('hide');
        }else{
            searchProductContainer.classList.remove('hide');
            newParagraph.innerHTML = `No product has price like '${searchInput.value} VNĐ'`;
            setTimeout(function(){
                searchProductContainer.classList.add('hide');
                renderSearch.innerHTML = "";
            },4000)
        }
    }else{
        searchProductContainer.classList.add('hide');
    }
      
};
(async()=>{
    const newProductContainer = document.querySelector('.new-wrapper');
    const bestsellingProductContainer = document.querySelector('.bestselling-wrapper');
    const newProducts = await myFunction.getDataFromApi(`http://localhost:8080/BaiTapThucHanhWeb/Web_ban_giay/L0%20JavaScript/PHP/hangmoi.php`);
    newProductContainer.innerHTML += renderProduct(newProducts,'new');
    
    const bestsellingProduct = await myFunction.getDataFromApi(`http://localhost:8080/BaiTapThucHanhWeb/Web_ban_giay/L0%20JavaScript/PHP/banchay.php`);
    bestsellingProductContainer.innerHTML += renderProduct(bestsellingProduct,'bestselling');
    
    searchInput.addEventListener('change',handleSearch);
    renderSaleProduct();
    myFunction.showCartLabel();
})();
