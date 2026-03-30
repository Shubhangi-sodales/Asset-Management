const cds = require('@sap/cds');

async function createRequest(req) {
    try {
        const { USERID, CATID, ASTID, SCTID, PRITY } = req.data;
        const userId = parseInt(USERID);

        const result = await cds.run(
            `CALL prinsertupdaterequest(?,?,?,?,?,?)`,
            ['0', userId, PRITY, CATID, ASTID, SCTID]
        );

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
}

async function getRequestsByUserId(req, AllRequest) {
    try {
        const { USERID } = req.data;
        return await cds.run(
            SELECT.from(AllRequest).where({ USRID: USERID })
        );
    } catch (err) {
        console.error(err);
        req.error(500, err.message);
    }
}

async function getAssetByAssetId(req) {
    try {
        const { ASSTID } = req.data;
        return await cds.run(
            SELECT.from("EmployeeService.AllAsset").where({ ASTID: ASSTID })
        );
    } catch (err) {
        console.error(err);
        req.error(500, err.message);
    }
}

async function assignAsset(req) {
    try {
        const userId = Number(req.user?.id) || 2001;
        const { REQID, ASTID } = req.data;

        await cds.run(
            `CALL prinsertupdateassignasset(?, ?, ?)`,
            [String(REQID), String(ASTID), userId]
        );

        return { Success: "Asset Assigned" };
    } catch (err) {
        console.error(err);
        req.error(500, err.message);
    }
}

async function approveRequest(req) {
    try {
        const userId = Number(req.user?.id) || 2001;
        const { REQID, STATUS } = req.data;

        await cds.run(
            `CALL prinserupdateassetapproverequest(?, ?, ?)`,
            [String(REQID), Number(STATUS), userId]
        );

        return { Success: "Request Updated" };
    } catch (err) {
        console.error(err);
        req.error(500, err.message);
    }
}

async function insertAsset(req) {
    try {
        let userId = 2001;
        if (!isNaN(Number(req.user?.id))) {
            userId = Number(req.user.id);
        }

        const {
            P_ASTID, P_ASTNAME, P_CATID, P_SUBCATID, P_QTY, P_SERIALNO, P_PURCHASEDATE
        } = req.data;

        await cds.run(
            `CALL prinsertupdateasset(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                P_ASTID,
                P_ASTNAME,
                P_CATID,
                P_SUBCATID,
                Number(P_QTY),
                userId,
                P_SERIALNO,
                P_PURCHASEDATE
            ]
        );

        return { Success: "Asset Saved Successfully" };
    } catch (err) {
        console.error(err);
        req.error(500, err.message);
    }
}

module.exports = {
    createRequest,
    getRequestsByUserId,
    getAssetByAssetId,
    assignAsset,
    approveRequest,
    insertAsset
};