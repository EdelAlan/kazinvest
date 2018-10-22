export default function fetcher({
  method='get',
  path,
  body,
}) {
  return fetch(path, {
    method,
    body: JSON.stringify(body),
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    },
  }).then(resp => resp.json());
}
