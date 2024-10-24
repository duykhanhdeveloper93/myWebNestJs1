
import Joi = require('joi');
import { addressNamePattern, pwPattern, userNamePattern, vietnameseNamePattern } from 'src/common/00.enum';

export class CreateUserDto {
    username: string;
    firstName:string;
    lastName: string;
    address: string;
    password: string;
    roleIds?: number[];
  }
  
  export const createUserValidation = Joi.object<CreateUserDto>({
    username  : Joi.string().regex(userNamePattern).required().max(255),
    firstName : Joi.string().regex(vietnameseNamePattern).required().max(255),
    lastName  : Joi.string().regex(vietnameseNamePattern).required().max(255),
    address   : Joi.string().regex(addressNamePattern).allow(null).allow('').max(255),
    password  : Joi.string().pattern(new RegExp(pwPattern)).required()
  })