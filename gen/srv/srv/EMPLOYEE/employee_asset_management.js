import { createRequest, getRequestsByUserId, getAssetByAssetId } from '../handler/test.js';

export default (srv) => {

  const { AllRequest } = srv.entities;


  srv.on('CreateRequest', createRequest);

  
  srv.on('getRequestsByUserId', (req) =>
    getRequestsByUserId(req, AllRequest)
  );

 
  srv.on('getAssetByAssetId', getAssetByAssetId);

};