import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { PermissionsGuard } from ".//permission.guard";


export const myWebGuard = [
   JwtAuthGuard,
   LocalAuthGuard,
   PermissionsGuard
];
