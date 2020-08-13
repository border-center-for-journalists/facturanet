const fetchNode = async (node, params = {}) => {
  // const url = new URL("http://localhost:1337/" + node);
  const url = new URL("https://facturanet-api.herokuapp.com/" + node);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  const res = await fetch(url);
  return res.json();
}

export default fetchNode;