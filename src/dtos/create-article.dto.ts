
import Joi = require('joi');
import { UserEntity } from 'src/entities';


export class CreateArticleDto {
    title: string;
    content:string;
    type?:number;
    status?:number;
    createdAt?: Date;
    createdBy?: UserEntity;
  }
  
  export const createArticleValidation = Joi.object<CreateArticleDto>({
    // title    : Joi.string().regex(userNamePattern).required().max(255),
    // content   : Joi.string().regex(vietnameseNamePattern).required().max(255),
    title     : Joi.string().required().max(255),
    content   : Joi.string().required().max(255),
    type      : Joi.number().allow('').allow(null),
    status    : Joi.number().allow('').allow(null),
  })