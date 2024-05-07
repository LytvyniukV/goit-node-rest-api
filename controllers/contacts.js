import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} from "../services/contacts.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) throw HttpError(404, "Contact not found");

    res.json({
      status: "success",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);
    if (!deletedContact) throw HttpError(404, "Contact not found");

    res.json({
      status: "success",
      data: deletedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json({
      status: "created",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await updContact(id, req.body);
    if (!updatedContact) throw HttpError(404, "Contact not found");

    res.status(200).json({
      status: "success",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFavoriteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await updContact(id, req.body);
    if (!updatedContact) throw HttpError(404, "Contact not found");

    res.status(200).json({
      status: "success",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
