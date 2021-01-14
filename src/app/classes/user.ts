import { Permision } from "./permision";

export class User {
    uid: string;
    permissions: Permision;
    bucket: any[];
    email: string;
    constructor(uid:string, permissions: Permision, bucket: any[],email:string){
        this.uid = uid;
        this.permissions = permissions;
        this.bucket = bucket;
        this.email=email;
    }
}
