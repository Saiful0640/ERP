import { BusRegistrationAndScheduleItemsModel } from "./bus-registration-and-schedule-items-model";

export class BusRegistrationAndScheduleModel {
    id :number;
    tripID :number;
    compId :number;
    busId :number;
    scheduleDate:any;
    schedule:string;
    registrationNo :string;
    upOrDown:number;
    Items :BusRegistrationAndScheduleItemsModel[];
}
