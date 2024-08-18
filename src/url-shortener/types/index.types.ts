import Joi from 'joi';

export class IRedirect {
  url: string;
  statusCode: number;
}

export const UrlSchema = Joi.object({
  url: Joi.string().uri().required(),
}).options({
  abortEarly: false,
});
