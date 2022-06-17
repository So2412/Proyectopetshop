const connection=require('../conexion/conexion')
const cnn=connection();
const{render}=require('ejs')
const bcryptjs=require('bcryptjs');
const session = require('express-session');
const controller={};
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/ima/imagenesproductos")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+".jpg")
    }
})
const uploads = multer({storage})


/*INICIO PAGINA PRINCIPAL*/
controller.index=(req,res,next)=>{
    res.render('index')
    res.send("error en controlador")
}
/*CIERRE PAGINA PRINCIPAL*/
controller.login=async(req,res,next)=>{
    const usu=await req.body.UsuUsuario;
    const cla=await req.body.UsuContraseña;
    cnn.query('SELECT * FROM tbusuario WHERE UsuUsuario=?',[usu],async(err,results)=>{
           if(err){
               next(new Error("Error de consulta login",err));
           }
           else if(results!=0 && await(bcryptjs.compare(cla,results[0].UsuContraseña))){
           //else if(results!=0 && await(cla,results[0].UsuContraseña)){
               console.log("Datos correctos");
                   uss=results[0].UsuNombre;
                   ddd=results[0].cedusu;
                   req.session.uss=results[0].UsuNombre;
                   req.session.login=true;
                   res.redirect('bienvenido');
                   
           }
           else{
               console.log("Datos incorrectos");
               res.redirect('/');
           }
       })
   }

/*INICIO LLAMADO DE LOGIN*/
controller.consultalogin=(req,res,next)=>{
    /*  if(req.session.login){  */
      console.log("En ingresar petshop")
      res.render('ingresar')
     /* }
      else{
          res.redirect('/');
      }*/
  }
/*CIERRE LLAMADO DE LOGIN*/

/*INICIO NOSOTROS*/
controller.consultanosotros=(req,res,next)=>{
      console.log("En nosotros petshop")
      res.render('nosotros')
  }
/*CIERRE NOSOTROS*/

/*INICIO PRODUCTOS CLIENTE*/

controller.consultaproductosalimentos=(req,res,next)=>{
   
    cnn.query('SELECT * FROM tbproducto WHERE ProduIdCate=1',(err,resbd)=>{
           if(err){
             next(new Error(err))  
             console.log("Error en la consulta")
           }
           else{
               console.log(resbd)
               res.render('alimento',{datos:resbd});
           }
    }) 
    
}

controller.consultaproductosjuguetes=(req,res,next)=>{
   
    cnn.query('SELECT * FROM tbproducto WHERE ProduIdCate=2',(err,resbd)=>{
           if(err){
             next(new Error(err))  
             console.log("Error en la consulta")
           }
           else{
               console.log(resbd)
               res.render('juguete',{datos:resbd});
           }
    }) 
    
}

controller.consultaproductosaccesorio=(req,res,next)=>{
   
    cnn.query('SELECT * FROM tbproducto WHERE ProduIdCate=3',(err,resbd)=>{
           if(err){
             next(new Error(err))  
             console.log("Error en la consulta")
           }
           else{
               console.log(resbd)
               res.render('accesorio',{datos:resbd});
           }
    }) 
    
}

controller.consultaproductosfarmaceutica=(req,res,next)=>{
   
    cnn.query('SELECT * FROM tbproducto WHERE ProduIdCate=4',(err,resbd)=>{
           if(err){
             next(new Error(err))  
             console.log("Error en la consulta")
           }
           else{
               console.log(resbd)
               res.render('farmaceutica',{datos:resbd});
           }
    }) 
    
}

controller.precio=(req,res,next)=>{
    const mm=req.body.maximo;
    const mn=req.body.minimo;
  

    cnn.query('SELECT ProduNombre,ProduPrecio,ProduImagen FROM tbproducto WHERE ProduPrecio>=? AND ProduPrecio <=? ',[mn,mm,],(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            //console.log(resbd)
            res.render('precio',{datos:resbd});
        }
    }) 
}

/*CIERRE PRODUCTOS CLIENTE*/

/*INICIO AGENDAR CITAS */


controller.consultaagendarcita=(req,res,next)=>{
    /*if(req.session.login){*/
        cnn.query('SELECT * FROM tbveterinario',(err,result)=>{
            if(err){
                throw err
            }
            else{
                cnn.query('SELECT * FROM tbservicios',(err,resbb)=>{
                    if(err){
                        throw err
                    }
                    else{
                        res.render('agendarcitas',{tbveterinario:result,tbservicios:resbb})
                        console.log(result)

                    }
                })

            }
        })
   /* }*/

    
}

