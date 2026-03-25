using { ASM as db } from '/home/user/asset_management/db/schema.cds';

service EmployeeService {

  @Capabilities.Readable: false
  entity AllRequest as projection on db.T.ALLREQUESTS;

  @Capabilities.Readable: false
  entity AllAsset as projection on db.T.ASSETVIEW;

  entity subcat as projection on db.M.Assetsubcategory;

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