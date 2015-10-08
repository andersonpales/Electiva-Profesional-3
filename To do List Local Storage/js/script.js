$(document).ready(function(){

  var todoList = document.querySelector( '#todolist' ),
      formunalrio = document.querySelector( 'form' ),
      campo = document.querySelector( '#nuevatarea' );
    
  formunalrio.addEventListener( 'submit', function( evento ) {
    var texto = campo.value;
    if ( texto !== '' ) {
      todoList.innerHTML += '<li>' + texto + '</li>';
      campo.value = '';
      campo.focus();
    }
    evento.preventDefault();
  }, false);

  todoList.addEventListener( 'click', function( evento ) {
    var t = evento.target;
    if ( t.tagName === 'LI' ) {
      if ( t.classList.contains( 'done' ) ) {
        t.parentNode.removeChild( t );
      } else {  
        t.classList.add( 'done' );
      }
    };
    evento.preventDefault();
  }, false);

});