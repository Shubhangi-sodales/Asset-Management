const cds = require('@sap/cds');

function toStr(value) {
    return value == null ? '' : String(value);
}


async function logAudit(tx, userId, action, entity, enid, newData = {}) {
    try {
        await tx.run(
            `INSERT INTO ASM_T_AULOG
            (USRID, ACTN, ENAME, ENID, TSTMP, OLDV, NEWV, ISDEL, CRTDT, CRTTM, CRTBY)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, CURRENT_DATE, CURRENT_TIME, ?)`,
            [
                Number(userId),
                toStr(action),
                toStr(entity),
                enid ? Number(enid) : 0,
                '',
                JSON.stringify(newData || {}),
                'N',
                toStr(userId)
            ]
        );
    } catch (e) {
        console.error("Audit log failed:", e);
    }
}


async function logError(userId, err) {
    try {
        await cds.run(
            `INSERT INTO ASM_T_ERRLOG
            (ERRMS, ERRST, STCOD, ISDEL, CRTDT, CRTTM, CRTBY)
            VALUES (?, ?, ?, 0, CURRENT_DATE, CURRENT_TIME, ?)`,
            [
                toStr(err.message),
                toStr(err.stack),
                Number(err.code) || 500,
                toStr(userId)
            ]
        );
    } catch (e) {
        console.error("Error log failed:", e);
    }
}


async function createRequest(req) {
    const userId = Number(req.data.USERID);
    const tx = cds.tx(req);

    try {
        const result = await tx.run(
            `CALL prinsertupdaterequest(?,?,?,?,?,?)`,
            ['0', userId, req.data.PRITY, req.data.CATID, req.data.ASTID, req.data.SCTID]
        );

        const row = result?.[0];

        
        const managers = await tx.run(`
            SELECT U.USRID 
            FROM ASM_M_USEDT U
            JOIN ASM_M_ROLED R ON U.ROLID = R.ROLD
            WHERE R.ROLNM = 'employee'
        `);

        for (let manager of managers) {
            await tx.run(
                `INSERT INTO ASM_T_NOTDT
                (NTFID, USRID, MSG, NOTYPE, ISRED, ISDEL, CRTDT, CRTTM, CRTBY)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_TIME, ?)`,
                [
                    null,
                    userId,
                    `New request created by user ${userId}`,
                    'NEW_REQUEST',
                    false,
                    'N',
                    toStr(userId)
                ]
            );
        }

        await logAudit(tx, userId, 'CREATE_REQUEST', 'ASM_T_ASREQ', row?.REQCODE, req.data);

        await tx.commit();

        return {
            REQCODE: row?.REQCODE,
            CATCODE: row?.CATCODE,
            SUBCATCODE: row?.SUBCATCODE
        };

    } catch (err) {
        console.error(err);
        await logError(userId, err);
        return req.error(500, err.message);
    }
}


async function getRequestsByUserId(req, AllRequest) {
    const userId = Number(req.data.USERID || 2001);

    try {
        return await cds.run(
            SELECT.from(AllRequest).where({ USRID: userId })
        );
    } catch (err) {
        console.error(err);
        await logError(userId, err);
        req.error(500, err.message);
    }
}


async function getAssetByAssetId(req) {
    const userId = Number(req.user?.id || 2001);

    try {
        return await cds.run(
            SELECT.from("EmployeeService.AllAsset")
                .where({ ASTID: toStr(req.data.ASSTID) })
        );
    } catch (err) {
        console.error(err);
        await logError(userId, err);
        req.error(500, err.message);
    }
}


async function assignAsset(req) {
    const userId = Number(req.user?.id || 2001);
    const tx = cds.tx(req);

    try {
        const { REQID, ASTID } = req.data;

        await tx.run(
            `CALL prinsertupdateassignasset(?, ?, ?)`,
            [String(REQID), String(ASTID), 2001]
        );

        const reqData = await tx.run(
            SELECT.one.from("ASM_T_ASREQ").where({ REQID: String(REQID) })
        );

        if (reqData?.USRID) {
            await tx.run(
                `INSERT INTO ASM_T_NOTDT
                (NTFID, USRID, MSG, NOTYPE, ISRED, ISDEL, CRTDT, CRTTM, CRTBY)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_TIME, ?)`,
                [
                    null,
                    2001,
                    `Asset ${ASTID} assigned successfully`,
                    'ASSET_ASSIGN',
                    false,
                    'N',
                    toStr(userId)
                ]
            );
        }

        await logAudit(tx, 2001, 'ASSIGN_ASSET', 'ASM_T_ASREQ', Number(REQID), req.data);

        await tx.commit();

        return { Success: "Asset Assigned & Notification Sent" };

    } catch (err) {
        console.error(err);
        await logError(userId, err);
        return req.error(500, err.message);
    }
}

