const myFunction = (function () {
    const API_ENPOINT = "http://localhost:8080/BaiTapThucHanhWeb/Web_ban_giay/L0%20JavaScript/PHP/";
    const keyLocalStorageListSP = "DANHSACHSANPHAM";
    const keyLocalStorageItemCart = "DANHSACHITEMCART";
    const USER_ID = "USER_ID";

    const objectToQueryString = (obj) => {
        const keyValuePairs = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }

        return keyValuePairs.join('&');
    }
    //fecth api

    const getDataFromApi = async (url, data) => {
        try {
            return await fetch(url + `${data ? '?' + objectToQueryString(data) : ''}`)
                .then(response => response.json())
                .catch(err => console.log(err))

        } catch (err) { console.log(err); }
    }

    const postDataToApi = async (url, data, callback) => {
        try {
            return await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then(callback)
                .catch(err => console.log(err))
        } catch (err) { console.log(err); }
    }

    const putDataToApi = async (url, data, callback) => {
        try {
            console.log("put " + url)
            return await fetch(url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then(callback)
                .catch(err => console.log(err))
        } catch (err) { console.log(err) }

    }

    const deleteDataFromApi = async (url, id, callback) => {
        try {
            return await fetch(url + (id ? `?id=${id}` : ``), {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            })
                .then(response => response.json())
                .then(callback)
                .catch(err => console.log(err))
        } catch (err) { console.log(err) }

    }
    async function saveDataToLocal(localStorageKey, listData = []) {
        if (Array.isArray(listData)) {
            localStorage.setItem(localStorageKey, JSON.stringify(listData));
        }
    }

    function getDataFromLocal(localStorageKey) {
        const data = localStorage.getItem(localStorageKey);
        return JSON.parse(data);
    }
    function removeDataFromLocal(localStorageKey) {
        localStorage.removeItem(localStorageKey);
    }

    function checkNullData(key) {
        const data = getDataFromLocal(key);
        if (data === null) {
            return true;
        } else return false;
    }
    const getUserIdFromLocal = () => {
        const data = getDataFromLocal(USER_ID);
        if (data) {
            return data[0];
        } else return null;
    }
    const getProductByID = async (id, localItems) => {
        if (localItems) {
            return localItems[localItems.findIndex(item => item.productid === id)];
        } else {
            const localItemsData = await getDataFromApi(API_ENPOINT + "tatcasanpham.php");
            return localItemsData[localItemsData.findIndex(item => item.productid === id)];
        }
    }

    const getCartProductByID = async (productid, userid, size) => {
        const cart = await getDataFromApi(API_ENPOINT + "giohang.php", { id: userid });
        return cart[cart.findIndex(item => item.productid === productid && item.id === userid && item.size === Number(size))];
    }
    const getCartProducts = async () => {
        const userid = getUserIdFromLocal();
        return await getDataFromApi(API_ENPOINT + "giohang.php", { id: userid });
    }

    const getCurrentUser = async () => {
        const userid = getUserIdFromLocal();
        return await getDataFromApi(API_ENPOINT + `user.php?id=${userid}`);
    }
    const getProductQuantityBySize = async (id, size) => {
        const productSizes = await getDataFromApi(API_ENPOINT + `size.php`, { productid: id });
        return productSizes.find(product => product.size === Number(size)).quantity;
    }
    const addItemToCart = async (id, quantity, size) => {
        const userid = getUserIdFromLocal();
        let isAdded = false;
        if (!userid) {
            alert('Please log in to purchase this product!');
        } else {

            const localItems = await getDataFromApi(API_ENPOINT + "tatcasanpham.php");
            const product = await getProductByID(id, localItems);
            const itemOnCart = await getCartProductByID(id, userid, size);
            console.log(itemOnCart);
            const productQuantity = await getProductQuantityBySize(id, size);
            if (Number(productQuantity) === 0) {
                alert("Out of stock !");
            }
            else if (quantity > Number(productQuantity)) {
                alert("Exceeding stock quantity !")
            } else if (!itemOnCart) {
                await postDataToApi(API_ENPOINT + "giohang.php", { id: userid, productid: id, quantity: quantity ? quantity : 1, size: size });
                isAdded = true;
            }
            else if (Number(itemOnCart.quantity + quantity) > Number(productQuantity)) {
                alert("Exceeding stock quantity !")
            }
            else if (Number(itemOnCart.quantity) > 0) {
                await putDataToApi(API_ENPOINT + "giohang.php", { ...itemOnCart, quantity: quantity ? itemOnCart.quantity + quantity : ++itemOnCart.quantity, size: size });
                isAdded = true;
            }
        }
        return isAdded;
    }

    const removeItemFromCart = async (id, size) => {
        const userid = getUserIdFromLocal();
        const itemOnCart = await getCartProductByID(id, userid, size);
        if (Number(itemOnCart.quantity) > 1) {
            await putDataToApi(API_ENPOINT + "giohang.php", { ...itemOnCart, quantity: --itemOnCart.quantity, size: size });
        } else if (itemOnCart.quantity === 1) {
            await deleteItemCart(id, size, userid);
        }
    }

    const deleteItemCart = async (id, size, userid) => {
        let paramUserId = userid;
        if (!userid) {
            paramUserId = getUserIdFromLocal();
        }
        if (confirm("Bạn có chắc chắn muốn xóa")) {
            await deleteDataFromApi(API_ENPOINT + `giohang.php?id=${paramUserId}&productid=${id}&size=${size}`);
        }
    }

    const showCartLabel = async () => {
        const cart = await getCartProducts();
        const labelSumCart = document.querySelector('.header-cart__label--red');
        if (cart.length > 0) {
            if (labelSumCart.classList.contains('hide')) {
                labelSumCart.classList.remove('hide')
            }
            labelSumCart.innerHTML = cart.length;
        }
        else {
            labelSumCart.innerHTML = "";
            labelSumCart.classList.add('hide');
        }
    }

    const cartTotalCost = async (cart, localItems) => {
        let totalCost = 0;
        for (const cartItem of cart) {
            const item = await getProductByID(cartItem.productid, localItems);
            totalCost += item.price * cartItem.quantity*10;
        }

        return totalCost;
    }

    function getTotal(arr, attr) {
        if (Array.isArray(arr)) {
            if (arr.every(element => typeof (element) === 'number')) {
                return arr.reduce((sum, item) => {
                    return sum + item;
                }, 0)
            } else if (arr.every(element => typeof (element) === 'object')) {
                return arr.reduce((sum, item) => {
                    return sum + item[`${attr}`];
                }, 0)
            }
        }
    }
    const addCartItemsToBill = async (cart, bill_id) => {
        cart.forEach(async cartItem => {
            await postDataToApi(API_ENPOINT + "chitiethoadon.php", { bill_id: bill_id, productid: cartItem.productid, cart_id: cartItem.cart, quantity: cartItem.quantity, size: cartItem.size })
        })
    }
    const minusLocalDataQuantity = async (cart) => {
        const localItems = await getDataFromApi(API_ENPOINT + "tatcasanpham.php");
        cart.forEach(async cartItem => {
            const product = await getProductByID(cartItem.productid, localItems);
            putDataToApi(API_ENPOINT + "tatcasanpham.php", { productid: cartItem.productid, quantity: Number(product.quantity) - Number(cartItem.quantity), salequantity: Number(product.salequantity) + Number(cartItem.quantity) })
            const productQuantity = await getProductQuantityBySize(cartItem.productid, cartItem.size);
            putDataToApi(API_ENPOINT + "size.php", { productid: cartItem.productid, quantity: Number(productQuantity) - Number(cartItem.quantity), size: Number(cartItem.size) })
        })
    }
    const plusLocalDataSaleQuantity = async (cart) => {
        const localItems = await getDataFromApi(API_ENPOINT + "tatcasanpham.php");
        cart.forEach(async cartItem => {
            const product = await getProductByID(cartItem.productid, localItems);
            putDataToApi(API_ENPOINT + "tatcasanpham.php", { productid: cartItem.productid, salequantity: Number(product.salequantity) + Number(cartItem.quantity), quantity: product.quantity })

        })
    }

    const plusLocalDataQuantity = async (cart) => {
        const localItems = await getDataFromApi(API_ENPOINT + "tatcasanpham.php");
        cart.forEach(async cartItem => {
            const product = await getProductByID(cartItem.productid, localItems);
            putDataToApi(API_ENPOINT + "tatcasanpham.php", { productid: cartItem.productid, quantity: Number(product.quantity) + Number(cartItem.quantity), salequantity: product.salequantity })
            const productQuantity = await getProductQuantityBySize(cartItem.productid, cartItem.size);
            putDataToApi(API_ENPOINT + "size.php", { productid: cartItem.productid, quantity: Number(productQuantity) + Number(cartItem.quantity), size: Number(cartItem.size) })
        })
    }

    function showToastify(message, url) {
        Toastify({
            text: message,
            duration: 1000,
            destination: url,
            newWindow: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, rgb(76,76,76),rgb(102,102,102))",
                fontSize: "12px",
            },
            offset: {
                x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 60 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            onClick: function () { }
        }).showToast();
    }
    const getSalePrice = async (productId) => {
        try {
            const saleData = await getDataFromApi(API_ENPOINT + "giamgia.php");
            return saleData.find(item => item.productid === productId).saleprice;
        } catch (err) {
            console.log(err);
        }
    }
    const addLoader = () => {
        var newElement = document.createElement('div');
        newElement.classList.add('loader-container');
        newElement.innerHTML = '<span class="loader"></span>';
        const body = document.querySelector("body");
        body.appendChild(newElement);
    }
    const removeLoader = () => {
        const loaderContainer = document.querySelector(".loader-container");
        loaderContainer.remove();
    }
    return {
        USER_ID,
        API_ENPOINT,
        saveDataToLocal,
        getDataFromLocal,
        removeDataFromLocal,
        checkNullData,
        getUserIdFromLocal,
        addItemToCart,
        getProductByID,
        getCartProductByID,
        showCartLabel,
        cartTotalCost,
        minusLocalDataQuantity,
        plusLocalDataQuantity,
        showToastify,
        getDataFromApi,
        postDataToApi,
        putDataToApi,
        deleteDataFromApi,
        getTotal,
        getSalePrice,
        getCartProducts,
        removeItemFromCart,
        deleteItemCart,
        getCurrentUser,
        addLoader,
        removeLoader,
        addCartItemsToBill,
        plusLocalDataSaleQuantity
    }
})()