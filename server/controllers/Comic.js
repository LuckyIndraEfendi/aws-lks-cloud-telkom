import comic from "../models/modelComic.js";
import { Op } from "sequelize";

export const getAllComic = async (req, res) => {
  try {
    const { title } = req.query;
    const whereCondition = title ? { title: { [Op.like]: `%${title}%` } } : {};

    const comics = await comic.findAll({ where: whereCondition });

    res.send({
      message: title ? `Get Comic with title ${title}` : "Get all Comics",
      data: comics,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: title
        ? `Error while getting Comic with title "${title}"`
        : "Error while getting all Comics",
      error: error.message,
    });
  }
};

export const getComicById = async (req, res) => {
  try {
    const data = await comic.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      return res.status(404).send({
        statusCode: 404,
        message: `Comic with id ${req.params.id} not found`,
        data: [],
        totalItems: 0,
      });
    }
    res.send({
      message: "Get data by id",
      data,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: `Error while get Comic with id=${req.params.id}`,
      error: err.message,
    });
  }
};

export const createComic = async (req, res) => {
  try {
    const data = await comic.create({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      publisher: req.body.publisher,
      image: req.body.image,
      createAt: req.body.createAt,
      updateAt: req.body.updateAt,
    });

    if (!data) {
      return res.status(400).send({
        statusCode: 400,
        message: "Bad Request",
        data: [],
        totalItems: 0,
      });
    }

    res.send({
      statusCode: 201,
      message: "Comic created successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateComic = async (req, res) => {
  const { title, description, author, publisher, image } = req.body;
  try {
    const existingComic = await comic.findByPk(req.params.id);

    if (!existingComic) {
      return res.status(404).send({
        statusCode: 404,
        message: `Comic with id=${req.params.id} not found.`,
      });
    }
    existingComic.title = title;
    existingComic.description = description;
    existingComic.author = author;
    existingComic.publisher = publisher;
    existingComic.image = image;
    await existingComic.save();
    res.send({
      statusCode: 200,
      message: "Update Comic successfully",
      data: existingComic,
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: `Error updating Comic with id=${req.params.id}`,
      error: err.message,
    });
  }
};

export const deleteComic = async (req, res) => {
  try {
    const data = await comic.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      return res.status(404).send({
        statusCode: 404,
        message: `Comic with id ${req.params.id} not found`,
        data: [],
        totalItems: 0,
      });
    }

    res.send({
      statusCode: 200,
      message: "Comic deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error });
  }
};
