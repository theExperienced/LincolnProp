////////////////PARALLAX

gsap.registerPlugin(ScrollTrigger);

gsap.to('.target__bg', {
    scrollTrigger: {
        trigger: '.target',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    },
    opacity: 0
});

gsap.to('.contact__bg-words', {
    scrollTrigger: {
        trigger: '.perks',
        start: 'center 70%',
        // end: 'bottom top',
        scrub: 1.4,

    },
    backgroundPosition: '100% center'
});