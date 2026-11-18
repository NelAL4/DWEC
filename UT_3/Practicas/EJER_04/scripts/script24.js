const clases = document.querySelectorAll(".card");
clases.forEach(clase => {
    let segundos=clase.querySelectorAll("h2")
    segundos.forEach(segundo => segundo.textContent=`[CLASE] ${[segundo.textContent]}`)
});
