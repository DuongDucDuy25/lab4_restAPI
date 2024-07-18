const express = require('express');
const jwt = require('jsonwebtoken');

// Tạo app
const app44 = express();

// Cho phép xử lý JSON
app44.use(express.json());

// Tạo khóa truy cập, khóa refresh
const accessTokenSecret = '123456';
const refreshTokenSecret = '123456';

// User, password cần tạo token
const users = [
    { id: 1, username: 'user123', password: 'password' },
];

// Tạo token truy cập: khóa này bị hết hạn trong 15 phút
function generateAccessToken(user) {
    return jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });
}

// Tạo token refresh: khóa này hết hạn trong 7 ngày
function generateRefreshToken(user) {
    return jwt.sign(user, refreshTokenSecret, { expiresIn: '7d' });
}

// Tạo API login
app44.post('/login', (req, res) => {
    const { username, password } = req.body; // Nhập user, pass qua Postman
    console.log('Username:', username);
    console.log('Password:', password);

    // Validate thông tin user nhập
    const user = users.find((u) =>
        u.username === username && u.password === password
    );
    if (!user) {
        console.log("User, pass không đúng");
        return res.status(401).json({ message: "User, pass không đúng" });
    }

    // Nếu dữ liệu nhập đúng -> ta tạo token
    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id, username: user.username });

    // Trả về kết quả
    res.json({ accessToken, refreshToken });
    console.log("AccessToken:", accessToken);
    console.log("RefreshToken:", refreshToken);
});

// Lắng nghe
app44.listen(3004, () => {
    console.log("Server đang chạy ở cổng 3004");
});
