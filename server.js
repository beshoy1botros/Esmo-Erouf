const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// ملف لتخزين بيانات المستخدمين
const USERS_FILE = path.join(__dirname, "users.json");

// التأكد من وجود ملف المستخدمين أو إنشاء واحد جديد
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// نقطة نهاية لتسجيل المستخدمين
app.post("/api/register", (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  // التأكد من عدم تكرار الاسم
  if (users.find((u) => u.name === user.name)) {
    return res.status(400).json({ error: "المستخدم موجود مسبقاً" });
  }
  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  res.json({ message: "تم التسجيل بنجاح" });
});

// نقطة نهاية لتسجيل الدخول
app.post("/api/login", (req, res) => {
  const { name, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find((u) => u.name === name && u.password === password);
  if (user) {
    res.json({ message: "تم تسجيل الدخول بنجاح", user });
  } else {
    res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
  }
});
// في ملف server.js
app.get("/api/users", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء قراءة بيانات المستخدمين" });
  }
});


app.listen(port, () => console.log(`الخادم يعمل على المنفذ ${port}`));
