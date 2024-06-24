import services from "../services/contacts.js";

const getAll = async (req, res) => {
  const contacts = await services.getAll(req.user.id, req.query);

  res.json({
    status: 200,
    message: "Contacts successfully found",
    data: contacts,
  });
};

export const getById = async (req, res) => {
  const contact = await services.getById(req.params.id, req.user.id);
  res.json({
    status: 200,
    message: "Contact successfully found",
    data: contact,
  });
};

const deleteById = async (req, res) => {
  const contact = await services.deleteById(req.params.id, req.user.id);
  res.json({
    status: 200,
    message: "Contact successfully deleted",
    data: contact,
  });
};

const create = async (req, res) => {
  const contact = await services.create(req.user.id, req.body);
  res.status(201).json({
    status: 201,
    message: "Contacts successfully created",
    data: contact,
  });
};

const updateById = async (req, res) => {
  const contact = await services.updateById(
    req.params.id,
    req.user.id,
    req.body
  );

  res.status(200).json({
    status: 200,
    message: "Contact successfully updated",
    data: contact,
  });
};

export default { create, updateById, deleteById, getById, getAll };
