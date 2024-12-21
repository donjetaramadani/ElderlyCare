import https from 'https';

export const fetchData = async (url, options) => {
  const requestOptions = {
    ...options,
    agent: new https.Agent({
      rejectUnauthorized: false  // In development, use this for self-signed certificates
    })
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
