import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { Authservice } from "./auth.service";
import { inject } from '@angular/core';

// Inject necessary dependencies into the guard function
// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = new Authservice(/* Provide required dependencies here */); // Instantiate AuthService
//   const isAuth = this.; // Check authentication status using AuthService method

//   return isAuth;
// };


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  
  // console.log('guard status: ', inject(TokenService).authenticated());

  const isAuth = inject(Authservice).getIsAuth();
  if (!isAuth) {
    inject(Router).navigate(['/login']);
    
  } 
  return isAuth;
  // return inject(Authservice).getIsAuth()
  //   ? true
  //   : inject(Router).createUrlTree(['/auth/login']);
};