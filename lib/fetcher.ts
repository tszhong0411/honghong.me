export default async function fetcher(input, init) {
  const res = await fetch(input, init);
  return res.json();
}
