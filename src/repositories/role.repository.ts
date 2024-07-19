import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { RoleEntity } from "src/entities/role.entity";


@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> { }
