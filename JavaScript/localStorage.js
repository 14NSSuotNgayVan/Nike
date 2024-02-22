const keyLocalStorageListSP = "DANHSACHSANPHAM";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
if(myFunction.checkNullData(keyLocalStorageListSP)){
    myFunction.saveDataToLocal(keyLocalStorageListSP,listData);
}
if(myFunction.checkNullData(keyLocalStorageItemCart)){
    myFunction.saveDataToLocal(keyLocalStorageItemCart)
}