async function approveRequest(req) {
    const userId = Number(req.user?.id || 2001);
    const tx = cds.tx(req);

    try {
        const { REQID, STATUS } = req.data;

        await tx.run(
            `CALL prinserupdateassetapproverequest(?, ?, ?)`,
            [String(REQID), Number(STATUS), 2001]
        );

        const reqData = await tx.run(
            SELECT.one.from("ASM_T_ASREQ").where({ REQID: String(REQID) })
        );

        if (reqData?.USRID) {
            let message =
                STATUS === 1 ? `Your request ${REQID} has been APPROVED` :
                STATUS === 2 ? `Your request ${REQID} has been REJECTED` :
                `Your request ${REQID} status updated`;

            await tx.run(
            `INSERT INTO ASM_T_NOTDT
            (NTFID, USRID, MSG, NOTYPE, ISRED, ISDEL, CRTDT, CRTTM, CRTBY)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_TIME, ?)`,
            [
                null,
                2001,
                message,
                'REQUEST_STATUS',
                false,
                '0',
                toStr(userId)
            ]
        );
    }

        await logAudit(tx, 2001, 'APPROVE_REQUEST', 'ASM_T_ASREQ', Number(REQID), req.data);

        await tx.commit();

        return { Success: "Request updated & Notification Sent" };

    } catch (err) {
        console.error(err);
        await logError(userId, err);
        return req.error(500, err.message);
    }
}


async function insertAsset(req) {
    const userId = Number(req.user?.id || 2001);
    const tx = cds.tx(req);

    try {
        console.log(req.data);
        const { P_ASTID, P_ASTNAME, P_CATID, P_SUBCATID, P_QTY, P_SERIALNO, P_PURCHASEDATE } = req.data;

        await tx.run(
            `CALL prinsertupdateasset(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                P_ASTID,
                P_ASTNAME,
                P_CATID,
                P_SUBCATID,
                Number(P_QTY),
                2001,
                P_SERIALNO,
                P_PURCHASEDATE
            ]
        );

        await tx.run(
            `INSERT INTO ASM_T_NOTDT
            (NTFID, USRID, MSG, NOTYPE, ISRED, ISDEL, CRTDT, CRTTM, CRTBY)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_TIME, ?)`,
            [
                null,
                2001,
                `Asset ${P_ASTNAME} (${P_ASTID}) saved successfully`,
                'ASSET_INSERT',
                false,
                'N',
                toStr(userId)
            ]
        );

        await logAudit(tx, 2001, 'INSERT_ASSET', 'ASM_T_ASSET', Number(P_ASTID), req.data);

        await tx.commit();

        return { Success: "Asset Saved & Notification Sent" };

    } catch (err) {
        console.error(err);
        await logError(userId, err);
        return req.error(500, err.message);
    }
}


async function markNotificationRead(req) {
    const userId = Number(req.user?.id || 2001);
    const tx = cds.tx(req);

    try {
        let { ANTID } = req.data;
        ANTID = Number(ANTID);

        if (ANTID == null || isNaN(ANTID)) {
            return req.error(400, "Invalid ANTID");
        }

        await tx.run(
            `UPDATE ASM_T_NOTDT
             SET ISRED = true,
                 CHNDT = CURRENT_DATE,
                 CHNTM = CURRENT_TIME,
                 CHNBY = ?
             WHERE ANTID = ?`,
            [String(userId), ANTID]
        );

        await logAudit(tx, userId, 'READ_NOTIFICATION', 'ASM_T_NOTDT', ANTID, req.data);

        await tx.commit();

        return { Success: "Notification marked as read" };

    } catch (err) {
        console.error(err);
        await logError(userId, err);
        return req.error(500, err.message);
    }
}

async function getMyNotifications(req) {
    const userId = Number(req.user?.id || 2001);

    try {
        return await cds.run(
            SELECT.from("ASM_T_NOTDT")
                .columns(['NTFID', 'MSG', 'NOTYPE', 'ISRED', 'CRTDT', 'CRTTM'])
                .where({ USRID: userId, ISDEL: 'N' })
                .orderBy([{ ref: ['CRTDT'], sort: 'desc' }, { ref: ['CRTTM'], sort: 'desc' }])
        );
    } catch (err) {
        console.error(err);
        await logError(userId, err);
        req.error(500, err.message);
    }
}

module.exports = {
    createRequest,
    getRequestsByUserId,
    getAssetByAssetId,
    assignAsset,
    approveRequest,
    insertAsset,
    markNotificationRead,
    getMyNotifications
};