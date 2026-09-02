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
