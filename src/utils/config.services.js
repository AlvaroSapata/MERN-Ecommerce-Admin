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

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    // Handle cases where response is not valid JSON
    console.error("Error parsing JSON response:", error);
    return null; // Or handle this case based on your requirements
  }
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

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    // Handle cases where response is not valid JSON
    console.error("Error parsing JSON response:", error);
    return null; // Or handle this case based on your requirements
  }
};

service.put = async (url, data) => {
  const response = await fetch(service.baseURL + url, {
    method: 'PUT',
    headers: {
      ...service.interceptors.request({}).headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    // Handle cases where response is not valid JSON
    console.error("Error parsing JSON response:", error);
    return null; // Or handle this case based on your requirements
  }
};

service.delete = async (url) => {
  const response = await fetch(service.baseURL + url, {
    method: 'DELETE',
    headers: service.interceptors.request({}).headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    // No content to parse, return success message or handle as needed
    return { message: 'Product deleted successfully' };
  }

  try {
    return await response.json();
  } catch (error) {
    // Handle cases where response is not valid JSON
    console.error("Error parsing JSON response:", error);
    return null; // Or handle this case based on your requirements
  }
};


export default service;
