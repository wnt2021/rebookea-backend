import db from "../config/db.js";

const registerEmailHtml = (name) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Gracias por registrarte</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      h2 {
        color: #333333;
      }
      p {
        color: #555555;
        font-size: 16px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #f17c13;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>¡Gracias por registrarte, ${name}! 🎉</h2>
      <p>
        Te damos la bienvenida a <strong>Rebookea</strong>. Estamos encantados de que te unas a nuestra comunidad.
      </p>
      <p>
        Ya puedes empezar a explorar, intercambiar y vender libros con otros estudiantes.
      </p>
      <div class="footer">
        Si no creaste esta cuenta, ignora este mensaje o contáctanos.
      </div>
    </div>
  </body>
</html>
    `;
};

const recoverEmailHtml = (name) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Restablecer contraseña</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        text-align: center;
      }
      h2 {
        color: #333333;
      }
      p {
        color: #555555;
        font-size: 16px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #f17c13;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>¡Estimado señor/a, ${name}! 🎉</h2>
      <p>
        Ha indicado que ha olvidado la contraseña para acceder a su cuenta de <strong>Rebookea</strong>. Por favor, haga clic en el botón para recuperar su contraseña.
      </p>
      <div class="button-container">
        <a class="button" href="http://localhost:5173/reset">Resetear Contraseña</button>
      </div>
      <div class="footer">
        Este es un correo automático no es necesario contestar.
      </div>
    </div>
  </body>
</html>
    `;
};

const boughtEmailHtml = (title, price, image) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gracias por tu compra</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color:#4CAF50; padding:20px; text-align:center; color:white;">
              <h1>¡Gracias por tu compra!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px; text-align:center;">
              <p style="font-size:18px;">Estamos encantados de que hayas confiado en nosotros.</p>
              <h2 style="color:#333;">Detalles de tu producto:</h2>
              <img src="${image}" alt="Producto" style="max-width:300px; border-radius:8px; margin:20px 0;" />
              <h3 style="margin:0; color:#555;">${title}</h3>
              <p style="font-size:20px; font-weight:bold; color:#4CAF50;">${price}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px; text-align:center; color:#777;">
              <p>Si tienes alguna pregunta, no dudes en <a href="mailto:soporte@rebookea.com" style="color:#4CAF50; text-decoration:none;">contactarnos</a>.</p>
              <p>¡Esperamos que disfrutes tu compra!</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f0f0f0; text-align:center; padding:15px; font-size:12px; color:#888;">
              © 2025 REBOOKEA. Todos los derechos reservados.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const welcome = async (data) => {
  const { name } = data;
  const transporter = db.createTransporter();

  const mailOptions = {
    from: db.config.EMAIL_USER,
    to: "wintopadedokun@gmail.com",
    subject: "Email de bienvenida",
    html: registerEmailHtml(name),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado" + info.response);
    return { success: true, message: "Correo enviado correctamente." };
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return { success: false, error: "Error al enviar el correo." };
  }
};

const forgot = async (data) => {
  const { name } = data;
  const transporter = db.createTransporter();

  const mailOptions = {
    from: db.config.EMAIL_USER,
    to: "wintopadedokun@gmail.com",
    subject: "Restablecer su contraseña",
    html: recoverEmailHtml(name),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado" + info.response);
    return { success: true, message: "Correo enviado correctamente." };
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return { success: false, error: "Error al enviar el correo." };
  }
};

const bought = async (data) => {
  const { title, price, image } = data;
  const transporter = db.createTransporter();

  const mailOptions = {
    from: db.config.EMAIL_USER,
    to: "wintopadedokun@gmail.com",
    subject: "Gracias por tu compra",
    html: boughtEmailHtml(title, price, image),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado" + info.response);
    return { success: true, message: "Correo enviado correctamente." };
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return { success: false, error: "Error al enviar el correo." };
  }
};

export { welcome, forgot, bought };
