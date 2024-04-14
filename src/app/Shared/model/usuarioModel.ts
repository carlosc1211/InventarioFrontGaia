interface Roles{
codigo : string; 
descripcion:string;
id:string 
}

export class Usuario {
  id: string;
  nombre: string;
  apellidos: string;
  nombre_usuario: string;
  contrasenya:string;
  rol:Roles;
}


