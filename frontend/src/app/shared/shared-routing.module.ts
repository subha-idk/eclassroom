import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
          canActivate:[AuthGuard]
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('../teacher/teacher.module').then((m) => m.TeacherModule),
          canActivate:[AuthGuard]
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../student/student.module').then((m) => m.StudentModule),
          canActivate:[AuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
