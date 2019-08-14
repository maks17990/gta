module.exports.Init = () => {
    mp.mailer = {};
    mp.mailer.sendMail = (to, subject, message) => {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'demixrp61@gmail.com',
                pass: '170919905170'
            }
        });
        message += "<br /><br /> С Уважением, Команда Union RolePlay.";
        const mailOptions = {
            from: 'demixrp61@gmail.com',
            to: to,
            subject: subject,
            html: message
        };
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) console.log(err)
            else console.log(info);
        });
    }
}
