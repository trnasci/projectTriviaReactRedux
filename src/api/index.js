// funções de requisição de api
const requestToken = async () => {
  const END_POINT = 'https://opentdb.com/api_token.php?command=request';
  const result = await fetch(END_POINT);
  const data = await result.json();
  return data.token;
};

export default requestToken;
