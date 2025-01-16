export class AppRouter {
  static login = "/login";
  static admin = "/admin";

  //Por defecto
  static adminAdmin = `${this.admin}/admin`;
  static adminHome = `${this.admin}/home`;

  //Entidades
  static adminUsuarios = `${this.admin}/usuarios`;
  static adminRoles = `${this.admin}/roles`;
  static adminProductos = `${this.admin}/productos`;
  static adminEmpresas = `${this.admin}/empresas`;
  static adminProveedores = `${this.admin}/proveedores`;
  static adminClientes = `${this.admin}/clientes`;
}
