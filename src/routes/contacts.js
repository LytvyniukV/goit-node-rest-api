import express from "express";
import controllers from "../controllers/contacts.js";
import validator from "../middlewares/validation.js";
import {
  contactIdSchema,
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} from "../schemas/contacts.js";
import wrapper from "../helpers/wrapper.js";
const contactsRouter = express.Router();

contactsRouter.get("/", wrapper(controllers.getAll));

contactsRouter.get("/:id", wrapper(controllers.getById));

contactsRouter.delete("/:id", wrapper(controllers.deleteById));

contactsRouter.post(
  "/",
  validator.body(createContactSchema),
  wrapper(controllers.create)
);

contactsRouter.put(
  "/:id",
  validator.body(updateContactSchema),
  validator.params(contactIdSchema),
  wrapper(controllers.updateById)
);

contactsRouter.patch(
  "/:id/favorite",
  validator.body(updateFavoriteContactSchema),
  validator.params(contactIdSchema),
  wrapper(controllers.updateById)
);

export default contactsRouter;
