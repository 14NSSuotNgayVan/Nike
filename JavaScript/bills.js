function dateFormat(inputDate) {
  const dateObj = new Date(inputDate);

  if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
  }
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
function formatNumber(number) {
  return number.toLocaleString('vi-VN');
}
function toggleDetailBill(id) {
  const detailWrapper = document.getElementById(`${id}`);
  detailWrapper.classList.toggle("active");
}

const renderDetailBill = async (detail) =>{
  const detailList = await Promise.all(detail.map(async (item) => {
    const product = await myFunction.getProductByID(item.productid);
    return `<div class="detail-bill__products">
        <div class="detail-bill__img">
            <img src="${product.imageSource
      }" alt="" class="">
        </div>
        <div class="detail-bill__desc">
            <h3>${product.name}</h3>
            <span>Price: <b>$${formatNumber(product.price*10)}.000VNĐ</b></span>
            <span>Quantity: <b>${item.quantity}</b></span>
            <span>size: ${item.size}</span>
        </div>
    </div>`;
  }));
  return detailList.join("");
}

async function renderBill() {
    const userid = myFunction.getUserIdFromLocal();
    const user =await myFunction.getDataFromApi(myFunction.API_ENPOINT+"user.php",{id:userid});
  const billList = await myFunction.getDataFromApi(myFunction.API_ENPOINT+"hoadon.php",{id:userid});
  const localItems = await myFunction.getDataFromApi(myFunction.API_ENPOINT + "tatcasanpham.php");
  const billsBody = document.querySelector(".bills-table tbody");
  const billContainers = document.querySelector(".bills-container");
  if (billList.length !== 0) {
    billContainers.classList.remove("empty-bill");
    const bills = await Promise.all(billList.map(async (bill) => {
      const billDetails = await myFunction.getDataFromApi(myFunction.API_ENPOINT+"chitiethoadon.php",{bill_id:bill.bill_id})
      return `
              <tr>
                  <td class ="details">
                      <span>${bill.bill_id}</span>
                      <button class="btn-details" onClick = "toggleDetailBill('${bill.bill_id}')">Details
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>                                  
                      </button>
                      <div id = "${bill.bill_id}" class="detail-wrapper">
                          <!-- render detail -->
                          <div class ="close-detail" onClick = "toggleDetailBill('${bill.bill_id}')"><b>Bill ${bill.bill_id} 'details</b> <span>&times;</span></div>
                          <div class = "detail-bill ">${await renderDetailBill(billDetails)}</div>
                      </div>
                  </td>
                  <td>${user.name}</td>
                  <td>${dateFormat(bill.date)}</td>
                  <td>${billDetails.length}</td>
                  <td>${myFunction.getTotal(billDetails,'quantity')}</td>
                  <td>${formatNumber(await myFunction.cartTotalCost(billDetails,localItems))}.000 VNĐ</td>
                  <td>
                      <button class="btn-return" onClick="billItemReturn('${bill.bill_id}')">
                      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 206.108 206.108" xml:space="preserve">
                        <path d="M152.774,69.886H30.728l24.97-24.97c3.515-3.515,3.515-9.213,0-12.728c-3.516-3.516-9.213-3.515-12.729,0L2.636,72.523
                          c-3.515,3.515-3.515,9.213,0,12.728l40.333,40.333c1.758,1.758,4.061,2.636,6.364,2.636c2.303,0,4.606-0.879,6.364-2.636
                          c3.515-3.515,3.515-9.213,0-12.728l-24.97-24.97h122.046c19.483,0,35.334,15.851,35.334,35.334s-15.851,35.334-35.334,35.334H78.531
                          c-4.971,0-9,4.029-9,9s4.029,9,9,9h74.242c29.408,0,53.334-23.926,53.334-53.334S182.182,69.886,152.774,69.886z"/>
                        </svg>
                      </button>
                  </td>
              </tr>`;
    }));
    billsBody.innerHTML = bills.join("");
  } else {
    billContainers.classList.add("empty-bill");
  }

}

async function billItemReturn(billid) {
  if (confirm("Bạn có chắc chắn muốn trả hàng!")) {
    const billCart = await myFunction.getDataFromApi(myFunction.API_ENPOINT+"chitiethoadon.php", {bill_id: billid});
    await myFunction.plusLocalDataQuantity(billCart);
    await myFunction.deleteDataFromApi(myFunction.API_ENPOINT+"hoadon.php",billid, res => {
      console.log(res);
      alert('Trả hàng thành công!');
    })
  }
  renderBill();
}

renderBill();
myFunction.showCartLabel();

