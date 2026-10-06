const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

app.get("/", (req, res) => res.send("API is running"));

app.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "All fields are required" });
  if (users.find(u => u.email === email))
    return res.status(409).json({ success: false, message: "Email already registered" });
  users.push({ name, email, password });
  res.json({ success: true, message: "Registered successfully" });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });
  const user = users.find(u => u.email === email && u.password === password);
  if (!user)
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  res.json({ success: true, message: "Login successful", name: user.name });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
