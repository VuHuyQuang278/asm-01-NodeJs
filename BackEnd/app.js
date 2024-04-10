const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const movieRoutes = require("./routes/movie");
const UserToken = require("./models/userToken");

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Tạo middleware để xác thực người dùng
app.use((req, res, next) => {
  // Lấy thông tin về userId và token từ request người dùng nhập vào
  const userId = req.query.userId;
  const token = req.query.token;

  UserToken.fetchAll((usersData) => {
    // Kiểm tra điều kiện của user
    let userValid = false;
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].userId === userId && usersData[i].token === token) {
        userValid = true;
      }
    }

    // Nếu user thoả mãn điều kiện thì gọi hàm next() để bắt đầu xử lý dữ liệu
    if (userValid) {
      next();
    } else {
      // Không thì trả về lỗi
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  });
});

app.use("/api/movies", movieRoutes);

// Thông báo khi người dùng không sử dụng đúng Route Endpoint
app.use((req, res, next) => {
  res.status(404).send({
    message: "Route not found",
  });
});

app.listen(5000);
