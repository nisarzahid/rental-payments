import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Lease , Tenant } from "../../models/index";

/** 
 * Helper Service for Application wide helper functions
*/
@Injectable({
    providedIn: "root"
  })
export  class HelperService {

    public currentTenant = '';
    public cachedLeases:Tenant[] = [];
}