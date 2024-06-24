import { calculatePaginationData } from "../../utils/calculatePaginationData.js";
import { parsePaginationParams } from "../../utils/parsePaginationParams.js";
import { parseSortParams } from "../../utils/parseSortParams.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contacts.js";

const getAll = async (userId, query) => {
  const favorite = query.favorite;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query);
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ owner: userId });

  if (favorite) {
    contactsQuery.where("favorite").equals(favorite);
  }
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
  const { name, email, phone, favorite } = body;
  const contact = {
    name,
    email,
    phone,
    owner: userId,
    favorite: favorite || false,
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
