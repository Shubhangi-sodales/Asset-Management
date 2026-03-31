import { assignAsset, approveRequest, insertAsset, getMyNotifications, markNotificationRead } from '../handler/test.js';

export default (srv) => {

    // Optional: before hooks
    srv.before('READ', 'AllRequest', (req) => {
        // add any preprocessing if needed
    });

    // Actions mapped to handler functions
    srv.on('AssignAsset', assignAsset);
    srv.on('ApproveRequest', approveRequest);
    srv.on('insertAsset', insertAsset);
    srv.on('getMyNotifications', getMyNotifications);
    srv.on('markNotificationRead', markNotificationRead);

};