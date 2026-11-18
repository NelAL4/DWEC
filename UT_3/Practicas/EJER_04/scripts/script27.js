const clasesNormales=[...document.querySelectorAll(".card")].filter(clase => !clase.classList.contains("premium")) 
clasesNormales.forEach(clase => clase.style.border = "2px dotted black")

console.log(clasesNormales);