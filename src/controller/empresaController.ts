import { NextFunction, Request, Response } from "express";

import { IResponse } from "../interfaces/IResponse";
import { IPerson } from "../interfaces/IPerson";
import { IEmpresa } from "../interfaces/IEmpresa";

import personController from "./personController";
const empresas: IEmpresa[] = [
  {
    idEmpresa: 1,
    nombre: "empresa 1",
    website: "www.com",
    notasAdicionales: "nose",
  },
  {
    idEmpresa: 2,
    nombre: "empresa 2",
    website: "www.uy",
    notasAdicionales: "si se",
  },
];

// writeFile function with filename, content and callback function

const ingresarEmpresa = async (req: Request, res: Response) => {
  const nombre = req.body.nombre;
  const website = req.body.website;
  const notasAdicionales = req.body.notasAdicionales;

  const empresa: IEmpresa = {
    idEmpresa: empresas.length + 1,
    nombre,
    website,
    notasAdicionales,
  };

  try {
    const response: IResponse<IEmpresa> = {
      Result: {
        statuscode: "",
        statustext: "",
      },
      data: empresa,
    };

    if (nombre && website) {
      empresas.push(empresa);
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
      data: empresa,
    };
    res.status(500);
    res.json(response);
  }
};

const eliminarEmpresa = async (req: Request, res: Response) => {
  const ID = parseInt(req.params.idEmpresa);
  const response: IResponse<any> = {
    Result: {
      statuscode: "",
      statustext: "",
    },
    data: "",
  };

  console.log(ID)
  // Get the person with the specified ID
  if (ID === 0) {
    let index = empresas.findIndex((d) => d.idEmpresa === ID); //find index in your array
    var flagBorrar = false;
    personController.persons.forEach((p) => {

      if (p.idEmpresa !== ID) {
        flagBorrar = true;
      }
    });
    if (flagBorrar) {
      empresas.splice(index, 1); //remove element from array 
      response.Result.statuscode = "200";
      response.Result.statustext = "Person deleted correctly";
  
      res.status(200).json(response);
    }else{
      response.Result.statuscode = "404";
      response.Result.statustext = "Empresa tiene personas asociadas, no se puede borrar";
  
      res.status(200).json(response);
    }
   
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

const detalleEmpresa = async (req: Request, res: Response) => {
  const ID = parseInt(req.params.idEmpresa);

  try {
    // Get the person with the specified ID
    if (ID  ) {
      const prods = empresas.filter((p) => {
        const producto = p.idEmpresa == ID;
        if (producto) {
          return empresas[ID - 1];
        }
      });
      const response: IResponse<IEmpresa[]> = {
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
const listarEmpresas = async (req: Request, res: Response) => {
  try {
    const response: IResponse<IEmpresa[]> = {
      Result: {
        statuscode: "",
        statustext: "",
      },
      data: empresas,
    };
    if (empresas.length > 0) {
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
  ingresarEmpresa,
  eliminarEmpresa,
  listarEmpresas,
  detalleEmpresa,
};