controller.insertarcitaspri=async(req,res,next)=>{
    const s=req.body.CitaIdServi;
    const m=req.body.CitaIdMasco;
    const v=req.body.CitaDocVeteri;
    const c=req.body.CitaCorreo;
    const t=req.body.CitaTelefo; 
    const h=req.body.CitaHoraAsig; 
    const f=req.body.CitaFechaAsig; 


    console.log(s);
    cnn.query('INSERT INTO tbcita SET?',{CitaIdServi:s,CitaIdMasco:m,CitaDocVeteri:v,CitaCorreo:c,CitaTelefo:t,CitaHoraAsig:h,CitaFechaAsig:f},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('agendarcitas')
        }
    });
    }



    
    controller.consultadatcitaspri=(req,res,next)=>{
        const n=req.body.idmascota;
          cnn.query('SELECT * FROM tbcita WHERE CitaIdMasco=?',[n],(err,resbd)=>{
              if(err){
                next(new Error(err))  
                console.log("Error en la consulta")
              }
              else{
                  console.log(resbd)
                  res.render('consultarcitas',{datos:resbd});
              }
          }) 
       
    }

    controller.cancelarcita=(req,res,next)=>{
        const citl=req.body.cc;
        console.log(citl)
        cnn.query('DELETE FROM tbcita WHERE CitaId="'+citl+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('consultarcitas')
          }
        })
    }

    controller.cancelarcitaintento=(req,res,next)=>{
        const citl=req.body.cc;
        console.log(citl)
        cnn.query('DELETE FROM a1,a2 USING tbcita AS a1 INNER JOIN tbdetallecita AS a2 WHERE a1.CitaId=a2.DetCitaIdCita AND a2.DetCitaIdCita ="'+citl+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('consultarcitas')
          }
        })
    }


/*CIERRE AGENDAR CITAS */

/*INICIO REGISTRAR*/
controller.consultaregistrar=(req,res,next)=>{
    console.log("En registrar petshop")
    res.render('regi')
}
/*CIERRE REGISTRAR*/

/*INICIO BIENVENIDO*/
controller.consultabienvenido=(req,res,next)=>{
    /*  if(req.session.login){  */
      console.log("En bienvenido petshop")
      res.render('bienvenido')
     /* }
      else{
          res.redirect('/');
      }*/
  }
/*CIERRE BIENVENIDO*/

/*INICIO PEDIDO*/
controller.consultapedido=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbpedido',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('pedido',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertarpedido=async(req,res,next)=>{
    //console.log(req.body)
    const i=req.body.PedId;
    const p=req.body.PedProveDoc;
    const f=req.body.PedFechaPedido;
    const e=req.body.PedFechaEntrega;

    console.log(i,p);
    cnn.query('INSERT INTO tbpedido SET?',{PedId:i,PedProveDoc:p,PedFechaPedido:f,PedFechaEntrega:e},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('pedido')
        }
    });
    }
/*CIERRE PEDIDO*/

/*INICIO PROVEEDOR*/
controller.consultaproveedor=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbproveedor',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('proveedor',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertarproveedor=async(req,res,next)=>{
    //console.log(req.body)
    const d=req.body.ProveDoc;
    const t=req.body.ProveTipoDoc;
    const u=req.body.ProveUsuDoc;
    const n=req.body.ProveNombre;
    const a=req.body.ProveApellido;
    const i=req.body.ProveDireccion;


    console.log(d,u);
    cnn.query('INSERT INTO tbproveedor SET?',{ProveDoc:d,ProveTipoDoc:t,ProveUsuDoc:u,ProveNombre:n,ProveApellido:a,ProveDireccion:i},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('proveedor')
        }
    });
    }
/*CIERRE PROVEEDOR*/

/*INICIO SERVICIOS*/
controller.consultaservicios=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbservicios',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('servicios',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertarservicios=async(req,res,next)=>{
    //console.log(req.body)
    const i=req.body.ServiId;
    const n=req.body.ServiNombre;
       
    console.log(i,n);
    cnn.query('INSERT INTO tbservicios SET?',{ServiId:i,ServiNombre:n},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('servicios')
        }
    });
    }

    controller.eliminarservicios=(req,res,next)=>{
        const idl=req.body.ii;
        console.log(idl)
        cnn.query('DELETE FROM tbservicios WHERE ServiId="'+idl+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('veterinario')
          }
        })
    }
