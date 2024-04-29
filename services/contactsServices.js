import { Contact } from "../schemas/dbSchema.js";

const listContacts = async () => {
  return Contact.find();
};

const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = (contactId) => {
  return Contact.findByIdAndDelete({ _id: contactId });
};

const addContact = (name, email, phone) => {
  return Contact.create({ name, email, phone });
};

const updContact = (id, data) => {
  return Contact.findByIdAndUpdate({ _id: id }, data, { new: true });
};

export { listContacts, getContactById, removeContact, addContact, updContact };
