export default function Contact() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      
      <section className="bg-blue-50 p-6 rounded-md shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Tentang PMB UI Madura</h1>
        <p className="text-gray-700 leading-relaxed">
          Penerimaan Mahasiswa Baru (PMB) UI Madura merupakan proses seleksi untuk calon mahasiswa yang ingin melanjutkan pendidikan di Universitas Islam Madura. 
          Kami menyediakan berbagai jalur pendaftaran seperti jalur reguler, prestasi, dan beasiswa. PMB bertujuan memberikan kesempatan terbaik bagi siswa-siswi untuk 
          berkembang di lingkungan kampus yang unggul, islami, dan profesional.
        </p>

        <ul className="mt-4 list-disc list-inside text-gray-800">
          <li>📅 Jadwal Pendaftaran: 1 April – 31 Agustus 2025</li>
          <li>📝 Jalur Seleksi: Reguler, Prestasi, Beasiswa</li>
          <li>📍 Lokasi Kampus: Jl. Raya Panglegur, Pamekasan – Madura</li>
          <li>📞 Kontak: 0812-3456-7890 | info@uimadura.ac.id</li>
        </ul>
      </section>

      <section className="bg-gray-100 p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Hubungi Kami</h2>

        <div className="text-gray-700 space-y-3">
          <p><strong>📍 Alamat:</strong> Jl. Raya Panglegur No. 34, Pamekasan, Madura 69371</p>
          <p><strong>📞 Telepon:</strong> (0324) 123456 / 0812-3456-7890</p>
          <p><strong>📧 Email:</strong> info@uimadura.ac.id</p>
          <p><strong>🌐 Website:</strong> <a href="https://uimadura.ac.id" className="text-blue-600 underline">https://uimadura.ac.id</a></p>
          <p><strong>🕒 Jam Operasional:</strong> Senin - Jumat, 08.00 - 16.00 WIB</p>
        </div>
      </section>
      
    </div>
  );
}
