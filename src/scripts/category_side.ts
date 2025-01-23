export function CategorySide() {
    // Aseguramos que los elementos estén correctamente tipados
    const categoryLinks = document.querySelectorAll<HTMLElement>('.dropdown-item');

    categoryLinks.forEach((link) => {
        link.addEventListener('mouseover', function () {
            // Obtenemos el valor del atributo 'data-target'
            const targetCategory = link.getAttribute('data-target');

            if (targetCategory) {
                // Obtenemos todos los elementos de contenido de categoría
                const allContents = document.querySelectorAll<HTMLElement>('.category-content');
                allContents.forEach((content) => {
                    content.classList.remove('active');
                });

                // Obtenemos el contenido de la categoría correspondiente
                const categoryContent = document.getElementById(`category-content-${targetCategory}`);
                if (categoryContent) {
                    categoryContent.classList.add('active');
                }
            }
        });
    });
}
