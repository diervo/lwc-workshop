// We will search in this API:
// https://restcountries.eu/rest/v2/lang/{language}
// https://restcountries.eu/rest/v2/lang/es

export async function fakeData() {
    return [
        {
            language: 'es',
            label: 'Spanish'
        },
        {
            language: 'en',
            label: 'English'
        }
    ];
}
