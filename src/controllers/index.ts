
import { AuthController } from "./auth.controller";
import { ContentController } from "./content.controller";
import { RoleController } from "./role.controller";
import { UserController } from "./user.controller";


export const myWebApiControllers = [
   UserController,
   RoleController,
   AuthController,
   ContentController
];
