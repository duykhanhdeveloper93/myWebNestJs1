
import { LocalAuthGuard } from "./local-auth.guard";
import { PermissionsGuard } from ".//permission.guard";
import { AuthGuard } from "./jwt-auth.guard";


export const myWebGuard = [
   
   LocalAuthGuard,
   PermissionsGuard
];
