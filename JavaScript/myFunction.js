const myFunction = (function () {
    const keyLocalStorageListSP = "DANHSACHSANPHAM";
    const keyLocalStorageItemCart = "DANHSACHITEMCART";

    function saveDataToLocal(localStorageKey, listData = []) {
        if (Array.isArray(listData)) {
            localStorage.setItem(localStorageKey, JSON.stringify(listData));
        }
    }

    function getDataFromLocal(localStorageKey) {
        const data = localStorage.getItem(localStorageKey);
        return JSON.parse(data);
    }

    function checkNullData(key) {
        const data = getDataFromLocal(key);
        if (data === null) {
            return true;
        } else return false;
    }

    function getLocalProductByID(id) {
        const localItems = getDataFromLocal(keyLocalStorageListSP);
        return localItems[localItems.findIndex(item => item.id === id)]
    }

    function getCartProductByID(id) {
        const localCart = getDataFromLocal(keyLocalStorageItemCart);
        return localCart[localCart.findIndex(item => item.id === id)]
    }

    function addItemToCart(id) {
        const localCart = getDataFromLocal(keyLocalStorageItemCart);
        const itemOnLocal = getLocalProductByID(id);
        const itemOnCart = getCartProductByID(id);

        if (itemOnLocal.quantity === 0) {
            alert("Mặt hàng đã hết !");
        }
        else if (!itemOnCart) {
            localCart.push({ id: id, soLuong: 1 });
        }
        else if (itemOnCart.soLuong === itemOnLocal.quantity) {
            alert("Vượt quá số lượng hàng trong kho !")
        }
        else if (itemOnCart.soLuong > 0) {
            localCart[localCart.findIndex(item => item.id === id)].soLuong++;
        }
        saveDataToLocal(keyLocalStorageItemCart, localCart)
    }

    function showCartLabel() {
        const localCart = getDataFromLocal(keyLocalStorageItemCart);
        const labelSumCart = document.querySelector('.header-cart__label--red');
        if (localCart.length > 0) {
            if (labelSumCart.classList.contains('hide')) {
                labelSumCart.classList.remove('hide')
            }
            labelSumCart.innerHTML = getDataFromLocal(keyLocalStorageItemCart).length;
        }
        else {
            labelSumCart.innerHTML = "";
            labelSumCart.classList.add('hide');
        }
    }

    function cartTotalCost(cart) {
        return cart.reduce((sum, cartItem) => {
            return sum + getLocalProductByID(cartItem.id).price * cartItem.soLuong;
        }, 0);
    }

    function minusLocalDataQuantity(cart) {
        const localItems = getDataFromLocal(keyLocalStorageListSP);
        cart.forEach(cartItem => {
            localItems.forEach(item => {
                if (item.id === cartItem.id) {
                    item.quantity -= cartItem.soLuong;
                }
                return item;
            })
        });
        saveDataToLocal(keyLocalStorageListSP, localItems);
    }

    function plusLocalDataQuantity(cart) {
        const localItems = getDataFromLocal(keyLocalStorageListSP);
        cart.forEach(cartItem => {
            localItems.forEach(item => {
                if (item.id === cartItem.id) {
                    item.quantity += cartItem.soLuong;
                }
                return item;
            })
        });
        saveDataToLocal(keyLocalStorageListSP, localItems);
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
                background: "linear-gradient(to right, rgb(253,187,20),rgb(253,177,20))",
                fontSize: "12px",
            },
            offset: {
                x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 60 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            onClick: function () { }
        }).showToast();
    }

    //fecth api
    const getDataFromApi = (url) => {
        try {
            return fetch(url)
                .then(response => response.json())
                .catch(err => console.log(err))
        } catch (err) { console.log(err); }
    }

    const postDataToApi = (url, data, callback) => {
        try {
            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then(callback)
                .catch(err => console.log(err))
        } catch (err) { console.log(err); }
    }

    const putDataToApi = (url, id, data, callback) => {
        try {
            fetch(url + '/' + id, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then(callback)
                .catch(err => console.log(err))
        } catch (err) { console.log(err) }

    }

    const deleteDataFromApi = (url, id, callback) => {
        try {
            fetch(url + '/' + id, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            })
                .then(response => response.json())
                .then(callback)
                .catch(err => console.log(err))
        } catch (err) { console.log(err) }

    }
    return {
        saveDataToLocal,
        getDataFromLocal,
        checkNullData,
        addItemToCart,
        getLocalProductByID,
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
    }
})()