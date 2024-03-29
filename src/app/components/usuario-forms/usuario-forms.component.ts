import { ElementSchemaRegistry, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { CuentaService } from 'src/app/services/cuenta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-forms',
  templateUrl: './usuario-forms.component.html',
  styleUrls: ['./usuario-forms.component.css']
})
export class UsuarioFormsComponent implements OnInit {

  mostrar:boolean = false;///////
  public nuevo:string="";
  

  cuenta:Cuenta= new Cuenta();
  cuentas:Cuenta[]=[]
 roles:Rol=new Rol(); 
  usuario:Usuario[]=[];
  rol!:Rol[]; 
  flag!:boolean;
  estado:string='Habilitado';
  rolE:string="ADMINISTRADOR";

  titulo:string='USUARIO';
  Miformulario!:FormGroup;
  constructor( public cuentaServicio:CuentaService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder) { 
  /* */
  this.flag=true
  }

  ngOnInit(){
    this.cuentaServicio.getRoles().subscribe(
      response=>this.rol=response
    )
    this.Miformulario=this.fb.group({
      roles:this.fb.array([this.fb.group({nombre:['']})])
    });

   
    this.cargar();
   //this.cuentaServicio.mostrarUs=true;

    
  }
  
  
  cargar():void{
   this.activatedRoute.params.subscribe(
    a=>{
      let id=a['id'];
      if(id){
        this.cuentaServicio.get(id).subscribe(
          es=>{this.cuenta=es;
            this.roles=es.roles[0];
            if(es.enabled){
            this.estado='Habilitado'}else{
              this.estado='Deshabilitado'
            };
            //
            if(es.roles[0].nombre=='ROLE_ADMINISTRADOR'){
              this.rolE='ADMINISTRADOR'}
              else{
                this.rolE='VENDEDOR'
              }
          });
            
      }})
  }


  create(notasForm:any):void{

    if(notasForm.form.valid ){

    if(this.rolE=='ADMINISTRADOR'){
      this.roles.nombre='ROLE_ADMINISTRADOR'
    }else{
      this.roles.nombre='ROLE_VENDEDOR'
    }

  
   console.log(this.roles);
   this.cuenta.roles.unshift(this.roles);
   console.log(this.cuenta);
   if(this.estado =='Habilitado'){
      console.log(this.cuenta);
      this.cuenta.enabled=true;
    }
    else{
      this.cuenta.enabled=false;
    }
    this.cuentaServicio.create(this.cuenta).subscribe
    (res=> this.router.navigate(['/usuarios']),
    error=>Swal.fire('LO SENTIMOS',`NO SE PUEDE CREAR UN USUARIO EXISTENTE`,'warning'),
    ()=>Swal.fire('USUARIO',`CREADO CON EXITO`,'success'))
    
    console.log(this.cuenta);
    
  }

  }
  

  update():void{
    if(this.rolE=='ADMINISTRADOR'){
      this.roles.nombre='ROLE_ADMINISTRADOR'
    }else{
      this.roles.nombre='ROLE_VENDEDOR'
    }
    
    console.log(this.roles);
   this.cuenta.roles[0]=(this.roles);
   console.log(this.roles);
   console.log(this.cuenta);

   if(this.estado =='Habilitado'){
    console.log(this.cuenta);
    this.cuenta.enabled=true;
  }
  else{
    this.cuenta.enabled=false;
  }

  if(this.mostrar==true){
    console.log('cambiando contraseña')   
    this.cuenta.contrasena=this.nuevo;
  }

    this.cuentaServicio.update(this.cuenta).subscribe(
      u=>this.router.navigate(['/usuarios']));
      Swal.fire(this.titulo,`EDITADO CON EXITO`,'success');
  }
public validador;
validadorCedula(cedula:string){
let cedulaCorrecta=false;
if(cedula.length==10){
  let tercerDig =parseInt(cedula.substring(2,3));
  if(tercerDig<6){
     let coefValCedula =[2, 1, 2, 1, 2, 1, 2, 1, 2];
     let verificador=  parseInt(cedula.substring(9, 10));
     let suma:number=0;
     let digito:number=0;
     for(let i=0;i<(cedula.length-1);i++){
      digito=parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
      suma+=((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
     }
     suma= Math.round(suma);
     if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
      cedulaCorrecta = true;
     } else if ((10 - (Math.round(suma % 10))) == verificador) {
      cedulaCorrecta = true;
  } else{
    cedulaCorrecta=false;
   
  }
  }else{
    cedulaCorrecta = false;
   }
} else {
  cedulaCorrecta = false;
}
 //
  if (cedula=="0000000000"  || cedula=="2222222222" ||  cedula=="4444444444" ||cedula=="5555555555" ||cedula=="1010101010"||cedula=="2020202020"||cedula=="3030303030"||cedula=="4040404040"){
   cedulaCorrecta = false;
  }
 

this.validador= cedulaCorrecta;

}  

////validar correo
esEmailValido(email: string):boolean {
  let mailValido = false;
    'use strict';

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)){
      mailValido = true;
    }
  return mailValido;
}
 

}
