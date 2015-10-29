$(document).ready(function(){

  var todoList = document.querySelector( '#todolist' ),
      campo = document.querySelector( '#nuevatarea' );


  listaTareas = [];
  var indEdita = -1; //El índice de Edición...
  //Constructor tarea...
  function tarea(nom_tarea,estado)
  {
    this.task = nom_tarea;
    this.finish = estado;

    this.imprime = function()
    {
      return [
            this.task, 
            this.finish
          ];
    }
  }
  var buscaIndice = function(nom_tarea)
  {
    var indice = -1;
    for(var i in listaTareas)
    { 
      if(listaTareas[i].task === nom_tarea)
      {
        indice = listaTareas[i].id;
        break;
      }
    }
    return indice;
  }


  //Saber si un usuario ya existe, bien por nom_tareaentificación o por e-mail...
  function existeTarea(nom_tarea)
  {
    var existe = 0; //0 Ningún campo existe...
    for(var i in listaTareas)
    {
      //Cédula...
      if(i !== indEdita)
      {
        if(listaTareas[i].task.trim().toLowerCase() === nom_tarea.trim().toLowerCase())
        {
          existe = 1; 
          break;
        }
      }
    }
    return existe;
  } 
  //Para cargar la información de localStorage...
  if(localStorage.getItem("lista"))
  {
    var objTMP = eval(localStorage.getItem("lista"));
    var nom_tarea = estado = "";
    for(var i in objTMP)
    {
      var nom_tarea = objTMP[i].task;
      var estado = objTMP[i].finish;
      var nuevaTarea = new tarea(nom_tarea,estado);
      listaTareas.push(nuevaTarea);
    }
  }
  function imprimeUsuarios()
  {
    var txt = "";
    var k=0;
    for(var i = 0; i < listaTareas.length; i++)
    {
      if(listaTareas[i].finish == false){
        txt += "<li>";
        txt += "<center>"+(listaTareas[i].task)+"</center>";
        txt += "<span class='edita1' id = 'edita_"+i+"'></span>";
        txt += "<span class='elimina1' id = 'elimina_"+i+"'>";
        txt += "</li>";
      }
      else{
        txt += "<li class='finish'>";
        txt += "<center>"+(listaTareas[i].task)+"</center>";
        txt += "<span class='edita2' id = 'edita_"+i+"'></span>";
        txt += "<span class='elimina2' id = 'elimina_"+i+"'>";
        txt += "</li>";
      }
      
    }
    nom_div("todolist").innerHTML = txt;
    //Poner las acciones de editar y eliminar...
    for(var i = 0; i < listaTareas.length; i++)
    {
      
      //Editar...
      nom_div("edita_" + i).addEventListener('click', function(event)
      {
        var ind = event.target.id.split("_")[1];
        var idUser = listaTareas[ind].task;
        ind = buscaIndice(idUser);

        var updateData = {
          "id"        : ind,
          "finish"    : true,
          "field"     : "finish"
        };
        consumeServicios(3, updateData, function(data){
              consumeServicios(1, "", function(data){
                listaTareas = data;
                imprimeUsuarios();
            });
        });

      });
      //Eliminar...
      nom_div("elimina_" + i).addEventListener('click', function(event)
      {
        var ind = event.target.id.split("_")[1];
        var idUser = listaTareas[ind].task;
        if(confirm("¿Desea eliminar esta tarea?"))
        {
          ind = buscaIndice(idUser);

          consumeServicios(4, ind, function(data){
              imprimeUsuarios();
              
              consumeServicios(1, "", function(data){
                listaTareas = data;
                imprimeUsuarios();
            });
          });
        }
      });
    }
    return imprimeUsuarios;
  }


  $('#nuevatarea').keyup(function(e)
  {
    if(e.keyCode == 13)
      {
        if(nom_div('nuevatarea').value === "")
        {
          alert("ingrese una tarea");
          nom_div('nuevatarea').focus();
        }
        else
        {
          valores = nom_div('nuevatarea').value;
          var existeDatos = existeTarea(valores);
          if(existeDatos === 0) //No existe...
          {

            if(indEdita < 0)
            {
              var newToDo = {finish : false, task : valores};
              consumeServicios(2, newToDo, function(data){
                  listaTareas.push(data);
              });
            }
            else
            {
              listaTareas[indEdita].tarea = valores;
            }

            consumeServicios(1, "", function(data){
                listaTareas = data;
                imprimeUsuarios();
            });

            localStorage.setItem("lista", JSON.stringify(listaTareas));
            imprimeUsuarios();
            indEdita = -1; 
            nom_div('nuevatarea').value = "";
          }
          else
          {
            alert("Ya existe la tarea");
            nom_div('nuevatarea').focus();
          }
        }
      }
    });


  function nom_div(div)
  {
    return document.getElementById(div);
  }

  

  var nomServicios = [
                          {
                              servicio  :   "Trae todas las tareas",
                              urlServicio :   "getAllTask",
                              metodo    :   "GET"
                          },
                          {
                              servicio  :   "Crear una nueva tarea",
                              urlServicio :   "createTask",
                              metodo    :   "POST"
                          },
                          {
                              servicio  :   "Editar una tarea",
                              urlServicio :   "updateTask",
                              metodo    :   "PUT"
                          },
                          {
                              servicio  :   "Eliminar Tarea",
                              urlServicio :   "deleteTask",
                              metodo    :   "DELETE"
                          },
                          {
                              servicio  :   "Trae una sola tarea",
                              urlServicio :   "getTask",
                              metodo    :   "GET"
                          }
                      ];

  var consumeServicios = function(tipo, val, callback)
  {
      var servicio = {
                          url   : nomServicios[tipo - 1].urlServicio,
                          metodo  : nomServicios[tipo - 1].metodo,
                          datos   : ""
                      };
      if(tipo === 4 || tipo === 5)
      {
          servicio.url += "/" + val;
      }
      else
      {
          servicio.datos = val !== "" ? JSON.stringify(val) : "";
      }
      //Invocar el servicio...
      $.ajax(
      {
          url     : servicio.url,
          type    : servicio.metodo,
          data    : servicio.datos,
          dataType  : "json",
          contentType: "application/json; charset=utf-8"
      }).done(function(data)
      {
          callback(data);
      });
  };
  consumeServicios(1, "", function(data){
      listaTareas = data;
      imprimeUsuarios();
  });
});