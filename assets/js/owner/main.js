
function iniciar() {
	
	gsap.registerPlugin(ScrollTrigger);

	let pantallas, pantallasTL, p1Tw, p3TW, p3Frase;
	function animaciones() {
		console.log('señal');

		pantallas = gsap.utils.toArray(".pantallas");
		pantallasTL = gsap.timeline({
			scrollTrigger: {
				trigger: ".pantallaBox",
				pin: true,
				scrub: 1,
				start: "top top",
				end: "66% top",
				anticipatePin:1,
				invalidateOnRefresh:true,
          		// fastScrollEnd: true
			}
		});

		p1Tw = gsap.to(pantallas[0], { 
			yPercent: "-100",
			ease:"none",
		});
		pantallasTL.add(p1Tw);

		p3Frase = gsap.to("#pantalla3 .frase", {x:"0vw", ease:"none", paused:true});
		p3TW = gsap.fromTo(
			pantallas[2],
			{
				yPercent: "-200",
				xPercent: "100",
			},
			{
				xPercent: "0",
				ease:"none",
				onUpdate: function() {
					p3Frase.progress(this.progress());
				},
			}
		);
		pantallasTL.add(p3TW);

		pantallasTL.to({}, { duration: .25 });
		


		// pantallasTL = gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: ".pantallaBox",
		// 		pin: true,
		// 		scrub: 1,
		// 		start: "top top",
		// 		end: "66% top",
		// 	}
		// });
	
		// p3Frase = gsap.to("#pantalla3 .frase", {x:"0vw", ease:"none", paused:true});
		
		// pantallasTL.addLabel("start").to(pantallas[0], { 
		// 	yPercent: "-100",
		// 	duration: (index) => 0.5 / (index + 1),
		// 	stagger: (index) => 0.48 * (index),
		// 	ease:"none",
		// }).addLabel("lateral").from(pantallas[2], {
		// 	xPercent: "100",
		// 	duration: (index) => 0.5 / (index + 1),
		// 	stagger: (index) => 0.48 * (index),
		// 	ease:"none",
		// 	onUpdate: function() {
		// 		p3Frase.progress(this.progress());
		// 	},
		// });
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

	window.addEventListener('resize', debounce(updateAnimations, 250));

	// window.addEventListener('orientationchange', debounce(function() {
		
	// 	// Restablece o reinicia las animaciones
	// }, 250));

	// window.addEventListener('resize', () => {
	// 	console.log('señal directo');
	// });
}






//codigo para avtivar el correo
const codigo = "";
function openMailer(element) {
	const aMyUTF8Output = base64DecToArr(codigo);
	const mail = UTF8ArrToStr(aMyUTF8Output);
	element.setAttribute("href", mail);
	element.setAttribute("onclick", "");
};




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

