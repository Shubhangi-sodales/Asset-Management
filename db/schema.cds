namespace ASM;
context M{
@cds.persistence.exists 
@cds.persistence.calcview 
Entity ASSETCATGORY {
key     ACTID: String(30)  @title: 'ACTID: Unique ID' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 
        CNAME: String(100)  @title: 'CNAME: Category Name' ; 
        CDESC: String(255)  @title: 'CDESC: Category Description' ; 
        STAT: String(50)  @title: 'STAT: Status' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 
}
@cds.persistence.exists 
@cds.persistence.calcview 
Entity Assetsubcategory {
key     ASCID: String(30)  @title: 'ASCID: Unique ID' ; 
        SCTID: String(30)  @title: 'SCTID:  SUB Category ID' ; 
        SCNAM: String(100)  @title: 'SCNAM: SUB Category Name' ; 
        CATID: String(30) @title: 'CATID: Category ID' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 
        
}


@cds.persistence.exists 
@cds.persistence.calcview 
Entity USERVIEW {
key     NAME: String(100)  @title: 'NAME: Full Name' ; 
        USRID: Integer  @title: 'USRID: User ID' ; 
}


    
}
context T{
    @cds.persistence.exists 
    Entity asset_requests {
key     ASRID: Integer64  @title: 'ASRID: Unique ID' ; 
        REQID: String(30)  @title: 'REQID: Request ID' ; 
        USRID: Integer  @title: 'USRID: User ID' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 
        ASTID: String(30)  @title: 'ASTID: Asset ID' ; 
        RDATE: Timestamp  @title: 'RDATE: Request Date' ; 
        STAT: Integer  @title: 'STAT: Status' ; 
        PRITY: String(20)  @title: 'PRITY: Priority' ; 
        APBY: Integer  @title: 'APBY: Approved By' ; 
        APAT: Timestamp  @title: 'APAT: Approved At' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 

    }
    @cds.persistence.exists 
@cds.persistence.calcview 
Entity ALLREQUESTS {
key     ASRID: Integer64  @title: 'ASRID: Unique ID' ; 
        REQID: String(30)  @title: 'REQID: Request ID' ; 
        USRID: String(30)  @title: 'USRID: User ID' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 

        
        ASTID: String(30)  @title: 'ASTID: Asset ID' ; 
        RDATE: Timestamp  @title: 'RDATE: Request Date' ; 
        STAT: Integer  @title: 'STAT: Status' ; 
        PRITY: String(20)  @title: 'PRITY: Priority' ; 
        APBY: Integer  @title: 'APBY: Approved By' ; 
        APAT: Timestamp  @title: 'APAT: Approved At' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 
        

         category: association to M.ASSETCATGORY on category.CATID = CATID;
        user: association to M.USERVIEW on user.USRID = USRID;
}

      

@cds.persistence.exists 
@cds.persistence.calcview 
Entity ASSETVIEW {
key     ATUID: Integer64  @title: 'ATUID: Unique ID' ; 
        ASTID: String(30)  @title: 'ASTID: ASSET ID' ; 
        ASTNAME: String(100)  @title: 'ASTNAME: Asset Name' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 
        SUBCATID: String(30)  @title: 'SUBCATID: Sub Category ID' ; 
        SERIALNO: String(50)  @title: 'SERIALNO: Serial Number' ; 
        ASTST: String(20)  @title: 'ASTST: Asset Status (AVAILABLE / ASSIGNED / MAINTENANCE)' ; 
        PURCHASEDATE: Date  @title: 'PURCHASEDATE: Purchase Date' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 
        ASTQT: Integer  @title: 'ASTQT: Asset quantity' ; 

        category: association to M.ASSETCATGORY on category.CATID = CATID;
}
@cds.persistence.exists 
@cds.persistence.calcview 
Entity ASTVIEW {
key     NAME: String(100)  @title: 'NAME: Full Name' ; 
key     CNAME: String(100)  @title: 'CNAME: Category Name' ; 
        RDATE: Timestamp  @title: 'RDATE: Request Date' ; 
        STAT: Integer  @title: 'STAT: Status' ; 
key     PRITY: String(20)  @title: 'PRITY: Priority' ; 
}
@cds.persistence.exists 
@cds.persistence.calcview 
Entity EMPDT {
        USRID: Integer  @title: 'USRID: User ID' ; 
key     NAME: String(100)  @title: 'NAME: Full Name' ; 
key     ROLNM: String(100)  @title: 'ROLNM: role name' ; 
key     DNAME: String(100)  @title: 'DNAME: DEPARTMENT name' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity EAS {
        USRID: Integer  @title: 'USRID: User ID' ; 
key     REQID: String(30)  @title: 'REQID: Request ID' ; 
key     CNAME: String(100)  @title: 'CNAME: Category Name' ; 
        STAT: Integer  @title: 'STAT: Status' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity EPASG {
key     ASTID: String(30)  @title: 'ASTID: ASSET ID' ; 
        SERIALNO: String(50)  @title: 'SERIALNO: Serial Number' ; 
        ASTNAME: String(100)  @title: 'ASTNAME: Asset Name' ; 
        USRID: Integer  @title: 'USRID: User ID' ; 
        ASDAT: Timestamp  @title: 'ASDAT: Assigned Date' ; 
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity MGASG {
        USRID: Integer  @title: 'USRID: User ID' ; 
key     NAME: String(100)  @title: 'NAME: Full Name' ; 
key     CNAME: String(100)  @title: 'CNAME: Category Name' ; 
key     ASTID: String(30)  @title: 'ASTID: ASSET ID' ; 
key     ASTNAME: String(100)  @title: 'ASTNAME: Asset Name' ; 
        ASDAT: Timestamp  @title: 'ASDAT: Assigned Date' ; 
        STAT: Integer  @title: 'STAT: Status' ; 
}


}