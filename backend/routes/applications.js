import { Router } from 'express';
import { nanoid } from 'nanoid';
import createAuth from '../middleware/auth.js';

export default ({ db, jwtSecret }) => {
  const router = Router();
  const auth = createAuth({ jwtSecret });

  router.post('/', auth.requireAuth, async (req, res) => {
    const { policyId } = req.body;
    await db.read();
    const userId = req.user.id;
    const app = { id: 'a_' + nanoid(6), userId, policyId, status: 'pending', createdAt: Date.now() };
    db.data.applications.push(app);
    await db.write();
    res.json(app);
  });

  router.get('/', auth.requireAuth, async (req, res) => {
    await db.read();
    if (req.user.role === 'admin') return res.json(db.data.applications);
    const mine = db.data.applications.filter(a => a.userId === req.user.id);
    res.json(mine);
  });

  router.post('/:id/decision', auth.requireAuth, auth.requireRole('admin'), async (req, res) => {
    const id = req.params.id;
    const { decision } = req.body;
    await db.read();
    const app = db.data.applications.find(a => a.id === id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    app.status = decision;
    app.decisionAt = Date.now();
    await db.write();
    res.json(app);
  });

  return router;
};
