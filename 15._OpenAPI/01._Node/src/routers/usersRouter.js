import { Router } from "express";

const router = Router();

const users = [
  { id: 1, name: "Arne" },
  { id: 2, name: "Minho" },
  { id: 3, name: "Charlie" },
];
const nextId = 4;

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get users
 *     responses:
 *       200:
 *         description: Returns object containing data which is a list of users.
 */
router.get("/api/users", (req, res) => {
  res.send({ data: users });
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: Create a new user
 *     responses:
 *       200:
 *         description: Returns the users that was created
 *
 */
router.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = nextId++;
  users.push(newUser);

  res.send({ data: users });
});

export default router;
