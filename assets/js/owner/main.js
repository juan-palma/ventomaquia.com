
/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;



function iniciar() {

	//activar estilos o efectos para mobile css
	//habilitar funciones para moviles:
	if ((el.mobile = /Mobile/i.test(navigator.userAgent))) {
		if ((el.touch = Modernizr.touchevents)) {
			document.getElementById("pantalla1").getElementsByTagName('button')[0].classList.add("mobileAnimado");
		}
	}


	//Animaciones GSAP
	gsap.registerPlugin(ScrollTrigger);

	let pantallas, pantallasTL, p1Tw, p3TW, p3Frase;
	function animaciones() {
		pantallas = gsap.utils.toArray(".pantallas");
		pantallasTL = gsap.timeline({
			scrollTrigger: {
				trigger: ".pantallaBox",
				pin: true,
				scrub: 1,
				start: "top top",
				end: "100% top",
				anticipatePin:1,
				invalidateOnRefresh:true,
          		fastScrollEnd: true
			}
		});

		p1Tw = gsap.to(pantallas[0], { 
			// yPercent: "-100",
			y: () => `+=${pantallas[0].offsetHeight*-1}`,
			ease:"none",
		});
		pantallasTL.add(p1Tw);

		pantallas[1].style.transform = `translateY(-${pantallas[0].offsetHeight}px)`;

		p3Frase = gsap.to("#pantalla3 .frase", {x:"0vw", ease:"none", paused:true});
		p3TW = gsap.fromTo(
			pantallas[2],
			{
				// yPercent: "-200",
				// xPercent: "100",
				// y: () => `${ (pantallas[1].offsetHeight + pantallas[0].offsetHeight) * -1 }`,
				y: () => `${ (pantallas[0].offsetHeight) * -1 }`,
				x: () => `${pantallas[2].offsetWidth}`,
			},
			{
				x: "0",
				ease:"none",
				onUpdate: function() {
					p3Frase.progress(this.progress());
				},
			}
		);
		pantallasTL.add(p3TW);

		pantallasTL.to({}, { duration: .25 });
	}
	animaciones();

	function updateAnimations() {
		// Asegúrate de que las animaciones y ScrollTriggers existan antes de intentar matarlas

		// if (pantallasTL) {
		// 	pantallasTL.kill();
		// }
		// if (fraseP3) {
		// 	fraseP3.kill();
		// }
		// if (pantallasTL.scrollTrigger) {
		// 	pantallasTL.scrollTrigger.kill(true);
		// }

		//ScrollTrigger.getAll().forEach(st => {console.log('señal en el array'); st.kill()});
				
		// Reiniciar animaciones
		//animaciones();
	
		// Refrescar ScrollTriggers para asegurarse de que todo esté sincronizado
		ScrollTrigger.sort();
		ScrollTrigger.refresh();
	}

	function updatePantallaStyle() {
		document.getElementById('pantalla2').style.transform = `translateY(-${document.getElementById('pantalla1').offsetHeight}px)`;
	}






	// animacion de logos de marcas
	let columns = gsap.utils.toArray('#marcas .marca');
	let columnsLength = 4;
	if(columns){
		for (let i = 0; i < columnsLength; i++) {
			const column = columns[i];
			const logos = column.querySelectorAll("figure");
			const randomOffset = gsap.utils.random(["-200%", "200%"]);
			const isEven = i % 2 === 0;

			const tl = gsap.timeline({
				repeat: -1,
				delay: -columnsLength + i * 0.2,
			});

			logos.forEach((logo) => {
				tl.to(logo, {
					keyframes: [
						{
							y: isEven ? randomOffset : 0,
							x: isEven ? 0 : randomOffset,
							duration: 0.3,
						},
						{
							autoAlpha: 1,
							x: 0,
							y: 0,
							duration: 0.5,
							ease: "power2.out",
						},
						{
							delay: 3,
							y: isEven ? 0 : randomOffset,
							x: isEven ? randomOffset : 0,
							duration: 0.3,
							ease: "power2.in",
						},
					],
				}).set(logo, {
					autoAlpha: 0,
				});
			});
		}
	}







	// codigo para actualizar animaciones GSAP.
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	//window.addEventListener('resize', debounce(updateAnimations, 250));
	window.addEventListener('resize', debounce(updatePantallaStyle, 250));
	window.addEventListener('orientationchange', debounce(updateAnimations, 250));

}






//codigo para avtivar el correo
const codigo = "";
function openMailer(element) {
	const aMyUTF8Output = base64DecToArr(codigo);
	const mail = UTF8ArrToStr(aMyUTF8Output);
	element.setAttribute("href", mail);
	element.setAttribute("onclick", "");
};







// window.addEventListener('orientationchange', debounce(function() {

// }, 250));


// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules", "gsap": "https://cdn.jsdelivr.net/npm/gsap@3.10.4/dist/gsap.min", "ScrollTrigger": "https://cdn.jsdelivr.net/npm/gsap@3.10.4/dist/ScrollTrigger.min"},
	shim: {
        'ScrollTrigger': {
            deps: ['gsap']
        }
    }
});
requirejs(["l/modernizr", "l/precarga", "validaciones", "alertas", "peticiones", "l/brands.min", "l/solid.min", "l/fontawesome", "l/js_base64", "gsap", "ScrollTrigger"], iniciar);

