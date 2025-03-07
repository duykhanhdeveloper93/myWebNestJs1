
import { ArticleController } from "./article.controller";
import { AuthController } from "./auth.controller";
import { RoleController } from "./role.controller";
import { UserController } from "./user.controller";


export const myWebApiControllers = [
   UserController,
   RoleController,
   AuthController,
   ArticleController
];
