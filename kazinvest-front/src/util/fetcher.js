export default function fetcher({
  method='get',
  path,
  body,
  token,
}) {
  return fetch(path, {
    method,
    body: JSON.stringify(body),
    credentials: 'same-origin',
    headers: token ? {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    } : {
      'content-type': 'application/json',
    },
  }).then(resp => resp.json());
}
