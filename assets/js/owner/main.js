
/*::::::::::::::::::::::::::::::
	Codigo de Juan Palma
::::::::::::::::::::::::::::::*/
const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;



function iniciar() {
	//Animaciones GSAP
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(ScrollToPlugin);

	//Cortar java para pruebas o ajustes
	// const loadingBox = document.getElementById("loadingBox");
	// if(loadingBox){
	// 	gsap.to(loadingBox, {
	// 		duration: 0.3,
	// 		opacity: 0,
	// 		display: "none"
	// 	});
	// 	document.body.style.overflow = "auto";
	// }
	// return;

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






	//Funciones para habilitar el menu mobile
	function btnMobileActive(e) {
		this.classList.toggle('activo');
	}
	const btnMobile = document.getElementById('menuBoxMobile');
	btnMobile.addEventListener('click', btnMobileActive);


	//Animacion y control de submenus
	const botonMenu = document.getElementById("servicioBtn");
	let submenus = gsap.utils.toArray(".submenu1Box a");
	if(submenus){
		const sumN = submenus.length;
		let submenuAbierto = false;

		submenus.forEach(s => {
			const medidas = s.getBoundingClientRect();
			s.medidas = medidas;
			s.style.display = 'none';
		});

		const timeline = gsap.timeline({ paused: true });
		botonMenu.addEventListener("click", () => {
			if (submenuAbierto) {
				timeline.reverse();
			} else {
				submenus.forEach((elemento) => {
				gsap.set(elemento, { rotation: 0 }); // Restablece la rotación antes de la animación
				});
				
				timeline.clear(); // Limpia la línea de tiempo existente
				
				timeline.to(submenus, {
					y: (index, s) => ((sumN - 1 - index) * (s.medidas.height + 8) + 24),
					duration:0.45,
					rotation: () => gsap.utils.random(-4, 4),
					autoAlpha: 1,
					display:"block",
					ease: "power4.ease.inOut",
					stagger:0.20
				});
				
				timeline.play();
			}
			submenuAbierto = !submenuAbierto;
		});


		// timeline.to(submenus, {
		// 	y: (index, s) => ((sumN - 1 - index) * (s.medidas.height + 8) + 24),
		// 	duration:0.45,
		// 	rotation: () => gsap.utils.random(-4, 4),
		// 	autoAlpha: 1,
		// 	display:"block",
		// 	ease: "power4.ease.inOut",
		// 	stagger:0.20
		// });

		// document.getElementById("servicioBtn").addEventListener("click", () => {
		// 	if (submenuAbierto) {
		// 		timeline.reverse();
		// 	} else {
		// 		submenus.forEach((elemento) => {
		// 			gsap.set(elemento, { rotation: 0 }); // Restablece la rotación antes de la animación
		// 		});
		// 		timeline.play();
		// 	}
		// 	submenuAbierto = !submenuAbierto;
		// });
	}
	






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
						scrollTo: { y: target, offsetY: 100 },
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
			if(document.getElementById("pantalla1").getElementsByTagName('button').length > 0) {
				document.getElementById("pantalla1").getElementsByTagName('button')[0].classList.add("mobileAnimado");
			}
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
			// backgroundColor: "#100035",
			ease:"none",
			duration:4
		}, 1.5);

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

		pantallasTL.add(pantalla3TL, "-=3");

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
		// for (let i = 0; i < columnsLength; i++) {
		columns.forEach((c, i) => {
			const column = c;
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
		});
	};






	const gastaMenosResplandor = document.querySelector('#gastaMenos .capsula .boxG .resplandor');
	if(gastaMenosResplandor){
		let gmtTw = gsap.to(gastaMenosResplandor, {
			scale:0.8,
			duration:2.5,
			ease: 'power2.out',
			repeat:-1,
			runBackwards:true,
			yoyo:true
		});
		// function startAnimation() {
		// 	const tl = gsap.timeline({ onComplete: startAnimation });
		  
		// 	tl.to('#gastaMenos .capsula .boxG .resplandor', {
		// 	  duration: 2.5,
		// 	  scale: 0.8,
		// 	  ease: 'power2.in'
		// 	})
		// 	.to('#gastaMenos .capsula .boxG .resplandor', {
		// 	  duration: 2.5,
		// 	  scale: 1,
		// 	  ease: 'power2.out'
		// 	})
		// 	.to({}, { duration: 6 });
		// }
		// startAnimation();
	};
	






	// Efecto botones duda gradiente
	const btnsGradient = gsap.utils.toArray('#dudas .dudasBTN');
	const btnGradientTLs = {};
	
	btnsGradient.forEach((btn, i) => {
		let tl = btnGradientTLs[`btn${i}`];
		tl = gsap.timeline({ paused: true });
		
		
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







	//Animacion de gito de tarjeta
	let cards = gsap.utils.toArray('.cardAniG .cardCapsul');
	cards.forEach(c => {
		// let animateCard = gsap.timeline({paused:true});
		// animateCard.to(".cardAniG .cardAni", {
		// 	rotationY:"180deg",
		// 	duration:1,
		// 	ease: "back.out"
		// });

		// ScrollTrigger.observe({
		// 	target: c,
		// 	type: "touch, pointer",
		// 	onClick:() => {
		// 		if (animateCard.reversed()) {
		// 			animateCard.play();
		// 		} else {
		// 			animateCard.reverse();
		// 		}
		// 	  },
		// 	onHover: () => animateCard.play(),
		// 	onHoverEnd: () => animateCard.reverse(),
		// 	// onPress: () => animateCard.play(),
		// 	// onRelease: () => animateCard.reverse()
		// });


		const cardAni = c.querySelector(".cardAni");
		gsap.to(cardAni, {
			scrollTrigger:{
				trigger:cardAni,
				start: "center 75%",
				end: "bottom bottom",
				toggleActions:"restart none reverse none",
				// markers:true
			},
			rotationY:"180deg",
			duration:1,
			ease: "back.out"
		});
	});






	// animacion basica de entrada fade
	let basicAniFade = gsap.utils.toArray('.idaAniFade');
	basicAniFade.forEach((f) => {
		const direccion = f.dataset.direccion && f.dataset.direccion !== "" ? f.dataset.direccion : "izquierda";
		const duracion = f.dataset.duracion && f.dataset.duracion !== "" ? f.dataset.duracion : 0.65;
		const distancia = f.dataset.distancia && f.dataset.distancia !== "" ? f.dataset.distancia : 68;
		const retrasoGrupo = f.dataset.retrasoGrupo && f.dataset.retrasoGrupo !== "" ? f.dataset.retrasoGrupo : 0.15;
		const retraso = f.dataset.retraso && f.dataset.retraso !== "" ? f.dataset.retraso : 0;

		let propiedad, polaridad, efecto = "to", opacidad = 0;
		switch (direccion) {
			case "derecha":
			case "izquierda":
				propiedad = "x";
				polaridad = direccion == "derecha" ? 1 : -1;
			break;

			case "arriba":
			case "abajo":
				propiedad = "y";
				polaridad = direccion == "arriba" ? -1 : 1;
			break;
		}
		let valor = distancia * polaridad;

		let objeto = f;
		if(f.classList.contains("idaAniFadeGrupo")){
			objeto = f.querySelectorAll("." + f.dataset.grupo);
		};

		// if(f.dataset.sentido && f.dataset.sentido == "invertir"){
		// 	efecto = "to";
		// 	opacidad = 1;
		// 	valor = 0;
		// }
		
		gsap.set(objeto, {
			[propiedad]: valor,
			autoAlpha: 0
		});
		// if(!f.dataset.sentido && f.dataset.sentido !== "invertir"){
		// 	gsap.set(objeto, {
		// 		[propiedad]: valor,
		// 		autoAlpha: 0
		// 	});
		// }
		gsap[efecto](objeto, {
			scrollTrigger:{
				trigger:objeto,
				start: "10% 85%",
				end: "center bottom",
				toggleActions:"restart none reverse none",
				invalidateOnRefresh: true,
				fastScrollEnd: true,
			},
			duration:duracion,
			ease: "power3.ease.inOut",
			[propiedad]: 0,
			autoAlpha: 1,
			delay:retraso,
			stagger:retrasoGrupo
		});

	});
	gsap.to("#pantalla1 .intro", {
		duration:0.65,
		ease: "power3.ease.inOut",
		y: 0,
		autoAlpha: 1
	});








	
	gsap.to('#conviene .fondo figure', {
		yPercent: -50, 
		ease: 'none',
		scrollTrigger: {
			trigger: '#conviene .fondo', 
			start: 'top bottom', 
			end: 'bottom top', 
			scrub: 2, 
			anticipatePin:1,
			invalidateOnRefresh: true,
			fastScrollEnd: true
		}
	});





	let lineasAnimadas = gsap.utils.toArray('.linea');
	lineasAnimadas.forEach(l => {
		gsap.from(l, {
			height:0,
			ease:"power.ease.inOut",
			scrollTrigger: {
				trigger: l,
				start: 'center 70%',
				end: 'center 70%',
				toggleActions:"restart none reverse none",
				fastScrollEnd: true
			}
		});
	});
	









	//codigo para mostrar el sitio despues de que esta cargado
	const loadingBox = document.getElementById("loadingBox");
	if(loadingBox){
		gsap.to(loadingBox, {
			duration: 0.3,
			opacity: 0,
			display: "none"
		});
		document.body.style.overflow = "auto";
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
	baseUrl: baseUrl,
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

