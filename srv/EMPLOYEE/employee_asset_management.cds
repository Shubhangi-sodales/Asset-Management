using { ASM as db } from '/home/user/projects/asset_management/db/schema.cds';

service EmployeeService {

  @Capabilities.Readable: false
  entity AllRequest as projection on db.T.ALLREQUESTS;

  @Capabilities.Readable: false
  entity AllAsset as projection on db.T.ASSETVIEW;
  
  entity cate as projection on db.M.ASSETCATGORY;
  
  entity profile as projection on db.T.EMPDT;

  entity empreq as projection on db.T.EAS;

  entity empassetassigned as projection on db.T.EPASG;

  action CreateRequest (
    USERID : Integer,
    CATID  : String(30),
    ASTID  : String(30),
    SCTID  : String(30),   
    PRITY  : String(20)
  ) returns {
    REQCODE    : String(30);
    CATCODE    : String(30);
    SUBCATCODE : String(30);
  };

  
  function getRequestsByUserId(USERID: Integer) returns array of AllRequest;

  function getAssetByAssetId(ASSTID: String) returns array of AllAsset;

}