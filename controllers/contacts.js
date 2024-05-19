import services from "../services/contacts.js";

const getAll = async (req, res) => {
  const contacts = await services.getAll(req.user.id, req.query);

  res.json({
    data: contacts,
  });
};

export const getById = async (req, res) => {
  const contact = await services.getById(req.params.id, req.user.id);
  res.json({
    data: contact,
  });
};

const deleteById = async (req, res) => {
  const contact = await services.deleteById(req.params.id, req.user.id);
  res.json({
    data: contact,
  });
};

const create = async (req, res) => {
  const contact = await services.create(req.user.id, req.body);
  res.status(201).json({
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
    data: contact,
  });
};

export default { create, updateById, deleteById, getById, getAll };
