/* =====================================================================
   hbr-conseil.com : comportements
   ⚠️ Toute modification ici = bumper ?v=AAAAMMJJx dans les pages HTML
   ===================================================================== */

// Retiré tout de suite : la classe .no-js sert de garde-fou pour que les
// éléments à révéler restent visibles si ce fichier ne se charge pas.
document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {

    /* --- Année du copyright ------------------------------------------ */

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* --- En-tête : fond opaque dès qu'on quitte le haut de page ------ */

    const masthead = document.getElementById('masthead');
    if (masthead) {
        const sentinel = document.createElement('div');
        sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
        document.body.prepend(sentinel);

        new IntersectionObserver(([entry]) => {
            masthead.classList.toggle('is-stuck', !entry.isIntersecting);
        }).observe(sentinel);
    }


    /* --- Hero : marque et sous-titre cales a la meme largeur ------------
       La taille de police etant lineaire, une seule mesure suffit : on lit
       la largeur naturelle a une taille de reference, puis on applique le
       rapport. Le CSS porte un repli si ce script ne tourne pas.
       ------------------------------------------------------------------ */

    const brand = document.getElementById('brand');
    const kicker = document.getElementById('kicker');

    if (brand && kicker) {
        const caler = () => {
            const dispo = brand.parentElement.clientWidth;
            if (!dispo) return;

            [brand, kicker].forEach((el) => {
                el.style.fontSize = '100px';
                const naturelle = el.scrollWidth;
                if (!naturelle) { el.style.fontSize = ''; return; }
                // 0.5px de marge : evite qu'un arrondi sous-pixel ne declenche
                // un retour a la ligne malgre le white-space: nowrap.
                el.style.fontSize = ((dispo - 0.5) / naturelle * 100) + 'px';
            });
        };

        caler();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(caler);
        addEventListener('resize', caler);
    }

    /* --- Révélations au défilement ------------------------------------
       Respecte prefers-reduced-motion : dans ce cas on affiche tout
       immédiatement, sans observer quoi que ce soit.
       ------------------------------------------------------------------ */

    const targets = document.querySelectorAll('.reveal');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (still || !('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-in'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach((el) => observer.observe(el));
});
