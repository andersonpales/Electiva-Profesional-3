/*1.  Elaborar un script que convierta un x número de galones en litros, 
tener en cuenta que hay 3.7854 litros en un galón.*/

var lit = 3.7854;
var gal = parseInt(prompt("ingrese el numero de galones:"));
var conv = gal*lit;
console.log(gal+" galones son "+conv+" litros");

/* 2. Realizar un script que dada una unidad realice la conversión de:
Grados centígrados a Grados Fahrenheit, de Grados centígrados a Grados Kelvin y viceversa

1ºC= 33.80ºF
1ºC= 274.15K
1ºF= -17.22ºC
1K= -272.15ºC

*/

var c = 0;
var f = 0;
var k = 0;
var convTemp = 0;

console.log("Menu \ 1. centígrados a Fahrenheit \ 2. Fahrenheit a centígrados \ 3. centígrados a Kelvin \ 4. Kelvin a centígrados");

var opc = prompt(" ingrese la opcion");

switch (parseInt(opc)) {
  	
	case 1:
    	c = parseInt(prompt("ingrese la temperatura en grados centigrados:"));
    	f = 33.80;
    	var convTemp = c*f;
    	console.log("Respuesta: "+c+" °C son "+convTemp+" °F");	
    break;
	case 2:
    	f = parseInt(prompt("ingrese la temperatura en grados Fahrenheit:"));
    	c = -17.22;
    	var convTemp = f*c;
    	console.log("Respuesta: "+f+" °F son "+convTemp+" °C");	
    break;
	case 3:
    	c = parseInt(prompt("ingrese la temperatura en centigrados:"));
    	k = 274.15;
    	var convTemp = c*k;
    	console.log("Respuesta: "+c+" °C son "+convTemp+" °K");	
    break;
	case 4:
    	k = parseInt(prompt("ingrese la temperatura en Kelvin:"));
    	c = -272.15;
    	var convTemp = k*c;
    	console.log("Respuesta: "+c+" °C son "+convTemp+" °F");	
    break;
    default: console.log("ingrese una opcion valida");
}

/*3. La gravedad de la Luna ( 1.622) es de alrededor del 17% de la Tierra. escribir un script que calcule su peso efectivo en la Luna. m/s² */

var gTierra = 9.807;
var gLuna = gTierra*0.17;
var masa = alert("ingrese su peso en kg");
var peso = masa*gLuna;
console.log("su peso en la luna es de: "+peso+"kg");


/* 4. Escribir scripts para calcular:
El área de un circulo.
El área de un triángulo.
El área de un cuadrado. */

var circulo = 0;
var triángulo = 0;
var cuadrado = 0;
var area = 0;
var op = 0;

alert("Menu \n 1. Area del circulo \ 2. Area del triángulo \ 3. Area del cuadrado");

var op = prompt(" ingrese la opcion");

switch (parseInt(op)) {
  	
	case 1:
    	circulo = parseInt(prompt("Digite el radio del circulo"));
    	area =(Math.pow(circulo,2))*3.1415;
    	alert("el Area del circulo es: "+area+" cm2");
    break;
	case 2:
    	triángulo = parseInt(prompt("Digite la base")*prompt("Digite la altura"));
    	area = triángulo/2;
    	alert("el Area del triángulo es: "+area+" cm2");
    break;
	case 3:
    	cuadrado = parseInt(prompt("Digite el lado del cuadrado"));
    	area =(Math.pow(cuadrado,2));
    	alert("el Area del cuadrado es: "+area+" cm2");
    break;
	default: console.log("ingrese una opcion valida");
}

/*  Dado un string contar el número de vocales (sin acento) que contiene. */

var text = prompt("digite un texto");
var contador = 0;
for(var i=0;i<text.length;i++) 
{
  if ((text.charAt(i)=='a') || (text.charAt(i)=='e') || (text.charAt(i)=='i') || (text.charAt(i)=='o') || (text.charAt(i)=='u'))
  {
    contador++;
  }
}

alert("el texto: "+text+" tiene "+contador+" vocales");