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
  static adminEmpleados = `${this.admin}/empleados`;
  static adminProveedores = `${this.admin}/proveedores`;
  static adminClientes = `${this.admin}/clientes`;
  static adminFactura = `${this.admin}/facturas`;
  static adminComprobante = `${this.admin}/comprobantes`;

  //Procesos
  static adminVentas = `${this.admin}/ventas`;
  static adminInventario = `${this.admin}/inventarios`;
}
