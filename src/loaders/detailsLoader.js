// export const detailsLoader = async ({ params }) => {
//   let { id } = params;
//   let response = await fetch("/data.json");
//   let data = await response.json();

//   return data.find((work) => work.id === id);
// };
export const detailsLoader = async ({ params }) => {
  const { id } = params;
  const base = import.meta.env.BASE_URL;

  const response = await fetch(`${base}data.json`);
  const data = await response.json();

  return data.find((work) => work.id === id);
};
