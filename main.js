import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwZk_BSxdm6_VJsVPI2Ne8S3RO5pi0-lg",
  authDomain: "paisal-abret.firebaseapp.com",
  projectId: "paisal-abret",
  storageBucket: "paisal-abret.appspot.com",
  messagingSenderId: "368318578592",
  appId: "1:368318578592:web:491e88e8b6eee503d72ec5",
  measurementId: "G-7Q534CCZNV"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarBarang() {
  const refDokumen = collection(db, "pkl");
  const kueri = query(refDokumen, orderBy("namakuliner"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggalpemasukan: dok.data(). tanggalpemasukan,
      namakuliner: dok.data(). namakuliner,
      jumlahstokkuliner: dok.data(). jumlahstokkuliner
    });
  });


  return hasil
}

export async function tambahBarang(tanggalpemasukan, namakuliner, jumlahstokkuliner,) {
  try {
    const dokRef = await addDoc(collection(db, 'pkl'), {
      tanggalpemasukan: tanggalpemasukan,
      namakuliner: namakuliner,
      jumlahstokkuliner: jumlahstokkuliner
    });
    console.log('berhasil menembah Barang ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah Barang' + e);
  }
}


//fungsi untuk hapus data
export async function hapusBarang(docId) {
  await deleteDoc(doc(db, "pkl", docId));
}
//fungsi untuk ubah data
export async function ubahBarang(docId, tanggalpemasukan, namakuliner, jumlahstokkuliner ) {
  await updateDoc(doc(db, "pkl", docId), {
    tanggalpemasukan: tanggalpemasukan,
    namakuliner: namakuliner,
    jumlahstokkuliner: jumlahstokkuliner,
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilBarang(docId) {
  const docRef = await doc(db, "pkl", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}