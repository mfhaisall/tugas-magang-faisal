

export default function About() {
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

      
    </div>
  );
}
