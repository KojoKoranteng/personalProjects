import express, { NextFunction } from "express";
import subscriberController from "../controllers/subscriberController";
import {
  SubscriberSchema,
  SubscriptionValidation,
} from "../middlewares/subscriptionValidation";

const router = express.Router();

router.post(
  "/create",
  SubscriptionValidation(SubscriberSchema.subscriber.create),
  subscriberController.createSubscriber
);
router.get("/get/:subscriberId", subscriberController.readSubscriber);
router.get("/get/", subscriberController.readSubscribers);
router.patch(
  "/update/:subscriberId",
  SubscriptionValidation(SubscriberSchema.subscriber.create),
  subscriberController.updateSubscriber
);
router.delete("/delete/:subscriberId", subscriberController.deleteSubscriber);

export = router;
