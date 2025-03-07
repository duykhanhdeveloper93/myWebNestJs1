import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { RoleEntity } from "src/entities/02.role/role.entity";
import { DataSource } from "typeorm";


@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {

     constructor(private readonly dataSource: DataSource) {
            super(RoleEntity, dataSource.createEntityManager());
        }
 }
