using {ASM as db} from '/home/user/projects/asset_management/db/schema.cds';

service ManagerService {

  entity AllRequest as projection on db.T.ALLREQUESTS{
        ASRID,
        REQID,
        USRID,
        user.NAME as USERNAME,       // expose user name
        ASTID,
        CATID,
        category.CNAME as CATNAME,   // expose category name
        RDATE,
        STAT,
        PRITY
  }



  entity AllAsset as projection on db.T.ASSETVIEW;
  

  entity cate as projection on db.M.ASSETCATGORY;
  entity assertreq as projection on db.T.ASTVIEW;
  
  entity subcat as projection on db.M.Assetsubcategory;

  entity astassigned as projection on db.T.MGASG;
  
    action ApproveRequest(
    REQID : String,
    STATUS : Integer
    ) returns String;

    action AssignAsset(
    REQID : String, 
    ASTID : String
    ) returns String;

    action insertAsset (
    P_ASTNAME  : String,
    P_CATID    : String,
    P_SUBCATID : String,
    P_QTY      : Integer
);
}