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

export async function ambilDaftarpemasukan() {
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
      total: dok.data().total
    });
  });


  return hasil
}

export async function tambahpemasukan(tanggalpemasukan, namakuliner, jumlahstokkuliner, total,) {
  try {
    const dokRef = await addDoc(collection(db, 'pkl'), {
      tanggalpemasukan: tanggalpemasukan,
      namakuliner: namakuliner,
      jumlahstokkuliner: jumlahstokkuliner,
      total: total
    });
    console.log('berhasil menembah pemasukan ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah pemasukan' + e);
  }
}


//fungsi untuk hapus data
export async function hapuspemasukan(docId) {
  await deleteDoc(doc(db, "pkl", docId));
}
//fungsi untuk ubah data
export async function ubahpemasukan(docId, tanggalpemasukan, namakuliner, jumlahstokkuliner,total ) {
  await updateDoc(doc(db, "pkl", docId), {
    tanggalpemasukan: tanggalpemasukan,
    namakuliner: namakuliner,
    jumlahstokkuliner: jumlahstokkuliner,
    total: total,
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilpemasukan(docId) {
  const docRef = await doc(db, "pkl", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}