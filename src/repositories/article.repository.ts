import { Injectable } from "@nestjs/common";
import { ArticleEntity } from "src/entities/06.article/article.entity";

import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";


@Injectable()
export class ArticleRepository extends BaseRepository<ArticleEntity> {

     constructor(private readonly dataSource: DataSource) {
            super(ArticleEntity, dataSource.createEntityManager());
        }
 }
