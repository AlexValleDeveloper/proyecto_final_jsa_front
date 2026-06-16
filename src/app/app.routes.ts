import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

import { Communities } from './pages/communities/communities';
import { Categories } from './pages/categories/categories';
import { Items } from './pages/items/items';
import { Orders } from './pages/orders/orders';

export const routes: Routes = [
  /**
   * app.routes.ts
   *
   * ⚠️ INSTRUCCIONES PARA EL EQUIPO:
   * Las rutas comentadas apuntan a componentes que aún no existen.
   * Descomenta SOLO la ruta de tu componente cuando ya lo hayas creado.
   * No descomentes rutas de componentes que no son tuyos.
   * Si el nombre de tu page no coincide modifica
   */
  // ==== RUTAS PÚBLICAS ====
  // Eager loading — se cargan al arrancar la app (son las primeras que ve el usuario)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Login }, // ← temporal hasta que exista HomeComponent
  { path: 'login', component: Login },
  { path: 'register', component: Register },


  { path: 'communities', component: Communities },
  { path: 'categories', component: Categories },
  { path: 'items', component: Items },
  { path: 'orders', component: Orders },


  // {
  //   path: 'items/:id',
  //   loadComponent: () =>
  //     import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  // },
  // {
  //   path: 'community/:id',
  //   loadComponent: () => import('./pages/community/community').then((m) => m.Community),
  // },
  // {
  //   path: 'recipes/:id',
  //   loadComponent: () => import('./pages/recipe-detail/recipe-detail').then((m) => m.RecipeDetail),
  // },

  // ==== RUTAS PRIVADAS — USUARIO ====
  // Lazy loading + authGuard — solo accesibles con token válido
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
  },
  // {
  //   path: 'profile',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
  // },
  // {
  //   path: 'orders',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders),
  // },
  // {
  //   path: 'orders/:id',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./pages/order-detail/order-detail').then((m) => m.OrderDetail),
  // },

  // ==== RUTAS PRIVADAS — ADMIN ====
  // Lazy loading + adminGuard — solo accesibles con token de admin
  // {
  //   path: 'admin',
  //   canActivate: [adminGuard],
  //   loadComponent: () =>
  //     import('./pages/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
  // },

  // ==== COMODÍN ====  ← ruta 404 al final
  { path: '**', redirectTo: 'home' },
];
