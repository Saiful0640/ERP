import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppCollectionService {

  constructor() { }
  getMobileBankingType():{name:string}[]{
    return [
      {name:'bKash'},
      {name:'Rocket'},
      {name:'Nagad'}
    ]
  }
}
