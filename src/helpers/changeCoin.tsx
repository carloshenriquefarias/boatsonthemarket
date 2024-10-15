export function formatPriceWithCurrency(currencyName: string, price: string): string {
    let locale = 'en-US'; // Define um locale padrão
    let currency: string;

    switch (currencyName) {
        case 'EUROS':
            currency = 'EUR';
            locale = 'de-DE'; // Locale alemão como exemplo para o Euro
            break;
        case 'DOLARS':
            currency = 'USD';
            locale = 'en-US'; // Locale americano para dólar
            break;
        case 'POUNDS':
            currency = 'GBP';
            locale = 'en-GB'; // Locale britânico para libra
            break;
        default:
            currency = 'USD'; // Se a moeda não for reconhecida, use o dólar como padrão
            break;
    }

    // Cria um formatador para o locale e moeda especificados
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    });

    // Converte o preço para número, caso não seja possível retorna 0
    const numericPrice = parseFloat(price) || 0;

    // Retorna o preço formatado
    return formatter.format(numericPrice);
}



// export function formatPriceWithCurrency(currencyName: string , price: string): string {
//   let symbol;

// //   return currencyName ;
//   switch (currencyName) {
//       case 'EUROS':
//           symbol = '€';
//           break;
//       case 'DOLARS':
//           symbol = '$';
//           break;
//       case 'POUNDS':
//           symbol = '£';
//           break;
//       default:
//           symbol = ''; // Se a moeda não for reconhecida, não adiciona símbolo
//           break;
//   }

//   const formatter = new Intl.NumberFormat(locale, {
//         style: 'currency',
//         currency: currency,
//         minimumFractionDigits: 2
//       });

//   // Converte o preço para número e formata com duas casas decimais
//   const numericPrice = parseFloat(price);
//   const formattedPrice = numericPrice.toFixed(2);

//   return `${symbol}${formattedPrice}`;
// }
