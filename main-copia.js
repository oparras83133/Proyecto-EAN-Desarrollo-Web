//función buscar para filtrar el texto con el alt de las imágenes
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const publicationCards = document.querySelectorAll(".publication-card");

    const buscar = () => {
        const textoBusqueda = searchInput.value.toLowerCase();
        publicationCards.forEach(articulo => {
            const textoContenido = articulo.textContent.toLowerCase();
            const imagen = articulo.querySelector("img");
            const textoAlt = imagen ? imagen.alt.toLowerCase() : "";

            if (textoContenido.includes(textoBusqueda) || textoAlt.includes(textoBusqueda)) {
                articulo.classList.remove("filtro");
            } else {
                articulo.classList.add("filtro");
            }
        });
    };

    searchInput.addEventListener("keyup", e => {
        if (e.key === "Enter") e.target.value = "";
        buscar();
    });

    searchIcon.addEventListener("click", () => {
        buscar();
        searchInput.focus();
    });
});

//función ChangeImage para cambiar las imágenes según onmouseover y onmouseout
function ChangeImage(x, image){
  switch (x){
    case 1:
      image.src="/images/info-ropa-vestido-rojo.png";
    break;

    case 2: 
      image.src="/images/ropa-vestido-rojo.jpg";
    break;

    case 3:
      image.src="/images/info-zapatos-cafe-hombre.png";
    break;

    case 4:
      image.src="/images/zapatos-cafe-hombre.png";
    break;

    case 5:
      image.src="/images/info-accesorio-cinturon-mujer.png";
    break;

    case 6:
      image.src="/images/accesorio-cinturon-mujer.jpg";
    break;

    case 7:
      image.src="/images/info-ropa-chaqueta-negra-hombre.png";
    break;

    case 8:
      image.src="/images/ropa-chaqueta-negra-hombre.png";
    break;
  }
}