/*CIERRE SERVICIOS*/

/*INICIO USUARIOS*/
controller.consultausuarios=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbusuario',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('usuarios',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertarusuarios=async(req,res,next)=>{
    //console.log(req.body)
    const d=req.body.UsuDoc;
    const t=req.body.UsuTipoDoc;
    const n=req.body.UsuNombre;
    const a=req.body.UsuApellido;
    const u=req.body.UsuUsuario;
    const p=req.body.UsuContraseña;
    const r=req.body.UsuRol;
    const password=await bcryptjs.hash(p,8)

    
    console.log(d,u);
    cnn.query('INSERT INTO tbusuario SET?',{UsuDoc:d,UsuTipoDoc:t,UsuNombre:n,UsuApellido:a,UsuUsuario:u,UsuContraseña:password,UsuRol:r},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('usuarios')
        }
    });
    }

    controller.actualizarusuarios=async(req,res,next)=>{
        const dox=req.body.dd;
        const tix=req.body.tt;
        const nox=req.body.nn;
        const apx=req.body.aa;
        const usx=req.body.uu;
        const cox=req.body.pp;
        const rox=req.body.rr;
        const password=await bcryptjs.hash(cox,8)
          
        cnn.query('UPDATE tbusuario set UsuTipoDoc="'+tix+'",UsuNombre="'+nox+'",UsuApellido="'+apx+'",UsuUsuario="'+usx+'",UsuContraseña="'+password+'",UsuRol="'+rox+'" WHERE UsuDoc="'+dox+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('usuarios')
            }
        })
    }

    controller.eliminarusuarios=(req,res,next)=>{
        const dol=req.body.dd;
      
        cnn.query('DELETE from tbusuario WHERE UsuDoc="'+dol+'"', async(err,respbb)=>{
      
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('usuarios')
          }
        })
    }
/*CIERRE USUARIOS*/

/*INICIO CATEGORIA*/
controller.consultacategoria=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbcategoria',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('categoria',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertarcategoria=async(req,res,next)=>{
    //console.log(req.body)
    const i=req.body.CateId;
    const c=req.body.CateNombre;
    		
    									
    console.log(i,c);
    cnn.query('INSERT INTO tbcategoria SET?',{CateId:i,CateNombre:c},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('categoria')
        }
    });
    }
/*CIERRE CATEGORIA*/

/*INICIO VETERINARIO*/
controller.consultaveterinario=(req,res,next)=>{
     if(req.session.login){
   
      
       cnn.query('SELECT * FROM tbveterinario',(err,resbd)=>{
           if(err){
             next(new Error(err))  
             console.log("Error en la consulta")
           }
           else{
               console.log(resbd)
               res.render('veterinario',{datos:resbd});
           }
       }) 
      
   }
   else{
       res.redirect('/');
   }
}

controller.insertarveterinario=async(req,res,next)=>{
    const d=req.body.VeteriDoc;
    const t=req.body.VeteriTipoDoc;
    const n=req.body.VeteriNombre;
    const a=req.body.VeteriApellido;
    const c=req.body.VeteriCorreo;
    const e=req.body.VeteriTelefo;
    const s=req.body.VeteriSexo;

    
    console.log(d);
    cnn.query('INSERT INTO tbveterinario SET?',{VeteriDoc:d,VeteriTipoDoc:t,VeteriNombre:n,VeteriApellido:a,VeteriCorreo:c,VeteriTelefo:e,VeteriSexo:s},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('veterinario')
        }
    });
    }

    controller.actualizarveterinario=(req,res,next)=>{
        const dox=req.body.dd;
        const tix=req.body.tt;
        const nox=req.body.nn;
        const apx=req.body.aa;
        const cox=req.body.cc;
        const tex=req.body.ee;
        const sex=req.body.ss;

        cnn.query('UPDATE tbveterinario set VeteriTipoDoc="'+tix+'",VeteriNombre="'+nox+'",VeteriApellido="'+apx+'",VeteriCorreo="'+cox+'",VeteriTelefo="'+tex+'",VeteriSexo="'+sex+'" WHERE VeteriDoc="'+dox+'"', async(err,respbb)=>{

            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('veterinario')
            }
        })
    }

    controller.eliminarveterinario=(req,res,next)=>{
        const dol=req.body.dd;
        console.log(dol)
        cnn.query('DELETE FROM tbveterinario WHERE VeteriDoc="'+dol+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('veterinario')
          }
        })
    }
