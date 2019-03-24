import jwt from "jsonwebtoken";
import {KEY} from "../constants/const";

export function tokenCheck (req, res, next) {
    let token = req.headers["x-access-token"];

    if (token) {
        jwt.verify(token, KEY, function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: "Failed to authenticate"
                });
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}