export function country(data) {
    const language = Object.values(data[0].languages).join(', ');
    
     return `<img src="${data[0].flags.svg}" alt="" width="180">
        <h2>${data[0].name.official}</h2>
        <p><span>Capital:</span> ${data[0].capital}</p>
                <p><span>Population:</span> ${data[0].population}</p>
       <p><span>Languages:</span> ${ language }</p>`;

};