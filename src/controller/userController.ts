import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import fs from "fs";
import { IUser } from "../interfaces/IUser";
import { IResponse } from "../interfaces/IResponse";

const RSA_PRIVATE_KEY = fs.readFileSync("private.key");

const users: IUser[] = [
  {
    id: 0,
    username: "lucas",
    password: "pass",
  },
  {
    id: 1,
    username: "prueba",
    password: "aaaa",
  },
];

const getUser = async (req: Request, res: Response) => {
  const iduser = parseInt(req.params.id);
  const response: IResponse<IUser> = {
    Result: {
      statuscode: "",
      statustext: "",
    },
    data: {
      id: 0,
      username:"",
      password: ""
    },
  };

  if (iduser ) {
    try {
      const result = users.filter((user) => {
        const selectedUser = user.id == iduser;
        if (selectedUser) {
          return selectedUser;
        }
      });

      if (result.length === 0) {
        response.Result.statuscode = "404";
        response.Result.statustext = "User Not Found";

        res.status(200).json(response);
      } else {
        response.Result.statuscode = "200";
        response.Result.statustext = "OK";
        
        response.data = result[0];
       
        res.status(200).json(response);
      }
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  } else {
    response.Result.statuscode = "404";
    response.Result.statustext = "User Not Found";

    res.status(404).json(response);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const response: IResponse<any> = {
    Result: {
      statuscode: "",
      statustext: "",
    },
    data: "",
  };
  try {
    // Get the person with the specified ID
    const personId = parseInt(req.params.id);
    if (personId) {
      let index = users.findIndex((d) => d.id === personId); //find index in your array
      users.splice(index, 1); //remove element from array

      response.Result.statuscode = "200";
      response.Result.statustext = "User deleted correctly";

      res.status(200).json(response);
    } else {
      response.Result.statuscode = "404";
      response.Result.statustext = "User not found";

      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
};
const createUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  const data: IUser = {
    id: users.length + 1,
    username,
    password,
  };
  const response: IResponse<IUser> = {
    Result: {
      statuscode: "",
      statustext: "",
    },
    data,
  };
  if (username && password) {
    try {
      const result = users.push(data);

      response.Result.statuscode = "200";
      response.Result.statustext = "OK";

      response.data.username = data.username;
      res.status(200).json(response);
    } catch (err) {
      response.Result.statuscode = "500";
      response.Result.statustext = "Internal Server Error";

      res.status(500).json(response);
    }
  } else {
    response.Result.statuscode = "404";
    response.Result.statustext = "User Not Found";

    res.status(404).json(response);
  }
};

const login = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  const data = {
    username,
    password,
  };
  const response: IResponse<any> = {
    Result: {
      statuscode: "",
      statustext: "",
    },
    data,
  };
  if (username && password) {
    try {
      const result = users.filter((user) => {
        const selectedUser = user.username == username && user.password == password
        if (selectedUser) {
          return selectedUser;
        }
      });

      if (result.length === 0) {
        response.Result.statuscode = "404";
        response.Result.statustext = "User Not Found";

        res.status(200).json(response);
      } else {
        response.Result.statuscode = "200";
        response.Result.statustext = "OK";

        response.data.id = result[0].id;
        response.data.username = result[0].username;
        const idUser: string = result[0].id.toString();
        const token = generateJWT(idUser);
        response.data.token = token;

        res.cookie("SESSIONID", jwt, { httpOnly: false, secure: false });

        res.status(200).json(response);
      }
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  } else {
    response.Result.statuscode = "404";
    response.Result.statustext = "User Not Found";

    res.status(404).json(response);
  }
};

const generateJWT = (userId: string) => {
  const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: 2000,
    subject: userId,
  });

  return jwtBearerToken;
};

export default { getUser, createUser, login, deleteUser };
