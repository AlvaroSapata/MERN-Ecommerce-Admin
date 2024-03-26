const service = {
  baseURL: process.env.REACT_APP_SERVER_URL,
};

service.interceptors = {
  request: (config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${authToken}`,
      };
    }
    return config;
  },
};

service.get = async (url) => {
  const response = await fetch(service.baseURL + url, {
    method: 'GET',
    headers: service.interceptors.request({}).headers,
  });
  return response.json();
};

service.post = async (url, data) => {
  const response = await fetch(service.baseURL + url, {
    method: 'POST',
    headers: {
      ...service.interceptors.request({}).headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default service;
