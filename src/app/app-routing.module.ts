import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './body/about/about.component';
import { SkillsComponent } from './body/skills/skills.component';
import { ExperienceComponent } from './body/experience/experience.component';
import { ProjectsComponent } from './body/projects/projects.component';
import { ContactComponent } from './body/contact/contact.component';
import { HomeComponent } from './body/home/home.component';
import { EducationComponent } from './body/education/education.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'skills', component:SkillsComponent},
  {path:'experience', component:ExperienceComponent},
  {path:'projects', component:ProjectsComponent},
  {path:'contact', component:ContactComponent},
  {path:'education', component:EducationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
