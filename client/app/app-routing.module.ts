import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { InscriptionsComponent } from './components/inscriptions/inscriptions.component';
import { PeopleComponent } from './components/people/people.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { HonorsComponent } from './components/honors/honors.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InscriptionDetailComponent } from './components/inscriptions/inscription-detail/inscription-detail.component';
import { PersonDetailComponent } from './components/people/person-detail/person-detail.component';
import { InstitutionDetailComponent } from './components/institutions/institution-detail/institution-detail.component';
import { HonorDetailComponent } from './components/honors/honor-detail/honor-detail.component';
import { ExportComponent } from './components/export/export.component';
import { NetworksComponent } from './components/networks/networks.component';
import { SponsorsToHonorandsNetworkComponent } from './components/networks/sponsors-to-honorands-network/sponsors-to-honorands-network.component';
import { SponsorsToAppearingNetworkComponent } from './components/networks/sponsors-to-appearing-network/sponsors-to-appearing-network.component';
import { CoappearingNetworkComponent } from './components/networks/coappearing-network/coappearing-network.component';
import { AddInscriptionComponent } from './components/inscriptions/add-inscription/add-inscription.component';
import { AddHonorComponent } from './components/honors/add-honor/add-honor.component';
import { AddInstitutionComponent } from './components/institutions/add-institution/add-institution.component';
import { AddPersonComponent } from './components/people/add-person/add-person.component';
import { EditInscriptionComponent } from './components/inscriptions/edit-inscription/edit-inscription.component';
import { EditHonorComponent } from './components/honors/edit-honor/edit-honor.component';


import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'inscriptions', component: InscriptionsComponent },
  { path: 'inscriptions/add', canActivate: [AuthGuardService], component: AddInscriptionComponent },
  { path: 'inscriptions/edit/:id', canActivate: [AuthGuardService], component: EditInscriptionComponent },
  { path: 'inscriptions/:id', component: InscriptionDetailComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/add', canActivate: [AuthGuardService], component: AddPersonComponent },
  { path: 'people/:id', component: PersonDetailComponent },
  { path: 'institutions', component: InstitutionsComponent },
  { path: 'institutions/add', canActivate: [AuthGuardService], component: AddInstitutionComponent },
  { path: 'institutions/:id', component: InstitutionDetailComponent },
  { path: 'honors', component: HonorsComponent },
  { path: 'honors/add', canActivate: [AuthGuardService], component: AddHonorComponent },
  { path: 'honors/edit/:id', canActivate: [AuthGuardService], component: EditHonorComponent },
  { path: 'honors/:id', component: HonorDetailComponent },
  { path: 'export', component: ExportComponent },
  { path: 'networks', component: NetworksComponent },
  { path: 'networks/sponsor_to_honorand', component: SponsorsToHonorandsNetworkComponent },
  { path: 'networks/sponsor_to_appearing', component: SponsorsToAppearingNetworkComponent },
  { path: 'networks/coappearing', component: CoappearingNetworkComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
