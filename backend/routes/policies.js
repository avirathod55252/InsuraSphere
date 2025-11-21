import { Router } from 'express';
import { nanoid } from 'nanoid';
import createAuth from '../middleware/auth.js';

export default ({ db, jwtSecret }) => {
  const router = Router();
  const auth = createAuth({ jwtSecret });

  router.get('/', async (req, res) => {
    await db.read();
    res.json(db.data.policies);
  });

  router.post('/', auth.requireAuth, auth.requireRole('admin'), async (req, res) => {
    const { type, title, premium, details } = req.body;
    await db.read();
    const policy = { id: 'p_' + nanoid(6), type, title, premium, details };
    db.data.policies.push(policy);
    await db.write();
    res.json(policy);
  });

  return router;
};
