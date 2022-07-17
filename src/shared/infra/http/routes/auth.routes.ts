import { Router } from "express";

import { AuthUserController } from "../../../../modules/accounts/useCases/authUser/authUserController";

const authRoutes = Router();

const authUserController = new AuthUserController();

authRoutes.post("/sessions", authUserController.handle);

export { authRoutes };
