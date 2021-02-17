if(window.innerWidth > 500) {
    gsap.registerPlugin(ScrollTrigger);

    //////////////////////// MAIL CTA



    gsap.to('.cta__container', {
        scrollTrigger: {
            trigger: '.perks',
            start: 'bottom bottom',
            toggleActions: 'play none none reverse'
            // pin: true/
        },
        opacity: 0,
        visibility: 'hidden',
        duration: .5
    })
    ////////////////PARALLAX


    // gsap.to('.target__bg', {
    //     scrollTrigger: {
    //         trigger: '.target',
    //         start: 'top bottom',
    //         end: 'bottom top',
    //         scrub: 1
    //     },
    //     opacity: 0
    // });

    // gsap.to('.contact__bg-words', {
    //     scrollTrigger: {
    //         trigger: '.perks',
    //         start: 'center 70%',
    //         // end: 'bottom top',
    //         scrub: 1.4,

    //     },
    //     backgroundPosition: '100% center'
    // });



    //////////////////////HEADER


    gsap.to('.header', {
        scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            end: 'bottom 40%',
            scrub: 1.2,
            // pin: true/
        },
        opacity: 0
    });


    //////////////////////CONTACT


    gsap.from('.contact', {
        scrollTrigger: {
            trigger: '.perks',
            start: '80% bottom',
            end: 'bottom top',
            scrub: 1,
            // pin: true/
        },
        opacity: 0
    });




    // gsap.to('.contact__overlay', {
    //     scrollTrigger: {
    //         trigger: '.perks',
    //         start: 'bottom bottom',
    //         end: 'bottom top',
    //         scrub: true,
    //         // pin: true/
    //     },
    //     opacity: 0,
    //     visibility: 'hidden'
    // });



    // gsap.from('.contact__bg-word', {
    //     scrollTrigger: {
    //         trigger: '.perks',
    //         start: 'bottom bottom',
    //         end: 'bottom top',
    //         scrub: 3,
    //         // pin: true/
    //     },
    //     x: -50,
    //     opacity: 0,
    //     stagger: .05
    // });
}
