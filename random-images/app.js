const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

/* ---------------------------------- */
/*           tarih belirleme          */
/* ---------------------------------- */
const outputDate = (() => {
    let currentDate = new Date();
    let date = currentDate.toLocaleDateString();
    let time = currentDate.toLocaleTimeString();
    let currentDateTime = date + " " + time;
    tarih.textContent = currentDateTime;
})

setInterval(outputDate, 1000);

/* ---------------------------------- */
/*         loading calistirma         */
/* ---------------------------------- */
setTimeout(() => {
  loadingDiv.style.display = "none";
  containerDiv.classList.remove("d-none");
  containerDiv.classList.add("d-flex");
  dataPull();
}, 3000);

/* ---------------------------------- */
/*          button a tiklama          */
/* ---------------------------------- */
btn.onclick = () => dataPull();

/* ---------------------------------- */
/*          verileri getirme          */
/* ---------------------------------- */
const dataPull = () => {
    const random = Math.floor(Math.random() * 10) + 1;
    cardDiv.innerHTML = `<img src="./img/loading.gif"/>`;
    fetch(`https://pixabay.com/api/?key=45224779-712f943f3d7c809209751790f&q=landscapes&image_type=photo&pretty=true&per_page=10&page=${random}`)
        .then((res) => {
        if (!res.ok) {
            throw new Error("Veri çekme işlemi");
        }
        return res.json(); // json formatında dondu mu donmedi mi,promise döner 2.then işler
        })
        .then((data) => {
            showImage(data)
        })
        .catch((err) => {
            cardDiv.innerHTML = `<img src="./img/error.gif"/>`;
        });
}

/* ---------------------------------- */
/*       resimleri html ekledik       */
/* ---------------------------------- */
function showImage({hits}) {
    cardDiv.innerHTML = "";
    hits.forEach(({largeImageURL, user}) => {
        cardDiv.innerHTML += `
            <div class="card col-10 col-sm-6 col-lg-4 col-xl-2 p-0" style="height: 320px">
                <div style="height: 200px;" class="mb-3">
                    <img src="${largeImageURL}" class="card-img-top img">
                </div>
                <div class="card-body text-center" style="height: 50px;">
                    <p class="card-text">The user who shares:</p>
                    <p class="text-danger fw-light">${user}</p>
                </div>
            </div>
        `;
    });
}