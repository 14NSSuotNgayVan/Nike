function cartItemTotalCost(id, soLuong) {
  return myFunction.getLocalProductByID(id).price * soLuong;
}

function renderCart() {
  const localCart = myFunction.getDataFromLocal(keyLocalStorageItemCart);
  const cartBody = document.querySelector(".cart-table tbody");
  const cartFoot = document.querySelector(".cart-table tfoot");
  const cartContainer = document.querySelector(".cart-container");
  if (localCart.length === 0) {
    cartContainer.classList.add("empty");
  } else {
    const cartItemList = localCart.map((itemCart) => {
      return `<tr id ="${itemCart.id}">
            <td class="product-name" ">
                <div class="product-name__img">
                    <img src="${myFunction.getLocalProductByID(itemCart.id).imageSource
        }" alt="" class="">
                </div>
                <div class="product-name__desc">
                    <h3>${myFunction.getLocalProductByID(itemCart.id).name}</h3>
                    <span class = "">Quantity:${myFunction.getLocalProductByID(itemCart.id).quantity
        }</span>
                </div>
            </td>
            <td class="quantity">
                <svg class = "btn-sub" onClick="cartItemQuantityDecrease('${itemCart.id
        }')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>
                <span class = "quantity__center">${itemCart.soLuong}</span>
                <svg class ="btn-plus" onClick="cartItemQuantityIncrease('${itemCart.id
        }')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </td>
            <td class="subtotal">$${myFunction.getLocalProductByID(itemCart.id).price}</td>
            <td class="total">$${cartItemTotalCost(
          itemCart.id,
          itemCart.soLuong
        )}</td>
            <td class="btn-clear-cart" onClick="cartItemDelete('${itemCart.id
        }')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </td>
        </tr>`;
    });
    const renderCartFooter = `
        <tr>
            <td colspan="5" class ="total-cart">Total: $${myFunction.cartTotalCost(localCart)}</td>
        </tr>`;
    cartBody.innerHTML = cartItemList.join("");
    cartFoot.innerHTML = renderCartFooter;
  }
}

function resetSlectedAddresses() {
  const districts = document.querySelector('#districts');
  const wards = document.querySelector('#wards');
  districts.innerHTML = '<option value="">--Chọn huyện/ Quận--</option>';
  wards.innerHTML = '<option value="">--Chọn phường/ Xã--</option>';
}

function cartItemQuantityDecrease(id) {
  const localCart = myFunction.getDataFromLocal(keyLocalStorageItemCart);
  const cartItem = myFunction.getCartProductByID(id);

  if (cartItem.soLuong > 1) {
    localCart[localCart.findIndex((item) => item.id === id)].soLuong--;
    myFunction.saveDataToLocal(keyLocalStorageItemCart, localCart);
  } else if (cartItem.soLuong === 1) {
    cartItemDelete(id);
  }
  renderCart();
}

function cartItemQuantityIncrease(id) {
  myFunction.addItemToCart(id);
  renderCart();
}

function cartItemDelete(id) {
  const localCart = myFunction.getDataFromLocal(keyLocalStorageItemCart);

  if (confirm("Bạn có chắc chắn muốn xóa")) {
    localCart.splice(
      localCart.findIndex((item) => item.id === id),
      1
    );
    myFunction.saveDataToLocal(keyLocalStorageItemCart, localCart);
  }
  renderCart();
}

function toggleModal() {
  const cartModalContainer = document.querySelector('.cart-modal-container');
  cartModalContainer.classList.toggle('active');
}

const apiUrl = 'https://provinces.open-api.vn';
const addressList = {
  provinces: [],
  districts: [],
  wards: []
}

async function getDistrictsByProvinceID(id) {

  const data = await myFunction.getDataFromApi(apiUrl + '/api/d/');
  return data.filter(item => item.province_code === Number(id))

}

async function getWardsByDistrictsID(id) {

  const data = await myFunction.getDataFromApi(apiUrl + '/api/w/');
  return data.filter(item => item.district_code === Number(id));
}

async function handleRenderProvinces() {

  const data = await myFunction.getDataFromApi(apiUrl + '/api/p/');
  addressList.provinces = data;
  const provinces = document.querySelector('#provinces');
  const provinceList = data.map(function (item) {
    return `<option value="${item.code}">${item.name}</option>`
  })
  provinces.innerHTML += provinceList.join('');
}

async function handleRenderDistricts(id) {
  resetSlectedAddresses();
  if (id) {
    const dataList = await getDistrictsByProvinceID(id)
    addressList.districts = dataList;
    const districts = document.querySelector('#districts');
    const districtsList = dataList.map(function (item) {
      return `<option value="${item.code}">${item.name}</option>`
    })
    districts.innerHTML += districtsList.join('');
  }

}

async function handleRenderWards(id) {
  if (id) {
    const dataList = await getWardsByDistrictsID(id);
    addressList.wards = dataList;
    const wards = document.querySelector('#wards');
    const wardsList = dataList.map(function (item) {
      return `<option value="${item.code}">${item.name}</option>`
    })
    wards.innerHTML += wardsList.join('');
  }
}

function createRandomID(billList) {
  let randomID = Math.random().toString(36).slice(2, 9);
  if (billList.length !== 0) {
    if (billList.some(item => item.id === randomID)) {
      return createRandomID(billList);
    } else return randomID;
  } else return randomID;

}

function getTimeNow() {
  const date = new Date();
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

function userNamePairing() {
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  return firstName.value.trim() + ' ' + lastName.value.trim();
}

function userAddressPairing() {
  const provinceSelectedbox = document.querySelector('#provinces');
  const districtSelectedbox = document.querySelector('#districts');
  const wardSelectedbox = document.querySelector('#wards');
  const homeAddressInput = document.querySelector('#home-address');

  const province = addressList.provinces.find(item => item.code === Number(provinceSelectedbox.value));
  const district = addressList.districts.find(item => item.code === Number(districtSelectedbox.value));
  const ward = addressList.wards.find(item => item.code === Number(wardSelectedbox.value));

  return homeAddressInput.value.trim() + ' ' + ward.name.trim() + ' ' + district.name.trim() + ' ' + province.name.trim();
}

async function handleBuy() {
  const billList = await myFunction.getDataFromApi('http://localhost:3000/bills');
  const cartList = myFunction.getDataFromLocal(keyLocalStorageItemCart);
  const email = document.querySelector('#email').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const message = document.querySelector('#message').value;

  if (validateForm()) {
    const bill = {
      id: createRandomID(billList),
      time: getTimeNow(),
      message: message,
      user: {
        name: userNamePairing(),
        email: email,
        phone: phoneNumber,
        address: userAddressPairing(),
      },
      cart: cartList,
    }
    myFunction.minusLocalDataQuantity(cartList);
    myFunction.saveDataToLocal(keyLocalStorageItemCart, [])
    myFunction.postDataToApi('http://localhost:3000/bills', bill, res => {
      console.log('post data to bill api: ' + res);
      alert('Mua thành công!');
    })
    toggleModal();
  } else {
    document.forms[0].reportValidity();
  }
}

handleRenderProvinces();
renderCart();
