import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ServiceService} from "../../providers/ServiceService";
import {ServiceTypeService} from "../../providers/ServiceTypeService";
import {ServiceType} from "../../models/ServiceType";
import {PagedListServiceType} from "../../models/PagedListServiceType";
import {PagedListService} from "../../models/PagedListService";

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  public servicesType: Array<ServiceType> = [];
  private currentPage: number = 0;
  public allItemsLoaded: boolean = true;
  private infiniteScroll = null;
  private refresher = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public serviceService: ServiceService,
              public serviceTypeService: ServiceTypeService) {
  }

  ionViewDidLoad() {
    this.getNextServices(this.currentPage);
  }

  getNextServices(page: number){
    this.serviceTypeService.get(page).subscribe(
      services => this.getServiceTypeSuccess(services),
      error => this.getServiceTypeError(<any>error));
  }

  getServiceTypeSuccess(pagedListServiceType: PagedListServiceType): void{
    if(this.refresher){
      this.servicesType = [];
    }
    this.servicesType = this.servicesType.concat(pagedListServiceType.data);
    this.allItemsLoaded = !pagedListServiceType.hasNext;
    if(this.infiniteScroll) {
      this.infiniteScroll.complete();
      this.infiniteScroll = null;
    }
    if(this.refresher) {
      this.refresher.complete();
      this.refresher = null;
    }
  }

  getServiceTypeError(error: any): void{
    if(this.infiniteScroll) {
      this.infiniteScroll.complete();
      this.infiniteScroll = null;
    }
    if(this.refresher) {
      this.refresher.complete();
      this.refresher = null;
    }
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.currentPage = 0;
    this.getNextServices(this.currentPage);
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.currentPage +=1;
    this.getNextServices(this.currentPage);
  }

  onClickServiceType(serviceType){
    if(serviceType && !serviceType.opened) {
      for (let sT of this.servicesType) {
        sT['opened'] = (sT.id === serviceType.id);
      }
      this.serviceService.get(serviceType).subscribe(
        services => this.getServiceSuccess(services),
        error => this.getServiceError(<any>error));
    }else{
      serviceType.opened = false;
    }
  }

  getServiceSuccess(pagedListService: PagedListService): void{
    for (let serviceType of this.servicesType) {
      if(pagedListService.data[0] && pagedListService.data[0].serviceType && serviceType.id === pagedListService.data[0].serviceType.id) {
        serviceType.services = pagedListService.data;
      }
    }
  }

  getServiceError(error: any): void{

  }

}
