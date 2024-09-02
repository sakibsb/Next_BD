const displayBDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 0
    });
    return formatter.format(num);
}

export default displayBDCurrency
