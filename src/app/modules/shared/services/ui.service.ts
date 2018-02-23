import { Injectable } from '@angular/core';
import { NotificationsService } from "angular2-notifications";

@Injectable()
export class UIService {
  language : string ;


    constructor(private notifyService: NotificationsService) { }

    alertSuccess(msg: string) {
        this.notifyService.success("Success", msg, { position: ["top", "left"]} );
    }
    alertInfo(msg: string) {
        this.notifyService.info("Info", msg, { position: ["top", "left"]} );
    }
    alertWarning(msg: string) {
        this.notifyService.warn("Warning", msg, { position: ["top", "left"]} );
    }
    alertError(msg: string) {
        this.notifyService.error("Error", msg, { position: ["top", "left"]} );
    }

    setLanguage(lan:string)
    {
        this.language = lan;
    }
    getLanguage()
    {
        return this.language;
    }


}