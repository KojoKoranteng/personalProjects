import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import Logging from "../lib/Logging";
import { ISubscriber } from "../model/subscriberSchema";

export const SubscriptionValidation = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const SubscriberSchema = {
  subscriber: {
    create: Joi.object<ISubscriber>({
      email: Joi.string().required().email().messages({
        "string.email": "Invalid Email",
        "string.required": "Email is required",
      }),
    }),
    update: Joi.object<ISubscriber>({
      email: Joi.string().required().email().messages({
        "string.email": "Invalid Email",
        "string.required": "Email is required",
      }),
    }),
  },
};
