function totalItemBill(bill) {
  return bill.cart.reduce((sum, item) => {
    return sum + item.soLuong;
  }, 0);
}

function toggleDetailBill(id) {
  const detailWrapper = document.getElementById(`${id}`);
  detailWrapper.classList.toggle("active");
}

function renderDetailBill(detail) {
  const detailList = detail.map((item) => {
    return `<div class="detail-bill__products">
        <div class="detail-bill__img">
            <img src="${myFunction.getLocalProductByID(item.id).imageSource
      }" alt="" class="">
        </div>
        <div class="detail-bill__desc">
            <h3>${myFunction.getLocalProductByID(item.id).name}</h3>
            <span>Giá: <b>$${myFunction.getLocalProductByID(item.id).price}</b></span>
            <span>Số lượng: <b>${item.soLuong}</b></span>
        </div>
    </div>`;
  });
  return detailList.join("");
}

async function renderBill() {

  const billList = await myFunction.getDataFromApi('http://localhost:3000/bills');
  const billsBody = document.querySelector(".bills-table tbody");
  const billConainers = document.querySelector(".bills-container");
  if (billList.length !== 0) {
    billConainers.classList.remove("empty-bill");

    const bills = billList.map((bill) => {
      return `
              <tr>
                  <td class ="details">
                      <span>${bill.id}</span>
                      <button class="btn-details" onClick = "toggleDetailBill('${bill.id}')">Details
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>                                  
                      </button>
                      <div id = "${bill.id}" class="detail-wrapper">
                          <!-- render detail -->
                          <div class ="close-detail" onClick = "toggleDetailBill('${bill.id}')"><span>&times;</span></div>
                          <div class = "detail-bill ">${renderDetailBill(bill.cart)}</div>
                      </div>
                  </td>
                  <td>${bill.user.name}</td>
                  <td>${bill.time}</td>
                  <td>${bill.cart.length}</td>
                  <td>${totalItemBill(bill)}</td>
                  <td>$${myFunction.cartTotalCost(bill.cart)}</td>
                  <td>
                      <button class="btn-return" onClick="billItemReturn('${bill.id}')">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </button>
                  </td>
              </tr>`;
    });
    billsBody.innerHTML = bills.join("");
  } else {
    billConainers.classList.add("empty-bill");
  }

}

async function billItemReturn(id) {
  if (confirm("Bạn có chắc chắn muốn trả hàng!")) {
    const billList = await myFunction.getDataFromApi('http://localhost:3000/bills');
    myFunction.plusLocalDataQuantity(billList.find(item => item.id === id).cart);
    myFunction.deleteDataFromApi('http://localhost:3000/bills', String(id), res => {
      console.log(res);
      alert('Trả hàng thành công!');
    })
  }
  renderBill();
}

renderBill();