/*CIERRE VETERINARIO */

/*INICIO CITAS*/
controller.consultacita=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbcita',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('cita',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertarcitas=async(req,res,next)=>{
    //console.log(req.body)
    //const i=req.body.CitaId;
    const s=req.body.CitaIdServi;
    const m=req.body.CitaIdMasco;
    const v=req.body.CitaDocVeteri;
    const c=req.body.CitaCorreo;
    const t=req.body.CitaTelefo; 
    const h=req.body.CitaHoraAsig; 
    const f=req.body.CitaFechaAsig; 


    console.log(s);
    cnn.query('INSERT INTO tbcita SET?',{CitaIdServi:s,CitaIdMasco:m,CitaDocVeteri:v,CitaCorreo:c,CitaTelefo:t,CitaHoraAsig:h,CitaFechaAsig:f},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('cita')
        }
    });
    }



    controller.actualizarcitas=(req,res,next)=>{
        const cix=req.body.ii;
        const sex=req.body.ss;
        const max=req.body.mm;
        const vex=req.body.vv;
        const cox=req.body.cc;
        const tex=req.body.tt;
        const hox=req.body.hh;
        const fex=req.body.ff;
     
      
          
        cnn.query('UPDATE tbcita set CitaIdServi="'+sex+'",CitaIdMasco="'+max+'",CitaDocVeteri="'+vex+'",CitaCorreo="'+cox+'",CitaTelefo="'+tex+'",CitaHoraAsig="'+hox+'",CitaFechaAsig="'+fex+'"  WHERE CitaId="'+cix+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                
                res.redirect('cita')
            }
        })
    }

    controller.eliminarcitas=(req,res,next)=>{
        const citl=req.body.cc;
        console.log(citl)
        cnn.query('DELETE FROM tbcita WHERE CitaId="'+citl+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('cita')
          }
        })
    }

/*CIERRE CITAS*/

/*INICIO DETALLE CITAS*/
controller.consultadetallecita=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbdetallecita',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('detallecita',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertardetallecita=async(req,res,next)=>{
    const c=req.body.DetCitaId;
    const i=req.body.DetCitaIdServi;
    const d=req.body.DetCitaIdCita;

    
    console.log(i,d);
    cnn.query('INSERT INTO tbdetallecita SET?',{DetCitaId:c,DetCitaIdServi:i,DetCitaIdCita:d},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('detallecita')
        }
    });
    }

    controller.eliminardetallecita=(req,res,next)=>{
        const citl=req.body.cc;
        console.log(citl)
        cnn.query('DELETE FROM tbdetallecita WHERE DetCitaId="'+citl+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('detallecita')
          }
        })
    }
/*CIERRE DETALLE CITA*/

/*INICIO DETALLE PEDIDO*/
controller.consultadetallepedido=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbdetallepedido',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('detallepedido',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertardetallepedido=async(req,res,next)=>{
    //console.log(req.body)
    const i=req.body.DetPedId;
    const p=req.body.DetPedIdPed;
    const r=req.body.DetPedIdProdu;
    const n=req.body.DetPedNombreArti;
    const u=req.body.DetPedUnidadesArti;
    const e=req.body.DetPedPrecioporUni;
    const t=req.body.DetPedPrecioTotalProdu;
    const c=req.body.DetPedCostoTotalPed;
    const v=req.body.DetPedCostoEnvio;

    									
    console.log(i);
    cnn.query('INSERT INTO tbdetallepedido SET?',{DetPedId:i,DetPedIdPed:p,DetPedIdProdu:r,DetPedNombreArti:n,DetPedUnidadesArti:u,DetPedPrecioporUni:e,DetPedPrecioTotalProdu:t,DetPedCostoTotalPed:c,DetPedCostoEnvio:v},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('detallepedido')
        }
    });
    }
/*CIERRE DETALLE PEDIDO*/

/*INICIO DUEÑO*/
controller.consultadueño=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbdueño',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('dueno',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}

