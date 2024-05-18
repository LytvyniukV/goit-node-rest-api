import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contacts.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const favorite = req.query.favorite;

    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 3,
    };

    if (favorite) {
      const contacts = await Contact.paginate(
        {
          owner: req.user.id,
          favorite: favorite,
        },
        options
      );
      res.json({
        data: contacts,
      });
    }

    const contacts = await Contact.paginate(
      {
        owner: req.user.id,
      },
      options
    );
    res.json({
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id, owner: req.user.id });
    if (!contact) throw HttpError(404, "Contact not found");

    res.json({
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });
    if (!deletedContact) throw HttpError(404, "Contact not found");

    res.json({
      data: deletedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contact = {
      name,
      email,
      phone,
      owner: req.user.id,
    };
    const newContact = await Contact.create(contact);
    res.status(201).json({
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedContact) throw HttpError(404, "Contact not found");

    res.status(200).json({
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFavoriteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedContact) throw HttpError(404, "Contact not found");

    res.status(200).json({
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
