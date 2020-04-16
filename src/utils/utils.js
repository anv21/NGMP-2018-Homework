import jwt from "jsonwebtoken";
import KEY from "../constants/const";

const getJwToken = (name) => {
    return jwt.sign({
        name
    }, KEY, {
        expiresIn: "5m"
    });
};

const errorResponse = (res) => {
    res.status(404).send({
        code: 404,
        message: "Not Found",
        data: {}
    });
};

export {getJwToken, errorResponse};