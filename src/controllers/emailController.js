import { welcome, forgot, bought } from "../services/emailService.js";

const welcomeEmail = async (req, res) => {
  try {
    const result = await welcome(req.body);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error en el controlador de email", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const recoverEmail = async (req, res) => {
  try {
    const result = await forgot(req.body);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error en el controlador de email", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const boughtEmail = async (req, res) => {
  try {
    const result = await bought(req.body);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error en el controlador de email", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export { welcomeEmail, recoverEmail, boughtEmail };
