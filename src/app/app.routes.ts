import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'innovations',  loadComponent: () => import("../app/components/innovations/innovations.component").then((m) => m.InnovationsComponent)},
  { path: 'facility', loadComponent: () => import("../app/components/facility/facility.component").then((m) => m.FacilityComponent)  },
  { path: 'operations',loadComponent: () => import("../app/components/operations/operations.component").then((m) => m.OperationsComponent) },
  { path: 'employee', loadComponent: () => import("../app/Employee/employee.component").then((m) => m.EmployeeComponent) },
  { path: '', component: HomeComponent },
];
