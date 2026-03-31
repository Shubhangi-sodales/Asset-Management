import { 
  createRequest, 
  getRequestsByUserId, 
  getAssetByAssetId, 
  getMyNotifications, 
  markNotificationRead 
} from '../handler/test.js';

export default (srv) => {

  const { AllRequest } = srv.entities;

  // Action handlers
  srv.on('CreateRequest', createRequest);
  srv.on('markNotificationRead', markNotificationRead);
  srv.on('getMyNotifications', getMyNotifications);

  // Function handlers
  srv.on('getRequestsByUserId', (req) => getRequestsByUserId(req, AllRequest));
  srv.on('getAssetByAssetId', getAssetByAssetId);

};