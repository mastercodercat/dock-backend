import db from "../db";
import logger from "../utils/logger";

export const fetchUsers = async (req, res) => {
  try {
    const users = await db.user.findMany({
      where: {
        id: {
          not: req.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        ratings: {
          select: {
            id: true,
            rating: true,
            createdAt: true,
            peerId: true,
            peer: true,
          },
        },
      },
    });

    return res.json(users);
  } catch (error) {
    logger.error(error);
    return res.status(400).json(error);
  }
};

export const rateUser = async (req, res) => {
  const { rating, userId } = req.body;

  try {
    const review = await db.rating.findFirst({
      where: {
        userId,
        peerId: req.user.id,
      },
    });
    if (review) {
      return res.status(403).json({
        error: "Rated before",
      });
    }

    const rate = await db.rating.create({
      data: {
        userId,
        peerId: req.user.id,
        rating,
      },
    });
    return res.json(rate);
  } catch (error) {
    logger.error(error);
    return res.status(400).json(error);
  }
};
