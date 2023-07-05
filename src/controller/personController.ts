import { NextFunction, Request, Response } from "express";

import { IResponse } from "../interfaces/IResponse";
import { IPerson } from "../interfaces/IPerson";

 const persons: IPerson[] = [
  {
    idPersona: 1,
    nombres: ["juan", "carlos"],
    apellidos: ["cruz", "cruz"],
    email: "nose@gmail.com",
    telefono: 9999999,
    idEmpresa: 0,
  },
  {
    idPersona: 2,
    nombres: ["pepe"],
    apellidos: ["sanchez"],
    email: "aa@gmail.com",
    telefono: 12432314,
    idEmpresa: 0,
  },
  {
    idPersona: 3,
    nombres: ["matias"],
    apellidos: ["perez"],
    email: "bb@gmail.com",
    telefono: 646463456,
    idEmpresa: 1,
  },
];

// writeFile function with filename, content and callback function

const ingresarPersona = async (req: Request, res: Response) => {
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const email = req.body.email;
  const telefono = req.body.telefono;
  const idEmpresa = parseInt(req.body.idEmpresa);
  const notasAdicionales = req.body.notasAdicionales;

  const person: IPerson = {
    idPersona: persons.length + 1,
    nombres,
    apellidos,
    email,
    telefono,
    idEmpresa,
    notasAdicionales,
  };

  try {
    const response: IResponse<IPerson> = {
      Result: {
        statuscode: "",
        statustext: "",
      },
      data: person,
    };

    if (nombres && apellidos && email && telefono && idEmpresa) {
      persons.push(person);
      response.Result.statuscode = "200";
      response.Result.statustext = "OK";
      res.status(200);
      res.json(response);
    } else {
      response.Result.statuscode = "404";
      response.Result.statustext = "Los datos no pueden venir vacios";
      res.status(404);
      res.json(response);
    }
  } catch {
    const response: IResponse<any> = {
      Result: {
        statuscode: "500",
        statustext: "INTERNAL SERVER ERROR",
      },
      data: person,
    };
    res.status(500);
    res.json(response);
  }
};

const eliminarPersona = async (req: Request, res: Response) => {
  const ID = parseInt(req.params.idPersona);
  const response: IResponse<any> = {
    Result: {
      statuscode: "",
      statustext: "",
    },
    data: "",
  };

  // Get the person with the specified ID
  if (ID) {
    let index = persons.findIndex((d) => d.idPersona === ID); //find index in your array
    persons.splice(index, 1); //remove element from array

    response.Result.statuscode = "200";
    response.Result.statustext = "Person deleted correctly";

    res.status(200).json(response);

  } else {
    const response: IResponse<any> = {
      Result: {
        statuscode: "404",
        statustext: "Person Not Found",
      },
      data: "",
    };

    res.status(404);
    res.json(response);
  }
};
const buscarPersona = async (req: Request, res: Response) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;

  if (nombre) {
    let index = persons.findIndex((d) =>
      d.nombres.forEach((n) => {
        n === nombre;
      })

    );
    console.log(index)

    if (persons[index]) {
      const response: IResponse<IPerson> = {
        Result: {
          statuscode: "200",
          statustext: "OK",
        },
        data: persons[index],
      };
      res.status(200);
      res.json(response);
    }else{
        const response: IResponse<any> = {
            Result: {
              statuscode: "404",
              statustext: "NOT FOUND",
            },
            data: "",
          };
          res.status(404);
          res.json(response);
    }
  }
};

const detallePersona = async (req: Request, res: Response) => {
  const ID = parseInt(req.params.idPersona);

  try {
    // Get the person with the specified ID
    if (ID) {
      const prods = persons.filter((p) => {
        const producto = p.idPersona == ID;
        if (producto) {
          return persons[ID - 1];
        }
      });
      const response: IResponse<IPerson[]> = {
        Result: {
          statuscode: "200",
          statustext: "OK",
        },
        data: prods,
      };
      res.status(200);
      res.json(response);
    } else {
      const response: IResponse<any[]> = {
        Result: {
          statuscode: "404",
          statustext: "NOT FOUND",
        },
        data: [],
      };

      res.status(404);
      res.json(response);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
};
const listarPersonas = async (req: Request, res: Response) => {
  try {
    const response: IResponse<any[]> = {
      Result: {
        statuscode: "",
        statustext: "",
      },
      data: persons,
    };
    if (persons.length > 1) {
      response.Result.statuscode = "200";
      response.Result.statustext = "OK";
      res.status(200);
      res.json(response);
    } else {
      response.Result.statuscode = "404";
      response.Result.statustext = "Not found";
      res.status(404);
      res.json(response);
    }
    res.status(404);
  } catch (err) {
    res.status(500);
    console.error(err.message);
  }
};
export default {
  ingresarPersona,
  eliminarPersona,
  buscarPersona,
  listarPersonas,
  detallePersona,
  persons
};
