// const URL = 'https://restcountries.com/v3.1/name/';
// const properties = 'name,capital,population,flags,languages';

// // функція робить HTTP- запит на ресурс і повертає проміс з масивом країн
// export function fetchCountries(name) {
//   return fetch(`${URL}${name}?fields=${properties}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
// =============================================
