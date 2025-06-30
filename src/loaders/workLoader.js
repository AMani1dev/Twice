// export async function workLoader () {
//   let response = await fetch("/data.json") ;
//   let data = await response.json() ;
//   return data ;
// }
 
export async function workLoader() {
  const base = import.meta.env.BASE_URL;
  const response = await fetch(`${base}data.json`);
  const data = await response.json();
  return data;
}
