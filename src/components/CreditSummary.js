const CreditSummary = ({toplamGeriOdeme, aylikTaksitTutari, totalBsmv, totalKkdf}) =>  {
    return <>
    <p>Toplam Geri Ödeme : {toplamGeriOdeme} TL</p>
    <p>Aylık Taksit Tutarı : {aylikTaksitTutari} TL</p>
    <p>BSMV : {totalBsmv} TL</p>
    <p>KKDF : {totalKkdf} TL</p>
    </>
}

export {CreditSummary}