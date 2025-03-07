
import Joi = require('joi');


export class CreateArticleDto {
    title: string;
    content:string;
    status:number;
  }
  
  export const createArticleValidation = Joi.object<CreateArticleDto>({
    title    : Joi.string().required().max(255),
    content   : Joi.string().required().max(255),
    status    : Joi.number().allow(null),

  })