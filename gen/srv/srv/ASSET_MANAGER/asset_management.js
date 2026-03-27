module.exports = (srv) => {

  srv.before('READ', 'AllRequest', (req) => {
    
    req.query.where({ STAT: 0 });
  });
  
  srv.on('AssignAsset', async (req) => {

  const userId = Number(req.user.id )|| 2001;

  const { REQID, ASTID } = req.data;

  await cds.run(
    `CALL assign_asset(?, ?, ?)`,
    [String(REQID),
         String(ASTID),
          userId]
  );

  return 'Asset Assigned';
});

  srv.on('ApproveRequest', async (req) => {

  const userId = Number(req.user?.id) || 2001;

  const { REQID, STATUS } = req.data;

  await cds.run(
    `CALL asset_approve_request(?, ?, ?)`,
    [
      String(REQID),
      String(STATUS),
      userId
    ]
  );

  return 'Request Updated';
});


srv.on('insertAsset', async (req) => {

  // ✅ Safe user handling
  let userId = 2001;
  if (!isNaN(Number(req.user?.id))) {
    userId = Number(req.user.id);
  }

  const {
    P_ASTNAME,
    P_CATID,
    P_SUBCATID,
    P_QTY,
    P_SERIALNO,
    P_PURCHASEDATE,
    P_MANUFACTURER   // accepted but not used
  } = req.data;

  // ✅ Debug (optional)
  console.log({
    qty: P_QTY,
    parsedQty: Number(P_QTY),
    userId,
    manufacturer: P_MANUFACTURER
  });

  await cds.run(
    `CALL insert_asset(?, ?, ?, ?, ?, ?, ?)`,
    [
      P_ASTNAME,
      P_CATID,
      P_SUBCATID,
      Number(P_QTY),     // INTEGER
      userId,            // INTEGER
      P_SERIALNO,
      P_PURCHASEDATE
    ]
  );

  return 'Asset Inserted Successfully';
});
};