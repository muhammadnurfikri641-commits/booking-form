// langkah 1 : ambil elemen html yang akan dipakai 
//

const bagianForm = document.getElementById("bagianForm");
const formBooking = document.getElementById("formBooking");
const bagianInvoice = document.getElementById("bagianInvoice");
const pesanError = document.getElementById("pesanError");

//ambil inputan dari form
const inputNama = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputJumlah= document.getElementById("jumlah");
const inputBerangkat = document.getElementById("berangkat");

//Data paket wisata
const dataPaket = {
    "Bali Escape" : {Durasi : "3 hari 2 malam", malam: 2, harga: 95000000},
    "Bromo Sunrise Trip" : {Durasi : "2 hari 1 malam", malam: 1, harga: 2450000},
    "Raja Ampat" : {Durasi : "4 hari 3 malam", malam: 3, harga: 2590000},
    "Labuan Bajo Explorer" : {Durasi : "3 hari 2 malam", malam: 2, harga: 1500000},
}

//langkah 2
// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}


// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tglBerangkat) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


//langkah 3 : perintah saat isi form

formBooking.addEventListener("submit", function(event){

//cegah halaman reload
    event.preventDefault();

    //ambil isi dari form
    const nama = inputNama.value;
    const paket = inputPaket.value;
    const jumlah = Number(inputJumlah.value);
    const berangkat = inputBerangkat.value;

    //validasi form
    //semua pesan error di array

    const daftarError = [];

    //mengubah string jadi data jawascript 
    const tglBerangkat = new Date(berangkat);

    //tanggal har ini
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    //1. nama : tidak boleh ksong, min 3 kar
    if (nama === ""){
        daftarError.push("Nama pemesan jangan kosong:3")
    } else if (nama.length < 3){
        daftarError.push("Nama pemesan minal 3 huruf kayak ICA")
    }

    //2. paket gak boleh kosong
    if (paket === ""){
        daftarError.push("paket jangan kosong:3")
    }

    //3. jumlah oraang <1 ; jumlah orang minimal 1, jumlah orang jangan kosong, jumlah orang > 20 maksimal 20
    if (inputJumlah.value === ""){
        daftarError.push("Yah ghoib")
    } else if (jumlah < 1){
        daftarError.push("Jumlah orang minimal 1")
    } else if (jumlah > 20) {
        daftarError.push("Maks 20")
    }

    //4. Tanggal bener
    if(berangkat === "") {
        daftarError.push("Yah ghoib")
    } else if (tglBerangkat < hariIni){
        daftarError.push("Jangan kemaren bang")
    }

    //push : digunakan untuk menambahkan 1 data ke dalam array


    //error ditampilkan
    if (daftarError.length >0){
        pesanError.innerHTML = daftarError.join("<br>");
        pesanError.classList.remove("d-none")
        return;
    }

    const detail = dataPaket[paket];

    const total = detail.harga * jumlah;
    document.getElementById("outTotal").textContent =
    formatRupiah(total);

    document.getElementById("outNama").textContent = nama
    document.getElementById("outPaket").textContent = paket
    document.getElementById("outBerangkat").textContent = formatTanggal(berangkat);
    document.getElementById("outDurasi").textContent = detail.Durasi;

    bagianForm.classList.add("d-none");
    bagianInvoice.classList.remove("d-none")

});




