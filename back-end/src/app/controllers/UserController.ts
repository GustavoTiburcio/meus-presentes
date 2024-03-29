import express from 'express';
import UserRepository from '../repositories/UserRepository';
import { generateRandomPassword, isEmailValid, isValidUUIDv4, sendEmail } from '../../utils';
import dotenv from 'dotenv';

dotenv.config();

class UserController {
  async index(request: express.Request, response: express.Response) {
    // List all rows
    const orderBy = request.query?.orderBy;

    const users = await UserRepository.findAll(orderBy?.toString());

    response.json(users);
  }

  async show(request: express.Request, response: express.Response) {
    //List specific row by id
    const { id } = request.params;

    if (!isValidUUIDv4(id)) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    const user = await UserRepository.findById(id);

    if (!user) {
      //404: Not found
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  async store(request: express.Request, response: express.Response) {
    //Create new row;
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }
    if (!isEmailValid(email)) {
      return response.status(400).json({ error: 'Invalid format for email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'This e-mail already in use.' });
    }

    const user = await UserRepository.create({ name, email, password });

    if (user) {
      sendEmail({
        receiver: user.email,
        subject: `Bem-vindo ao MeusPresentes.com.br - O lugar onde a diversão começa! 🎉`,
        body: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Bem-vindo ao MeusPresentes.com.br 🎉</title>
          </head>
          <body>
              <h1>Bem-vindo ao MeusPresentes.com.br - O lugar onde a diversão começa! 🎉</h1>
              <p>
                  Oi ${user.name}! 🌟<br><br>
                  Prepare-se para entrar na maravilhosa jornada de criar listas de presentes inesquecíveis com o MeusPresentes.com.br! Estamos super empolgados por você estar aqui, e não podemos esperar para ver como você vai tornar seus eventos ainda mais incríveis.
              </p>
              <p>
                  No MeusPresentes, a diversão é a regra do jogo! Aqui você pode criar listas de presentes personalizadas, compartilhar alegria com amigos e familiares e ter a certeza de que todos os seus presentes serão simplesmente perfeitos. 🎁✨
              </p>
              <h2>O que você pode fazer no MeusPresentes.com.br:</h2>
              <ul>
                  <li>🎈 Criar listas de presentes para casamentos, aniversários, chás de bebê, formaturas e tudo o mais.</li>
                  <li>🎯 Adicionar itens de diferentes lojas e sites às suas listas de presentes.</li>
                  <li>🎨 Personalizar suas listas do seu jeitinho.</li>
                  <li>💌 Compartilhar suas listas facilmente com todos os seus entes queridos.</li>
                  <li>🙌 Acompanhar os presentes que você recebeu e agradecer aos doadores com um sorriso.</li>
              </ul>
              <p>
                  Pegue seu chapéu de festa e comece a criar memórias incríveis com a gente. MeusPresentes.com.br está aqui para tornar seus eventos simplesmente incríveis.
              </p>
              <p>
                  Mais uma vez, seja muito bem-vindo ao MeusPresentes.com.br! Mal podemos esperar para fazer parte das suas comemorações. 🎂🥳
              </p>
              <p>Um grande abraço,</p>
              <p>Gustavo Tiburcio 😎<br>Desenvolvedor 🚀<br>${process.env.SITE_URL} 🎊</p>
          </body>
          </html>
      `
      });
    }

    response.status(201).json(user);
  }

  async update(request: express.Request, response: express.Response) {
    // Edit row;
    const { id } = request.params;

    const {
      name, email, password
    } = request.body;

    if (!isValidUUIDv4(id)) {
      return response.status(400).json({ error: 'Invalid UUID string' });
    }

    const userExists = await UserRepository.findById(id);

    if (!userExists) {
      return response.status(404).json({ error: 'User not found.' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }
    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }
    if (!isEmailValid(email)) {
      return response.status(400).json({ error: 'Email invalid format' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const userByEmail = await UserRepository.findByEmail(email);

    if (userByEmail && userByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail already in use.' });
    }

    const contact = await UserRepository.update(id, {
      name, email, password
    });

    response.json(contact);
  }

  async passwordUpdate(request: express.Request, response: express.Response) {
    // Reset password
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }
    if (!isEmailValid(email)) {
      return response.status(400).json({ error: 'Email invalid format' });
    }

    const userExists = await UserRepository.findByEmail(email);

    if (!userExists) {
      return response.status(404).json({ error: 'Email not found.' });
    }

    const newPassword = generateRandomPassword();

    const updatedUser = await UserRepository.passwordUpdate(userExists.id, newPassword);

    if (updatedUser) {
      sendEmail({
        receiver: updatedUser.email,
        subject: `MeusPresentes.com.br - Redefinição de senha!! ⚠`,
        body: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>MeusPresentes.com.br - Redefinição de senha!! ⚠</title>
          </head>
          <body>
              <h1>MeusPresentes.com.br - Redefinição de senha!! ⚠</h1>
              <p>
                  Saudações digitais ${updatedUser.name}! 🌟<br><br>
                  Sua senha foi redefinida com sucesso! Agora você pode acessar sua conta com a nova senha abaixo:
              </p>
              <strong>${updatedUser.password}</strong>
              <p>⚠ Importante: Se não foi você quem solicitou essa redefinição considere alterar sua senha o quanto antes ⚠</p>
              <p>Fique em paz,</p>
              <p>Gustavo Tiburcio 😎<br>Desenvolvedor 🚀<br>${process.env.SITE_URL} 🎊</p>
          </body>
          </html>
      `
      });
      return response.sendStatus(204);
    }

    return response.status(500).json({ error: 'Unable to reset your password, contact the administrator' });
  }

  async delete(request: express.Request, response: express.Response) {
    // Delete row
    const { id } = request.params;

    await UserRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

export default new UserController();
