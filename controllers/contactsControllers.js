import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();

    res.send({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    res.send({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);
    if (deletedContact) {
      res.send({
        status: "success",
        code: 200,
        data: { deletedContact },
      });
    } else {
      res.send({
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {}
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.send({
      status: "created",
      code: 201,
      data: { newContact },
    });
  } catch (error) {}
};

export const updateContact = (req, res) => {};
