
/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;



function iniciar() {
	//Animaciones GSAP
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(ScrollToPlugin)


	//Funciones para habilitar el menu mobile
	function btnMobileActive(e) {
		this.classList.toggle('activo');
	}
	const btnMobile = document.getElementById('menuBoxMobile');
	btnMobile.addEventListener('click', btnMobileActive);



	// Animaicion para los enlaces scrollin to del sitio
	const menuLinksScrollingTo = gsap.utils.toArray(".scrollingTo");
	if(menuLinksScrollingTo){
		menuLinksScrollingTo.forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();
				
				let target;
				if (link.tagName === 'BUTTON') {
					target = document.querySelector(link.dataset.href);
				} else if (link.tagName === 'A') {
					target = document.querySelector(link.getAttribute('href'));
				}				
	
				if(target) {
					gsap.to(window, {
						duration: 2,
						scrollTo: { y: target, offsetY: 50 },
						ease: 'power3.inOut'
					});
				}
			});
		});
	}

	



	//activar estilos o efectos para mobile css
	//habilitar funciones para moviles:
	if ((el.mobile = /Mobile/i.test(navigator.userAgent))) {
		if ((el.touch = Modernizr.touchevents)) {
			document.getElementById("pantalla1").getElementsByTagName('button')[0].classList.add("mobileAnimado");
			document.querySelectorAll(".circuloChico").forEach((b) => b.classList.add("mobileAnimado"));
		}
	}


	
	function pantallasAniFunc(){
		let pantallasTL = gsap.timeline({});
		pantallasTL.to("#pantalla1", {
			y: () => `+=${document.getElementById("pantalla1").offsetHeight*-1}`,
			ease:"none",
			duration: 2
		});
		
		pantallasTL.to("#pantalla2", {
			ease:"none",
			duration:4
		}, "<");

		let pantalla3TL = gsap.timeline({});

			pantalla3TL.to("#pantalla3", {
				x: () => `+=${document.getElementById("pantalla3").offsetWidth*-1}`,
				ease:"none",
				duration: 2
			});
			pantalla3TL.to("#pantalla3 .frase", {
				x: () => `+=${document.getElementById("pantalla3").offsetWidth}`,
				ease:"none",
				duration: 2
			}, "<");

		pantallasTL.add(pantalla3TL, "-=2");

		pantallasTL.to({}, {
			duration: 1
		});


		let pantallaBox = document.getElementById("pantallaBox");
		ScrollTrigger.create({
			animation: pantallasTL,
			trigger: pantallaBox,
			pin:true,
			anticipatePin:1,
			scrub:2,
			start:"top top",
			end: () => document.getElementById("pantallaBox").offsetHeight,
			invalidateOnRefresh: true,
			fastScrollEnd: true
			// markers:true
		});
	}
	pantallasAniFunc();

	function updateAnimations() {
		// // Asegúrate de que las animaciones y ScrollTriggers existan antes de intentar matarlas
		// if (pantalla3TL) {
		// 	pantalla3TL.kill();
		// }
		// if (pantallasTL) {
		// 	pantallasTL.kill();
		// }
		// ScrollTrigger.getAll().forEach(st => {console.log('señal en el array'); st.kill()});

		// //Reiniciar animaciones
		// pantallasAniFunc();
	
		// Refrescar ScrollTriggers para asegurarse de que todo esté sincronizado
		ScrollTrigger.sort();
		ScrollTrigger.refresh();
	}

	function updatePantallaStyle() {
		//document.getElementById('pantalla2').style.transform = `translateY(-${document.getElementById('pantalla1').offsetHeight}px)`;
	}

	//window.addEventListener('resize', debounce(updateAnimations, 250));
	window.addEventListener('orientationchange', debounce(updateAnimations, 250));
	//window.addEventListener('resize', debounce(updateAnimations, 250));
	// window.addEventListener('resize', debounce(updatePantallaStyle, 250));






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
							delay: 7,
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







	function startAnimation() {
		const tl = gsap.timeline({ onComplete: startAnimation });
	  
		tl.to('#gastaMenos .capsula .boxG .resplandor', {
		  duration: 2.5,
		  scale: 0.8,
		  ease: 'power2.in'
		})
		.to('#gastaMenos .capsula .boxG .resplandor', {
		  duration: 2.5,
		  scale: 1,
		  ease: 'power2.out'
		})
		.to({}, { duration: 6 });
	}
	startAnimation();






	// Efecto botones duda gradiente
	const btnsGradient = gsap.utils.toArray('#dudas .dudasBTN');
	const btnGradientTLs = {};
	
	btnsGradient.forEach((btn, i) => {
		btnGradientTLs[`btn${i}`] = gsap.timeline({ paused: true });
		const tl = btnGradientTLs[`btn${i}`];
		
		tl.to(btn, {
			duration: 0.5,
			backgroundImage: 'linear-gradient(37deg, rgba(93,41,255,1) 34%, rgba(0,231,255,1) 90%)',
			ease: 'power2.out'
		});
	
		ScrollTrigger.observe({
			target: btn, 
			type: "pointer",
			onHover: () => tl.play(),
			onHoverEnd: () => tl.reverse()
		});
	});
	







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

	

}










//Colocacion de correo con cierto nivel de seguridad
function openMailer(event) {
	event.preventDefault();

	var url = encodeURIComponent(destinatario = atob("aG9sYUB2ZW50b21hcXVpYS5jb20="));
	window.location.href = "mailto:" + url;
}









// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: {
		a: "../animaciones",
		l: "../librerias",
		n: "/node_modules",
		"gsap": "https://cdn.jsdelivr.net/npm/gsap@3.11.0/dist/gsap.min",
		"ScrollTrigger": "https://cdn.jsdelivr.net/npm/gsap@3.11.0/dist/ScrollTrigger.min",
		"ScrollToPlugin": "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/ScrollToPlugin.min"
	},
	shim: {
        'ScrollTrigger': {
            deps: ['gsap']
        },
		'ScrollToPlugin': {
            deps: ['gsap']
        }
    }
});
requirejs(["l/modernizr", "l/precarga", "validaciones", "alertas", "peticiones", "l/brands.min", "l/solid.min", "l/fontawesome", "gsap", "ScrollTrigger", "ScrollToPlugin"], iniciar);

