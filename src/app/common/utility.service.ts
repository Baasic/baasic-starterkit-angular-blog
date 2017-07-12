import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

    constructor() { }

    copyObject(dstObj: any, ...srcObj: any[]): any {
        const newObj = dstObj;
        for (const obj of srcObj) {
            for (const key in obj) {
                //copy all the fields
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }

    extendObject(dstObj: any, ...srcObj: any[]): void {
        for (const obj of srcObj) {
            for (const key in obj) {
                //copy all the fields
                dstObj[key] = obj[key];
            }
        }
    }
}