controller.insertardueño=async(req,res,next)=>{
    const d=req.body.DueDoc;
    const t=req.body.DueTipoDoc;
    const n=req.body.DueNombre;
    const a=req.body.DueApellido;
    const c=req.body.DueCorreo;
    const e=req.body.DueriTelefo;
    const s=req.body.DueSexo;

    
    console.log(d);
    cnn.query('INSERT INTO tbdueño SET?',{DueDoc:d,DueTipoDoc:t,DueNombre:n,DueApellido:a,DueCorreo:c,DueriTelefo:e,DueSexo:s},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('dueno')
        }
    });
    }

    controller.insertardueñopri=async(req,res,next)=>{
        const d=req.body.DueDoc;
        const t=req.body.DueTipoDoc;
        const n=req.body.DueNombre;
        const a=req.body.DueApellido;
        const c=req.body.DueCorreo;
        const e=req.body.DueriTelefo;
        const s=req.body.DueSexo;
    
        
        console.log(d);
        cnn.query('INSERT INTO tbdueño SET?',{DueDoc:d,DueTipoDoc:t,DueNombre:n,DueApellido:a,DueCorreo:c,DueriTelefo:e,DueSexo:s},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
                //console.log(resbd);
                res.redirect('regi')
            }
        });
        }    

    controller.actualizardueno=async(req,res,next)=>{
        const dox=req.body.dd;
        const tix=req.body.tt;
        const nox=req.body.nn;
        const apx=req.body.aa;
        const cox=req.body.cc;
        const tex=req.body.ee;
        const sex=req.body.ss;
          
        cnn.query('UPDATE tbdueño set DueTipoDoc="'+tix+'",DueNombre="'+nox+'",DueApellido="'+apx+'",DueCorreo="'+cox+'",DueriTelefo="'+tex+'",DueSexo="'+sex+'" WHERE DueDoc="'+dox+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('dueno')
            }
        })
    }

    controller.eliminardue=(req,res,next)=>{
        const dol=req.body.dd;
        console.log(dol)
        cnn.query('DELETE FROM tbdueño WHERE DueDoc="'+dol+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('dueno')
          }
        })
    }
/*CIERRE DUEÑO*/

/*INICIO INSUMOS*/
controller.consultainsumos=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbinsumos',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('insumos',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
 }

 controller.insertarinsumos=async(req,res,next)=>{
    //console.log(req.body)
    const i=req.body.InsuId;
    const p=req.body.InsuIdProdu;
    const s=req.body.InsuIdServiUsado;
    const n=req.body.InsuNombre;
    const f=req.body.InsuFechaUsado;
       
    console.log(i,p);
    cnn.query('INSERT INTO tbinsumos SET?',{InsuId:i,InsuIdProdu:p,InsuIdServiUsado:s,InsuNombre:n,InsuFechaUsado:f},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('insumos')
        }
    });
    }

    controller.actualizarinsumos=(req,res,next)=>{
        const idx=req.body.ii;
        const ipx=req.body.pp;
        const isx=req.body.ss;
        const nox=req.body.nn;
        const fex=req.body.ff;
          
        cnn.query('UPDATE tbinsumos set InsuIdProdu="'+ipx+'",InsuIdServiUsado="'+isx+'",InsuNombre="'+nox+'",InsuFechaUsado="'+fex+'" WHERE InsuId="'+idx+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('insumos')
            }
        })
    }
/*CIERRE INSUMOS*/

/*INICIO MASCOTA*/
controller.consultamascota=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbmascota',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('mascota',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  } 
}

controller.insertarmascotas=async(req,res,next)=>{
    //console.log(req.body)
    //const i=req.body.MascoId;
    const d=req.body.MascoDocDue;
    const n=req.body.MascoNombre;
    const c=req.body.MascoClase;
    const r=req.body.MascoRaza;
    const p=req.body.MascoPeso; 


    console.log(d);
    cnn.query('INSERT INTO tbmascota SET?',{MascoDocDue:d,MascoNombre:n,MascoClase:c,MascoRaza:r,MascoPeso:p},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('mascota')
        }
    });
    }

    controller.insertarmascotaspri=async(req,res,next)=>{
        const d=req.body.MascoDocDue;
        const n=req.body.MascoNombre;
        const c=req.body.MascoClase;
        const r=req.body.MascoRaza;
        const p=req.body.MascoPeso; 
    
    
        console.log(d);
        cnn.query('INSERT INTO tbmascota SET?',{MascoDocDue:d,MascoNombre:n,MascoClase:c,MascoRaza:r,MascoPeso:p},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
                //console.log(resbd);
                res.redirect('regi')
            }
        });
        }    

    
    controller.actualizarmascotas=(req,res,next)=>{
        const idx=req.body.ii;
        const dox=req.body.dd;
        const nox=req.body.nn;
        const clx=req.body.cc;
        const rax=req.body.rr;
        const pex=req.body.pp;
        
          
        cnn.query('UPDATE tbmascota set MascoDocDue="'+dox+'",MascoNombre="'+nox+'",MascoClase="'+clx+'",MascoRaza="'+rax+'",MascoPeso="'+pex+'"  WHERE MascoId="'+idx+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('mascota')
            }
        })
    }

    controller.eliminarmascotas=(req,res,next)=>{
        const idl=req.body.ii;
        console.log(idl)
        cnn.query('DELETE FROM tbmascota WHERE MascoId="'+idl+'"', (err,respbb)=>{
            console.log("aqui")
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('mascota')
          }
        })
    }

    controller.consultadatmascopri=(req,res,next)=>{
        
        const n=req.body.numeroidentidad;
         
          cnn.query('SELECT * FROM tbmascota WHERE MascoDocDue=?',[n],(err,resbd)=>{
              if(err){
                next(new Error(err))  
                console.log("Error en la consulta")
              }
              else{
                  console.log(resbd)
                  res.render('consultarmasco',{datos:resbd});
              }
          }) 
       
    }
