
const apiUrl = 'https://provinces.open-api.vn';
const addressList = {
  provinces: [],
  districts: [],
  wards: []
}
function resetSlectedAddresses() {
    const districts = document.querySelector('#districts');
    const wards = document.querySelector('#wards');
    districts.innerHTML = '<option value="">--Chọn huyện/ Quận--</option>';
    wards.innerHTML = '<option value="">--Chọn phường/ Xã--</option>';
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
function userAddressPairing() {
    const provinceSelectedbox = document.querySelector('#provinces');
    const districtSelectedbox = document.querySelector('#districts');
    const wardSelectedbox = document.querySelector('#wards');
    const homeAddressInput = document.querySelector('#home-address');
  
    const province = addressList.provinces.find(item => item.code === Number(provinceSelectedbox.value));
    const district = addressList.districts.find(item => item.code === Number(districtSelectedbox.value));
    const ward = addressList.wards.find(item => item.code === Number(wardSelectedbox.value));
  
    return homeAddressInput.value.trim() + ',' + ward.name.trim() + ',' + district.name.trim() + ',' + province.name.trim();
  }