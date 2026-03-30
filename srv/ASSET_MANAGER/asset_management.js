import { assignAsset, approveRequest, insertAsset } from '../handler/test.js';

export default (srv) => {

  srv.before('READ', 'AllRequest', (req) => {
    
  });

  srv.on('AssignAsset', assignAsset);
  srv.on('ApproveRequest', approveRequest);
  srv.on('insertAsset', insertAsset);

};