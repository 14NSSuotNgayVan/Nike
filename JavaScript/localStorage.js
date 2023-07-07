const listData = [
    {
        id: 'NP40',
        name: 'Nike Pegasus 40',
        price: 130,
        quantity: 20,
        imageSource: '../image/nike_pegasus_40.webp'
    },
    {
        id: 'NAF107',
        name: 'Nike Air Force 107',
        price: 110,
        quantity: 30,
        imageSource: '../image/NikeAirForce107.webp',
    },
    {
        id: 'LBXX',
        name: 'LeBron XX',
        price: 200,
        quantity: 32,
        imageSource: '../image/LeBronXX.webp',
    },
    {
        id: 'NDHR',
        name: 'Nike Dunk High Retro',
        price: 125,
        quantity: 23,
        imageSource: '../image/NikeDunkHighRetro.webp',
    },
    {
        id: 'AJLSE',
        name: 'Air Jordan Low SE',
        price: 120,
        quantity: 40,
        imageSource: '../image/AirJordanLowSE.webp',
    },
    {
        id: 'NAF1LP',
        name: 'Nike Air Force 1 Low Premium',
        price: 150,
        quantity: 20,
        imageSource: '../image/NikeAirForce1LowPremium.webp',
    },
    {
        id: 'AJ1M',
        name: 'Air Jordan 1 Mid',
        price: 125,
        quantity: 25,
        imageSource: '../image/AirJordan1Mid.webp',
    },
    {
        id: 'NAF1LRQS',
        name: 'Nike Air Force 1 Low Retro QS',
        price: 75,
        quantity: 23,
        imageSource: '../image/NikeAirForce1LowRetroQS.webp',
    },
    {
        id: 'KDT5X',
        name: 'KD Trey 5 X',
        price: 60,
        quantity: 30,
        imageSource: '../image/KDTrey5X.webp',
    },
    {
        id: 'AJ1LF',
        name: 'Air Jordan 1 Low FlyEase',
        price: 130,
        quantity: 15,
        imageSource: '../image/AirJordan1LowFlyEase.webp',
    },
    {
        id: 'NI3SE',
        name: 'Nike Invincible 3 SE',
        price: 180,
        quantity: 25,
        imageSource: '../image/NikeInvincible3SE.webp',
    },
    {
        id: 'NTH',
        name: 'Nike Tech Hera',
        price: 110,
        quantity: 15,
        imageSource: '../image/NikeTechHera.webp',
    },

];
const keyLocalStorageListSP = "DANHSACHSANPHAM";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
if(myFunction.checkNullData(keyLocalStorageListSP)){
    myFunction.saveDataToLocal(keyLocalStorageListSP,listData);
}
if(myFunction.checkNullData(keyLocalStorageItemCart)){
    myFunction.saveDataToLocal(keyLocalStorageItemCart)
}


