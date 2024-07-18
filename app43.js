// import thư viện 
const express = require('express');
const mailer = require('nodemailer');
const app43 = express();// tạo đối tượng mới 
// tạo thông tin người gửi 
let transporter = mailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'duyddph44929@fpt.edu.vn',
        pass : 'pzke bnwv dxzz ufbs'
    }
});
// nội dung cần gửi 
let mailOption = {
    from : 'duyddph44929@fpt.edu.vn',
    to : 'poo61868@gmail.com',
    subject : 'code test email',
    text : 'Day la email gui ngay 18/7, anh test code gửi gmail'
};

// thực hiện gửi 
transporter.sendMail(mailOption,(err,info)=>{
    if(err){
        console.error('Lỗi: ' ,e)
    }
    else{
        console.log('Thành công', info.messageId);
    }
});
// lắng nghe 
app43.listen(3002,()=>{
    console.log('Server dang chạy ở cổng 3002');
});