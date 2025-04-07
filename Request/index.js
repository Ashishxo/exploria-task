import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const username = 'admin';
const password = 'password';



const main = async () => {
  try {
    // Login and get token
    const loginRes = await axios.post(`${BASE_URL}/login`, { username, password });
    const token = loginRes.data.token;
    console.log("Logged in");

    const latencies = [];

    for (let i = 0; i < 1000; i++) {
      const value = Math.floor(Math.random() * 20) + 1;

      const res = await axios.get(`${BASE_URL}/calculate/${value}`, {
        headers: {
          Authorization: token,
        },
      });

      const latency = parseInt(res.data.latency); 
      latencies.push(latency);

      console.log(
        `#${i + 1} Input: ${value} | Result: ${res.data.result} | Cache: ${res.data.cache} | Latency: ${latency}ms`
      );

    }

    
    latencies.sort((a, b) => a - b);
    const p90Index = Math.floor(0.9 * latencies.length);
    const p90 = latencies[p90Index];

    console.log("\nP90 latency:", p90, "ms");

  } catch (error) {
    console.error(" Error:", error.response?.data || error.message);
  }
};

main();
