import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const updatePassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email y nueva contraseña son requeridos.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { passwordHash }
    });
    return res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar la contraseña.' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    console.log('Intentando registrar usuario:', req.body);
    const { name, email, password, role } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log('Usuario existente:', existingUser);
    if (existingUser) return res.status(400).json({ error: 'Email ya registrado' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash, role }
    });
    console.log('Usuario creado:', user);
  res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Intentando login para:', email);
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('Usuario encontrado:', user);
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log('Resultado bcrypt.compare:', valid);
    if (!valid) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log('[resetPassword] Solicitud recibida para:', email);

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('[resetPassword] Usuario no encontrado:', email);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña',
      html: `
        <p>Hola,</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="http://localhost:8080/reset-password">http://localhost:8080/reset-password</a>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
      `,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail(mailOptions);
      console.log('[resetPassword] Correo enviado a:', email);
      return res.json({ message: 'Correo enviado con éxito' });
    } catch (error) {
      console.error('[resetPassword] Error al enviar el correo:', error);
      const message = typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : String(error);
      return res.status(500).json({ error: 'Error al enviar el correo', details: message });
    }
  } catch (err) {
    console.error('[resetPassword] Error inesperado:', err);
    const message = typeof err === 'object' && err !== null && 'message' in err
      ? (err as { message: string }).message
      : String(err);
    res.status(500).json({ error: 'Error inesperado', details: message });
  }
};

export const solicitudes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const solicitudes = await prisma.solicitud.findMany({ where: { userId } });
    res.json(solicitudes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  // Aquí va la lógica para enviar el correo de recuperación
  // Por ejemplo, buscar el usuario y enviar el email
  console.log('Correo de recuperación enviado a:', email);
  res.json({ message: 'Si el correo existe, se enviaron instrucciones.' });
};
