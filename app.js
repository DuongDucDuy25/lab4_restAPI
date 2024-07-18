const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { error } = require('console');
// tạo đối tượng express
const app = express();
const upload =  multer({dest: 'uploads/'}); // định nghĩa thư mục chứa ảnh 
// cấu hình phục vụ file trong thư mục upload 
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
// cấu hình link đến thư mục views 
app.set('views',path.join(__dirname,'views'));
// chọn view engine là ejs
app.set('view engine','ejs');
// route hiển thị các ảnh trong thư mục
// upload 
app.get('/gallery',(req,res)=>{
    // đóng tất cả các file trong thư mục upload 
    fs.readdir(path.join(__dirname,'uploads'),(err,files)=>{
       if(err){
        console.error('Lỗi khi đọc file',err);
        return;
       }
       res.render('gallery',{images:files});
    });
});
// route để upload ảnh 
app.post('/upload',upload.single('image'),(req,res)=>{
    res.redirect('/gallery'); // trả về trang gallery
});
// lắng nghe 
app.listen(3001,()=>{
    console.log('Server đang chạy ở cổng 3001');
});