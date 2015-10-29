$(document).ready(function(){

  var todoList = document.querySelector( '#todolist' ),
      formunalrio = document.querySelector( 'form' ),
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
        indice = i;
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
  var imprimeUsuarios = (function imprimeUsuarios()
  {
    var txt = "";
    var k=0;
    for(var i = 0; i < listaTareas.length; i++)
    {
      var datosTarea = listaTareas[i].imprime();
      if(datosTarea[1] == false){
        txt += "<li>";
        txt += "<center>"+(datosTarea[0])+"</center>";
        txt += "<span class='edita1' id = 'edita_"+i+"'></span>";
        txt += "<span class='elimina1' id = 'elimina_"+i+"'>";
        txt += "</li>";
      }
      else{
        txt += "<li class='finish'>";
        txt += "<center>"+(datosTarea[0])+"</center>";
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

        listaTareas[ind].finish = true;
        localStorage.setItem("lista", JSON.stringify(listaTareas));
        imprimeUsuarios();
        indEdita = -1; 
        nom_div('nuevatarea').value = "";

      });
      //Eliminar...
      nom_div("elimina_" + i).addEventListener('click', function(event)
      {
        var ind = event.target.id.split("_")[1];
        var idUser = listaTareas[ind].task;
        if(confirm("¿Desea eliminar esta tarea?"))
        {
          ind = buscaIndice(idUser);
          if(ind >= 0)
          {
            listaTareas.splice(ind, 1);
            localStorage.setItem("lista", JSON.stringify(listaTareas));
            indEdita = -1; 
            nom_div('nuevatarea').value = "";
            imprimeUsuarios();
          }
        }
      });
    }
    return imprimeUsuarios;
  })();


  formunalrio.addEventListener( 'submit', function( evento ) {

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
          var nuevaTarea = new tarea(valores,false);
          listaTareas.push(nuevaTarea);
        }
        else
        {
          listaTareas[indEdita].task = valores;
        }

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
    evento.preventDefault();
  }, false);


  function nom_div(div)
  {
    return document.getElementById(div);
  }
});