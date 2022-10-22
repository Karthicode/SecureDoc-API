import express from 'express';

//invoked when the promise gets resolved
export const setSuccessReponse = (data: object, response: express.Response) => {
  response.status(200);
  response.json(data);
};

//invoked when the promise gets rejected
export const setErrorReponse = (error: unknown, response: express.Response) => {
  response.status(500);
  response.json(error);
};
