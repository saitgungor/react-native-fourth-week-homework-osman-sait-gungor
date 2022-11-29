import {baseURL} from './endpoints';

export const get = endpoint => {
  return new Promise((resolve, reject) => {
    const method = 'GET';
    const headers = {'Content-Type': 'application/json'};

    fetch(baseURL + endpoint, {
      method,
      headers,
    })
      .then(convertJson)
      .then(res => resolve(processResponse(endpoint, res, method), headers))
      .catch(e => {
        reject(e);
      });
  });
};

const convertJson = async res => {
  const data = res.status === 200 ? await res.json() : null;
  return {data, status: res.status, success: res.status === 200}; // =>  /api/products responseObj => /actiona/products {data,status,success}
};

const processResponse = (endpoint, res, method) => {
  const status = res.status;
  const success = res.success;
  const data = res
    ? res.data
      ? res.data.data
        ? res.data.data
        : res.data
      : null
    : null;

  return {status, success, data};
};
