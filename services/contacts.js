import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contacts.js";

const getAll = async (userId, queryParams) => {
  const favorite = queryParams.favorite;

  const options = {
    page: queryParams.page || 1,
    limit: queryParams.limit || 3,
  };

  if (favorite) {
    const contacts = await Contact.paginate(
      {
        owner: userId,
        favorite: favorite,
      },
      options
    );
    return contacts;
  }

  const contacts = await Contact.paginate(
    {
      owner: userId,
    },
    options
  );

  return contacts;
};

const getById = async (id, ownerId) => {
  const contact = await Contact.findOne({ _id: id, owner: ownerId });
  if (!contact) throw HttpError(404, "Contact not found");

  return contact;
};

const deleteById = async (id, ownerId) => {
  const contact = await Contact.findOneAndDelete({ _id: id, owner: ownerId });
  if (!contact) throw HttpError(404, "Contact not found");

  return contact;
};

const create = async (userId, body) => {
  const { name, email, phone } = body;
  const contact = {
    name,
    email,
    phone,
    owner: userId,
  };
  const newContact = await Contact.create(contact);

  return newContact;
};

const updateById = async (id, ownerId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: ownerId },
    body,
    { new: true }
  );
  if (!contact) throw HttpError(404, "Contact not found");

  return contact;
};

export default { getAll, getById, deleteById, create, updateById };
