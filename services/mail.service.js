const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Mail.ru",
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation in Simple Auth app',
            text: '',
            html:
                `
                    <div>
                        <h2>To activate your account, please follow the link:</h2>
                        <a href="${link}">${link}</a>
                        <p>If you have not registered on our service, then just ignore this email.</p>
                    </div>
                `
        })
    }
}

module.exports = new MailService();