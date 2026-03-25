module.exports = (srv) => {

  srv.on('CreateRequest', async (req) => {

    try {
      const { USERID, CATID, ASTID, SCTID, PRITY } = req.data;

      const userId = parseInt(USERID);

      const result = await cds.run(`
        CALL create_request(?,?,?,?,?,?)
      `, [
        '0',
        userId,
        PRITY,
        CATID,
        ASTID,
        SCTID
      ]);

      // Procedure returns SELECT → first row
      const row = result?.[0];

      return {
        REQCODE: row?.REQCODE,
        CATCODE: row?.CATCODE,
        SUBCATCODE: row?.SUBCATCODE
      };

    } catch (err) {
      console.error(err);
      req.error(500, err.message);
    }

  });

  srv.on("getRequestsByUserId", async (req) => {
    const { USERID } = req.data;

    return await SELECT.from("EmployeeService.AllRequest")
      .where({ USRID: USERID });
  });

  srv.on("getAssetByAssetId", async (req) => {
    const { ASSTID } = req.data;

    return await SELECT.from("EmployeeService.AllAsset")
      .where({ ASTID: ASSTID });
  });

};