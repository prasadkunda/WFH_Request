import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ViewallTrainingsComponent } from './components/trainings/viewall-trainings/viewall-trainings.component';

export const routes: Routes = [
  { path: 'innovations',  loadComponent: () => import("../app/components/innovations/innovations.component").then((m) => m.InnovationsComponent)},
  { path: 'facility', loadComponent: () => import("../app/components/facility/facility.component").then((m) => m.FacilityComponent)  },
  { path: 'operations',loadComponent: () => import("../app/components/operations/operations.component").then((m) => m.OperationsComponent) },
  { path: 'employee', loadComponent: () => import("../app/Employee/employee.component").then((m) => m.EmployeeComponent) },
  { path: 'request', loadComponent: () => import("../app/components/request/request.component").then((m) => m.RequestComponent) },
  { path: 'trainings', loadComponent: () => import("../app/components/trainings/trainings.component").then((m) => m.TrainingsComponent) },
  { path: '', component: HomeComponent },
  {path: 'manager',loadComponent: () => import("../app/Manager/manager.component").then((m) => m.ManagerComponent)},
  {path:'about-us',component:AboutUsComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'admin',component:AdminComponent},
  {path:'login',component:LoginComponent},
  {path:'coe-act', loadComponent: () => import('../app/components/coe-activities/coe-activities.component').then((m) => m.CoeActivitiesComponent)},
  {path: 'viewall-trainings/:id',loadComponent: () => import("../app/components/trainings/viewall-trainings/viewall-trainings.component").then((m) => m.ViewallTrainingsComponent)},
  {path: 'viewall-notifications',loadComponent: () => import("../app/shared/components/view-all-notifications/view-all-notifications.component").then((m) => m.ViewAllNotificationsComponent)},
  {path: 'innovation-dashboard',loadComponent: () => import("../app/components/dashboard/innovation-dashboard/innovation-dashboard.component").then((m) => m.InnovationDashboardComponent)},
  {path: 'training-dashboard',loadComponent: () => import("../app/components/dashboard/training-dashboard/training-dashboard.component").then((m) => m.TrainingDashboardComponent)},
];
