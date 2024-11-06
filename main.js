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
  apiKey: "AIzaSyBcym1i4oAyM2rFmBU_Ipa0vcC7Pdz0dws",
  authDomain: "insan-cemerlang-2e18f.firebaseapp.com",
  projectId: "insan-cemerlang-2e18f",
  storageBucket: "insan-cemerlang-2e18f.appspot.com",
  messagingSenderId: "1096016420480",
  appId: "1:1096016420480:web:87611389fc765e7ddbd065",
  measurementId: "G-DW23S2DXCR"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarBarang() {
  const refDokumen = collection(db, "pkl");
  const kueri = query(refDokumen, orderBy("namaBarang"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggalMasuk: dok.data(). tanggalMasuk,
      namaBarang: dok.data(). namaBarang,
      jumlahBarang: dok.data(). jumlahBarang
    });
  });


  return hasil
}

export async function tambahBarang(tanggalMasuk, namaBarang, jumlahBarang,) {
  try {
    const dokRef = await addDoc(collection(db, 'pkl'), {
      tanggalMasuk: tanggalMasuk,
      namaBarang: namaBarang,
      jumlahBarang: jumlahBarang
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
export async function ubahBarang(docId, tanggalMasuk, namaBarang, jumlahBarang ) {
  await updateDoc(doc(db, "pkl", docId), {
    tanggalMasuk: tanggalMasuk,
    namaBarang: namaBarang,
    jumlahBarang: jumlahBarang,
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilBarang(docId) {
  const docRef = await doc(db, "pkl", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}