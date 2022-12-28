import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import subscriberSchema, { ISubscriber } from "../model/subscriberSchema";

const createSubscriber = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const subscriber = new subscriberSchema({
    _id: new mongoose.Types.ObjectId(),
    email,
  });

  return subscriber
    .save()
    .then((subscriber) => res.status(201).json({ subscriber }))
    .catch((error) => res.status(500).json({ error }));
};

const readSubscriber = (req: Request, res: Response, next: NextFunction) => {
  const subscriberId = req.params.subscriberId;

  return subscriberSchema
    .findById(subscriberId)
    .then((subscriber) =>
      subscriber
        ? res.status(200).json({ subscriber })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readSubscribers = (req: Request, res: Response, next: NextFunction) => {
  return subscriberSchema
    .find()
    .then((subscribers) => res.status(200).json({ subscribers }))
    .catch((error) => res.status(500).json({ error }));
};
const updateSubscriber = (req: Request, res: Response, next: NextFunction) => {
  const subscriberId = req.params.subscriberId;

  return subscriberSchema.findByIdAndUpdate(subscriberId).then((subscriber) => {
    if (subscriber) {
      subscriber.set(req.body);

      return subscriber
        .save()
        .then((subscriber) => res.status(201).json({ subscriber }))
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
};

const deleteSubscriber = (req: Request, res: Response, next: NextFunction) => {
  const subscriberEmail = req.body.email;
  const subscriberFilter = { email: subscriberEmail, isSubscribed: true };
  subscriberSchema.findOneAndDelete(
    subscriberFilter,
    (err: any, subscriberData: ISubscriber) => {
      if (err) {
        res.status(500).json({ err });
      }
      if (!subscriberData) {
        return res
          .status(500)
          .json({ message: "You are not subscribed to our newsletter" });
      }
      subscriberSchema.findOneAndUpdate(
        subscriberFilter,
        {
          isSubscribed: false,
          unSubscribedAt: new Date(Date.now()),
        } as ISubscriber,
        (err: any, updatedSubscriberData: ISubscriber) => {
          if (err) {
            return res.status(500).json({ err });
          } else {
            return res.status(200).json({
              message: "You have successfully unsubscribed from our newsletter",
              updatedSubscriberData,
            });
          }
        }
      );
    }
  );
};

// const deleteSubscriber = (req: Request, res: Response, next: NextFunction) => {
//   const subscriberId = req.params.subscriberId;

//   return subscriberSchema
//     .findByIdAndDelete(subscriberId)
//     .then((subscriber) =>
//       subscriber
//         ? res.status(201).json({ message: "Subscriber deleted" })
//         : res.status(404).json({ message: "Not found" })
//     );
// };

export default {
  createSubscriber,
  readSubscriber,
  readSubscribers,
  updateSubscriber,
  deleteSubscriber,
};
