# Node.js Cache Implementation with Auth


---



##  Setup

### 1. Clone the Repository

Open Response Directory

```bash
git clone https://github.com/Ashishxo/exploria-task
cd Response
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root:

```env
PORT=3000
MONGO_URI=your_mongodb_uri_here
SECRET_KEY=your_secret_key
```

### 4. Run the Server

```bash
npm start
```

---

## Authentication Flow



- `POST /register` – Register a new user. (Username and Password in body)
- `POST /login` – Authenticate and receive a JWT. (Username and Password in body)
- `GET /calculate/:value` – Protected route; requires JWT in the header as:

```
<token>
```

---

##  LRU Cache

In this project, I have implemented LRU (Least Recently Used) Cache using the lru-cache library. It helps optimize performance by storing results of expensive computations and reusing them when the same input is requested again. When the cache reaches its maximum capacity, it automatically removes the least recently used entry.

---

## Response Sample (`/calculate/:value`)

```json
{
  "result": 412,
  "cache": "HIT",
  "latency": "2ms"
}
```

- `result`: Computed output
- `cache`: `"HIT"` or `"MISS"`
- `latency`: Time taken by backend to compute the result
- 


---

## Testing

Open Request Directory and Run Testing Script to hit API 1000 times and get P90 Score

```bash
cd Request
node index.js
```