/*CIERRE MASCOTA*/

/*INICIO PRODUCTO*/
controller.consultaproducto=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbproducto',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('producto',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  }
}
/*
controller.insertarproducto=async(req,res,next)=>{
    //console.log(req.body)
    const i=req.body.ProduId;
    const c=req.body.ProduIdCate;
    const m=req.body.ProduMarca;
    const p=req.body.ProduPrecio;
    const d=req.body.ProduUniDisponibles;
    		
    									
    console.log(i);
    cnn.query('INSERT INTO tbproducto SET?',{ProduId:i,ProduIdCate:c,ProduMarca:m,ProduPrecio:p,ProduUniDisponibles:d},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('producto')
        }
    });
    }
*/

controller.insertarproducto=async(req,res,next)=>{
    uploads.single('ProduImagen')(req,res,function(err){
        console.log(req.file)
        const i=req.body.ProduId;
        const c=req.body.ProduIdCate;
        const m=req.body.ProduNombre;
        const p=req.body.ProduPrecio;
        const d=req.body.ProduUniDisponibles;
        const imagen = '../ima/imagenesproductos/'+ req.file.filename
                
                                            
        console.log(i);
        cnn.query('INSERT INTO tbproducto SET?',{ProduId:i,ProduIdCate:c,ProduNombre:m,ProduPrecio:p,ProduUniDisponibles:d,ProduImagen:imagen},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
                //console.log(resbd);
                res.redirect('producto')
            }
        });
    })
    //console.log(req.body)
    }



    controller.actualizarproducto=(req,res,next)=>{
        const idx=req.body.ii;
        const cax=req.body.cc;
        const max=req.body.mm;
        const prx=req.body.pp;
        const dix=req.body.dd;
          
        cnn.query('UPDATE tbproducto set ProduIdCate="'+cax+'",ProduNombre="'+max+'",ProduPrecio="'+prx+'",ProduUniDisponibles="'+dix+'" WHERE ProduId="'+idx+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('producto')
            }
        })
    }
/*CIERRE PRODUCTO*/

/*INICIO VENTAS*/
controller.consultaventas=(req,res,next)=>{
    if(req.session.login){
  
     
      cnn.query('SELECT * FROM tbventas',(err,resbd)=>{
          if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
          }
          else{
              console.log(resbd)
              res.render('ventas',{datos:resbd});
          }
      }) 
     
  }
  else{
      res.redirect('/');
  } 
}

controller.insertarventas=async(req,res,next)=>{
    
    const i=req.body.VenId;
    const p=req.body.VenIdProdu;
    const n=req.body.VenNombreProdu;
    const f=req.body.VenFechaVen;
    
    console.log(i,n);
    cnn.query('INSERT INTO tbventas SET?',{VenId:i,VenIdProdu:p,VenNombreProdu:n,VenFechaVen:f},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('ventas')
        }
    });
    }

    controller.actualizarventa=async(req,res,next)=>{
        const idx=req.body.vv;
        const idpx=req.body.ii;
        const nopx=req.body.nn;
        const fex=req.body.ff;

        cnn.query('UPDATE tbventas set VenIdProdu="'+idpx+'",VenNombreProdu="'+nopx+'",VenFechaVen="'+fex+'" WHERE VenId="'+idx+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('ventas')
            }
        })
    }
/*CIERRE VENTAS*/

controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
}

module.exports=controller;