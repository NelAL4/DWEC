const clases= document.querySelectorAll(".card");

clases.forEach(clase => {
        let linea = document.createElement("p");//dentro del bucle para que se aplique a varios y no solo a uno
        linea.classList.add("duracion")
        //linea.setAttribute("class", "duracion")  
        linea.textContent="Duracion: 20 Horas"
        clase.querySelector(".info").append(linea)
    }
)