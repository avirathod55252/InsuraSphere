import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export default ({ db, bcrypt, jwtSecret }) => {
  const router = Router();

  router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    await db.read();
    const exists = db.data.users.find(u => u.email === email);
    if (exists) return res.status(400).json({ message: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = { id: nanoid(8), name, email, passwordHash: hash, role: role || 'customer' };
    db.data.users.push(user);
    await db.write();
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, jwtSecret);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });

  router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    await db.read();
    const user = db.data.users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'No user' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid creds' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, jwtSecret);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });

  router.get('/me', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });
    const token = auth.split(' ')[1];
    try {
      const payload = jwt.verify(token, jwtSecret);
      await db.read();
      const user = db.data.users.find(u => u.id === payload.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });

  return router;
};
