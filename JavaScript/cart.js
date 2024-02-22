const cartItemTotalCost = async (id, quantity, localItems) => {
  const item = await myFunction.getProductByID(id, localItems);
  return formatNumber(item.price * quantity*10);
}
function formatNumber(number) {
  return number.toLocaleString('vi-VN');
}
const renderCart = async () => {
  const dbCart = await myFunction.getCartProducts();
  const cartBody = document.querySelector(".cart-table tbody");
  const cartFoot = document.querySelector(".cart-table tfoot");
  const cartContainer = document.querySelector(".cart-container");
  if (dbCart.length === 0) {
    cartContainer.classList.add("empty");
  } else {
    const localItems = await myFunction.getDataFromApi(myFunction.API_ENPOINT + "tatcasanpham.php");
    const cartItemList = await Promise.all(dbCart.map(async (item) => {
      const cartItem = await myFunction.getProductByID(item.productid, localItems);
      return `<tr id ="${item.id}">
            <td class="product-name" ">
                <div class="product-name__img">
                    <img src="${cartItem.imageSource
        }" alt="" class="">
                </div>
                <div class="product-name__desc">
                    <h3>${cartItem.name}</h3>
                    <span class = ""> Size: ${item.size}</span>
                </div>
            </td>
            <td class="quantity">
                <svg class = "btn-sub" onClick="cartItemQuantityDecrease('${item.productid}',${item.size
        })" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>
                <span class = "quantity__center">${item.quantity}</span>
                <svg class ="btn-plus" onClick="cartItemQuantityIncrease('${item.productid}',${item.size}
        )" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </td>
            <td class="subtotal">${formatNumber(Number(cartItem.price)*10)}.000 VNĐ</td>
            <td class="total">${await cartItemTotalCost(
          item.productid,
          item.quantity,
          localItems
        )}.000 VNĐ</td>
            <td class="btn-clear-cart" onClick="cartItemDelete('${item.productid
        }',${item.size})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </td>
        </tr>`;
    }));
    const renderCartFooter = `
        <tr>
            <td colspan="5" class ="total-cart">Total: ${formatNumber(await myFunction.cartTotalCost(dbCart))}.000 VNĐ</td>
        </tr>`;
    cartBody.innerHTML = cartItemList.join("");
    cartFoot.innerHTML = renderCartFooter;
  }
}

const cartItemQuantityDecrease = async (id,size) => {
  await myFunction.removeItemFromCart(id,size);
  await renderCart();
}

const cartItemQuantityIncrease = async (id,size) => {
  if (await myFunction.addItemToCart(id,1,size)) await renderCart();
}

const cartItemDelete = async (id,size) => {
  await myFunction.deleteItemCart(id,size);
  await renderCart();
}

const  toggleModal = async ()=> {
  const cartModalContainer = document.querySelector('.cart-modal-container');
  if (cartModalContainer.classList.contains('active')) cartRemoveEventListener();
  else {
    myFunction.addLoader();
      const customer = await myFunction.getCurrentUser();
      const Address = customer.address.split(',');
      const province = addressList.provinces.find(item=>item.name === Address[3].trim());
      provinceSelectBox.value = province.code;

      await handleRenderDistricts(province.code);
      const district = addressList.districts.find(item => item.province_code === Number(province.code)&& item.name === Address[2].trim());
      districtSelectBox.value = district.code;
      
      await handleRenderWards(district.code);
      const ward = addressList.wards.find(item => item.district_code === Number(district.code) && item.name === Address[1].trim());
      wardSelectBox.value = ward.code; 
      
      displayname.value = customer.displayname;
      email.value =customer.email;
      phoneNumber.value =customer.phone;
      homeAddress.value = Address[0].trim();
      cartAddEventListener();
    }
    
    cartModalContainer.classList.toggle('active');
    myFunction.removeLoader();

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
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}


async function handleBuy() {
  const userid =  myFunction.getUserIdFromLocal();
  const cartList = await myFunction.getDataFromApi(myFunction.API_ENPOINT+"giohang.php",{id:userid});
  const phoneNumber = document.querySelector('#phone-number').value;
  const message = document.querySelector('#message').value;
  if (cartValidateForm()) {
    const data = await myFunction.postDataToApi(myFunction.API_ENPOINT+"hoadon.php",{id:userid,phone:phoneNumber,address:userAddressPairing(),message:message,date: getTimeNow()});
    await myFunction.addCartItemsToBill(cartList,data.bill_id);
    await myFunction.minusLocalDataQuantity(cartList);
    await myFunction.deleteDataFromApi(myFunction.API_ENPOINT+"deleteallgiohang.php");
    window.location.href = '../html/bills.html';
    toggleModal();
  } else {
    alert('Mua không thành công!');
  }
}
handleRenderProvinces();
renderCart();