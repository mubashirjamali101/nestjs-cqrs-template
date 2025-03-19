import { APP_LOGO_URL, APP_NAME } from 'src/lib/constants'

export interface IVerifyEmailTemplateData {
  firstName: string
  lastName: string
  otpCode: string
}

const VerifyEmailTemplate = ({ firstName, lastName, otpCode }: IVerifyEmailTemplateData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>${APP_NAME}</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7fc;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 20px;
        border: 1px solid #d6d6d6;
      }
      .header {
        background-color: #2b3f74;
        color: #ffffff;
        padding: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin: -20px -20px 20px -20px;

        text-align: center;
      }
      h2 {
        margin: 0;
        font-size: 24px;
      }
      p {
        margin: 20px 0;
        line-height: 1.6;
      }
      .details {
        background-color: #e6eefc;
        color: #2b3f74;
        padding: 20px;
        margin: 20px 0;
        border-radius: 8px;
        font-size: 16px;
      }
      .button {
        display: inline-block;
        background-color: #2b3f74;
        color: #ffffff;
        padding: 10px 20px;
        margin: 20px 0;
        border-radius: 5px;
        text-decoration: none;
        font-size: 16px;
      }
      .logo {
        width: 150px;
        margin: 20px 0;
        padding: 10px;
        background-color: #fff;
      }
      .footer {
        font-size: 14px;
        color: #777;
        margin-top: 30px;

        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <img
          src="${APP_LOGO_URL}"
          alt="${APP_NAME}"
          class="logo"
        />
        <h2>${APP_NAME}</h2>
      </div>

      <p>Hello <strong>${firstName || ''} ${lastName || ''}</strong>,</p>

      <p>Thank you for registering with ${APP_NAME}. To verify your email address, please use the verification code below:</p>

      <div class="details">
      <strong>${otpCode}</strong>
      </div>

      <p>This code will expire in 5 minutes. If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>

      <p>Best regards,<br />${APP_NAME} Team</p>
      <div class="footer">
        <hr />
        <p>
          This is an automated email from ${APP_NAME}. Please do not reply
          directly to this message.
        </p>
        <p>
          &copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`

export default VerifyEmailTemplate
