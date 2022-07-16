// module imports
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
// project modules
import { AppRoutingModule } from './app-routing.module';
// service imports
import { InterceptorService } from './services/interceptor.service';
// component imports
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionsComponent } from './components/inscriptions/inscriptions.component';
import { NetworksComponent } from './components/networks/networks.component';
import { PeopleComponent } from './components/people/people.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { HonorsComponent } from './components/honors/honors.component';
import { HomeIntroComponent } from './components/home/home-intro/home-intro.component';
import { HomeAuthorComponent } from './components/home/home-author/home-author.component';
import { HomeSpecsComponent } from './components/home/home-specs/home-specs.component';
import { HomeBibliographyComponent } from './components/home/home-bibliography/home-bibliography.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfirmRoleChangeDialog } from './components/profile/users/users.component';
import { UsersComponent } from './components/profile/users/users.component';
import { InscriptionDetailComponent } from './components/inscriptions/inscription-detail/inscription-detail.component';
import { PersonDetailComponent } from './components/people/person-detail/person-detail.component';
import { HonorDetailComponent } from './components/honors/honor-detail/honor-detail.component';
import { InstitutionDetailComponent } from './components/institutions/institution-detail/institution-detail.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { ItemInfoComponent } from './components/common/item-info/item-info.component';
import { DataTableComponent } from './components/common/data-table/data-table.component';
import { NetworkGraphComponent } from './components/common/network-graph/network-graph.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';
import { SponsorsToHonorandsNetworkComponent } from './components/networks/sponsors-to-honorands-network/sponsors-to-honorands-network.component';
import { SponsorsToAppearingNetworkComponent } from './components/networks/sponsors-to-appearing-network/sponsors-to-appearing-network.component';
import { CoappearingNetworkComponent } from './components/networks/coappearing-network/coappearing-network.component';
import { AddInscriptionComponent } from './components/inscriptions/add-inscription/add-inscription.component';
import { ConfirmAddInscriptionDialog } from './components/inscriptions/add-inscription/add-inscription.component';
import { AddHonorComponent } from './components/honors/add-honor/add-honor.component';
import { ConfirmAddHonorDialog } from './components/honors/add-honor/add-honor.component';
import { AddInstitutionComponent } from './components/institutions/add-institution/add-institution.component';
import { ConfirmAddInstitutionDialog } from './components/institutions/add-institution/add-institution.component';
import { AddPersonComponent } from './components/people/add-person/add-person.component';
import { ConfirmAddPersonDialog } from './components/people/add-person/add-person.component';
import { EditInscriptionComponent } from './components/inscriptions/edit-inscription/edit-inscription.component';
import { ExportComponent } from './components/export/export.component';
import { EditHonorComponent } from './components/honors/edit-honor/edit-honor.component';
import { EditInstitutionComponent } from './components/institutions/edit-institution/edit-institution.component';
import { EditPersonComponent } from './components/people/edit-person/edit-person.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    InscriptionsComponent,
    NetworksComponent,
    PeopleComponent,
    InstitutionsComponent,
    HonorsComponent,
    HomeIntroComponent,
    HomeAuthorComponent,
    HomeSpecsComponent,
    HomeBibliographyComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UsersComponent,
    InscriptionDetailComponent,
    PersonDetailComponent,
    HonorDetailComponent,
    InstitutionDetailComponent,
    ConfirmRoleChangeDialog,
    NotFoundComponent,
    ItemInfoComponent,
    DataTableComponent,
    NetworkGraphComponent,
    PrivacyPolicyComponent,
    SponsorsToHonorandsNetworkComponent,
    SponsorsToAppearingNetworkComponent,
    CoappearingNetworkComponent,
    AddInscriptionComponent,
    ConfirmAddInscriptionDialog,
    AddHonorComponent,
    ConfirmAddHonorDialog,
    AddInstitutionComponent,
    ConfirmAddInstitutionDialog,
    AddPersonComponent,
    ConfirmAddPersonDialog,
    EditInscriptionComponent,
    ExportComponent,
    EditHonorComponent,
    EditInstitutionComponent,
    EditPersonComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    DataTablesModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
