import {Type} from '@angular/core';
import { convertToParamMap, ParamMap } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';
import {ActivatedRoute,Route,ActivatedRouteSnapshot,UrlSegment,Params,Data } from '@angular/router';


/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
    snapshot : ActivatedRouteSnapshot;
    url : Observable<UrlSegment[]>;
    params : Observable<Params>;
    queryParams : Observable<Params>;
    fragment : Observable<string>;
    data : Observable<Data>;
    outlet : string;
    component : Type<any>|string;
    routeConfig : Route;
    root : ActivatedRoute;
    parent : ActivatedRoute;
    firstChild : ActivatedRoute;
    children : ActivatedRoute[];
    pathFromRoot : ActivatedRoute[];
    toString() : string{
        return "";
    };
}