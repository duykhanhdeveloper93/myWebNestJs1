
import Joi = require('joi');


export class CreateArticleDto {
    title: string;
    content: string;
    image_title_path?: string;
    status?: number;
  }
  
  export const createArticleValidation = Joi.object<CreateArticleDto>({
    title    : Joi.string().required().max(255),
    content   : Joi.string().required().max(4000),
    image_title_path: Joi.string().required().allow('').allow(null).max(1000),
    status    : Joi.number().allow(null),

  })