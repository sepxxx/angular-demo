// import { Injectable, ComponentFactoryResolver, ComponentRef } from '@angular/core';
// import { UserInfoCardComponent } from '../components/user-info-card/user-info-card.component';
// @Injectable({
//   providedIn: 'root'
// })
// export class DynamicUserInfoCardServiceService {

//   constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

//   createComponent(id: string): ComponentRef<UserInfoCardComponent> {
//     const factory = this.componentFactoryResolver.resolveComponentFactory(UserInfoCardComponent);
//     const componentRef = factory.create(undefined);

//     // Установите id для компонента
//     componentRef.instance.id = id;

//     return componentRef;
//   }
// }
