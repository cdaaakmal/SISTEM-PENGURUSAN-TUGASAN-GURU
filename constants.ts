
import { Teacher, Task, TaskCategory } from './types';

// Processed list of teachers from the provided text, PRESERVING ORDER for hierarchy
const TEACHER_NAMES = [
  "TERMEZI BIN JUSOH", "YUSPANI BIN YUSOF", "MOHD AZRI BIN ISMAIL", "MOHD HAFIZI BIN HAMZAH", "AZIZAN BIN HARUN", 
  "MOHD FADLY BIN THAYIL MAMMI", "WAN RAMLAH BINTI MAMAT", "MASNIZA BINTI AWANG @ ZAKARIA", "NUR IZYANI BINTI IBRAHIM", 
  "ROHAIZAH ROHANA BINTI JUSOH", "MOHD ABDUL AZIZ BIN MOHD GHAZALI", "MOHD RIDWAN BIN RAZALI", "ANNA JULIYANTI BINTI ZAINUDIN", 
  "NURLIANA BINTI ROMLI", "NURUL DIYANA BINTI MAT KASIM", "SUHARNI BT SAMARUDIN", "ADA'YA @ ZAKARIA BIN YASIN", 
  "ANUAR BIN JUSOH", "CHE MOHD SAKIMI BIN CHE HAMID", "WAN NASHRIAH BINTI WAN JUSOH", "WAN NORAZIHAH BINTI WAN IBRAHIM", 
  "MOHAMAD QAYYUM BIN MOHAMAD ROZLAN", "MUHAMMAD FAKHRI BIN RAMLEY", "SAJDAH BINTI EN. AZIZ", "FAIZO BIN ISMAIL", 
  "MUHAMMAD AFIQ BIN CHE LAH", "MUHAMMAD BADRUZZAMAN BIN HASSAN", "AIDAWATI BINTI TAJI MUHAMMAD", "HALISA BINTI MOHD DARUS", 
  "NOR SUZILAINI BINTI HUSAIN", "NOR ZAINE BINTI OTHMAN", "NORAINI BINTI MOHD NOR", "NORAISAH BINTI HASSAN", 
  "NORAZIZAH BINTI JUSOH", "NORHASLIZA BINTI MAT LAZIM", "NUR 'IZZATI BINTI AZIZ", "NUR SHEELLY SUHADA BINTI ABDUL RAZAK", 
  "NURUL FARIZAH BTE ALI", "NURUL NORLAILATUL NADIA BINTI JUHARI", "NURUL SALEHAH BINTI ABDUL WAHAB", "NURULHANI BINTI BAHARUDIN", 
  "RA'ANAH BT HUSAIN", "ROPIZA BINTI HASSAN", "SITI FATIMAH BINTI MOHAMAD ZAID", "SITI NORIHAN BINTI MAT HUSIN", 
  "SUHAILA BINTI SALLEH", "ZAHIDAH BINTI MOHAMAD AMIN", "ABDUL MUN'IM BIN MOHD MANSOR", "AHMAD FA'IZ BIN SHUKERI", 
  "AHMAD FUAD BIN MOHD ZANI", "AHMAD HUSAINI BIN MUSTAPHA KAMIL", "AHMAD NAIM BIN AHMAD LUTFI", "AHMAD NAJMI BIN MAT PIAH", 
  "AHMAD NAJMI BIN YUSOF", "AHMAD TARMIZI BIN CHE HAMID", "CHE FAIZUL AZHAR BIN CHE MAT", "MOHAMAD AIDIL AFIFI BIN LOKMAN", 
  "MOHAMED AYUB BIN GHAZALI", "MOHAMMAD FADHIL ZIKRI BIN BANIYAMI", "MOHAMMAD IKRAM BIN MOHD NOR", "MOHAMMAD NOR HISYAM BIN MOEN", 
  "MOHD AFIZUL BIN MOHD SUHAIMI", "MOHD FARHAN BIN ZA'IM", "MOHD FATHI YAKAN BIN ZAKARIA", "MOHD HAFEZ BIN IBRAHIM @ MUSA", 
  "MOHD HAFIZUDDIN BIN MOHD SIDEK", "MOHD SHAHIRIE BIN ISMAIL", "MOHD SYAHID AL AMIN BIN RAZALI", "MUHAMAD AQILA BIN YUSUF", 
  "MUHAMAD ZULHILMI BIN OTHMAN", "MUHAMMAD AFIQ BIN MD HADZIR", "MUHAMMAD AL AMIN SIDDIK BIN MOHMD NOR", "MUHAMMAD FADHIL BIN SHUIB", 
  "MUHAMMAD HANNAN BIN ABDUL BASIT", "MUHAMMAD MUKHLIS BIN SUHAIMI", "MUHAMMAD SOFUAN BIN ABD RAHIM", "NABIHAN ASYRAF BIN MAHMUD ZUHUDI", 
  "SUFYAN BIN OMAR", "SYAHMI ZAFRAN BIN SAIFUL YAZAN", "ZUL FAKAAR BIN MAT GHANI", "FARHATUL ATHIRAH BINTI ZAINI", "FASIHAH BINTI MOHD PAUZI", 
  "FATIHAH BINTI SALLEH", "HANA THARWAH BINTI ABDUL HADI", "NAHIDAH BINTI MAT NOR", "NAZIHA BINTI YUSOFF", "NIK NURZULAIKHA BINTI NIK ZULKIFLI", 
  "NOOR IZAYATIE BINTI MANSORDIN", "NOR SHOLEHAH BINTI MUHAMMAD ROSDI", "NUR FATHIHA BINTI RUSLI", "NURSHAMIMI BINTI MOHD RADZI", 
  "NURUL AISYAH FATEHA BT AHMAD", "ROSLINA BINTI RAMLI", "SHAFIDA BINTI OSMAN", "SITI AISHAH BINTI MOHD DAUD", "SITI ASMA' BINTI MOHAMED", 
  "SITI FARHANAH BINTI ZAKARIA", "SITI MARIAM BINTI MOHD BADRILLAH", "SITI NAZIHAH BINTI MOHAMAD YUSUF", "SITI NOR ASHMAA' BINTI MOHD HATTA", 
  "SITI NOR AZIZAH BINTI MOHD ALI", "SITI NUR SAKINAH JALILIY BINTI ABDUL MUTTALIB", "SITI SAMIHAH BINTI KHAMARULZAMAN", "SITI SHARAHAH BINTI MOHD SHAFUDDIN", 
  "SUMAYYAH BINTI MOKTAR", "SURIANI BINTI MUHAMED HASSIM", "TAYYIBAH BINTI ABD HALIM", "WAN NORBAINI BINTI WAN ROSLI", 
  "WAN NUR AMIRAH BINTI WAN MOHD GHAZALI", "WAN SALWA BINTI WAN HASSAN", "MOHD ZAWAWI BIN MAT NOOR"
];

// Generate Teachers with sequential IDs
export const INITIAL_TEACHERS: Teacher[] = TEACHER_NAMES.map((name, index) => ({
  id: (index + 1).toString(),
  name: name,
  position: (index === 0 ? 'PENGETUA' : index < 5 ? 'PENOLONG KANAN' : index < 12 ? 'GKMP/KETUA JABATAN' : 'GURU AKADEMIK'),
  department: 'AKADEMIK'
}));

export const AVAILABLE_YEARS = [2026];

// Specific roles requested by user - ALL UPPERCASE
export const TASK_ROLES = [
  "PENYELARAS",
  "PENOLONG PENYELARAS",
  "SETIAUSAHA",
  "PENOLONG SETIAUSAHA",
  "KETUA",
  "PENOLONG",
  "AJK",
  "PENGERUSI", 
  "TIMBALAN PENGERUSI", 
  "NAIB PENGERUSI", 
  "BENDAHARI", 
  "PENGURUS",
  "PEGAWAI ASET",
  "PENOLONG PEGAWAI ASET",
  "YANG DIPERTUA",
  "NAIB YANG DIPERTUA",
  "PENASIHAT",
  "JURU AUDIT",
  "GURU DATA",
  "MENTOR",
  "APPLE TEACHER",
  "LAIN-LAIN"
];

// Raw job scope data - CONVERTED TO UPPERCASE
const RAW_JOB_SCOPE: Record<TaskCategory, string[]> = {
  [TaskCategory.PENTADBIRAN]: [
    "PENGURUSAN TERTINGGI", "MAJLIS TADBIR", "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", 
    "PENGURUSAN KEWANGAN & AKAUN", "PENGURUSAN ASET (JKPA)", "PENGURUSAN FIZIKAL & BILIK KHAS", 
    "BILIK MESYUARAT", "PEJABAT PENTADBIRAN", "BILIK GKMP", "BILIK ICIC", 
    "DEWAN ULUL ALBAB", "DEWAN KULIAH ULUL ALBAB", "BILIK GURU 1 – AKADEMIK (P)", 
    "BILIK GURU 2 - AKADEMIK (L)", "BILIK GURU 3 (KBT P)", "BILIK GURU 4 (SUUA)", 
    "BILIK GURU 5 (KBT L)", "BILIK GURU 6 (KBT L)", "PUSAT SUMBER SEKOLAH", 
    "SURAU AJWAD AJYAD", "BILIK BDK", "KOPERASI / KAFETERIA", "BILIK DISIPLIN", 
    "PEJABAT STOR", "MAKMAL SAINS", "MAKMAL KIMIA", "MAKMAL BIOLOGI", "MAKMAL FIZIK", 
    "MAKMAL KOMPUTER", "BILIK UJIAN SEGAK", "BILIK PEPERIKSAAN", "BILIK SUKAN", 
    "GELANGGANG PERMAINAN", "BENGKEL RBT/ERT", "PERABOT", "BILIK AKSES 1 & 2", 
    "STUDIO", "BILIK MATEMATIK", "LOBI & SPEAKER CORNER", "BILIK GERAKAN MPM", 
    "BILIK NILAM", "BILIK SEMINAR 1 & 2", "BILIK BOSS", "BILIK KEBUDAYAAN", 
    "BILIK KESIHATAN/ISOLASI", "BILIK PSV", "BILIK SEJ & GEOG", "BAS/VAN SEKOLAH", 
    "PENGURUSAN PEJABAT", "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", 
    "SKPM KUALITI @ SEKOLAH (SK@S)", "PENGURUSAN KBAT", "KBAT DALAM KURIKULUM", 
    "KBAT DALAM PEDAGOGI", "KBAT DALAM PENTAKSIRAN", "KBAT DALAM KOKURIKULUM", 
    "KBAT DALAM SOKONGAN KOMUNITI & SWASTA", "KBAT DALAM BINA UPAYA", "KBAT DALAM SUMBER", 
    "KBAT DALAM PERSEKITARAN", "PENINGKATAN PROFESIONALISME & LADAP", "BUKU PENGURUSAN DAN TAKWIM SEKOLAH", 
    "BUKU PENGURUSAN", "TAKWIM SEKOLAH", "PENGURUSAN GURU BERTUGAS", "PENGURUSAN MESYUARAT GURU", 
    "PENGURUSAN DOKUMENTASI", "PENGURUSAN GALERI", "PENGURUSAN KAJIAN TINDAKAN DAN KAJIAN PENYELIDIKAN", 
    "KEBITARAAN SEKOLAH", "BIDANG I : INOVASI", "BIDANG II : HAFAZAN AL-QURAN", 
    "PENGURUSAN ICT", "PROGRAM GURU PENYAYANG", "PENGURUSAN BENCANA", 
    "PERSATUAN IBU BAPA DAN GURU (PIBG)", "PENGLIBATAN IBU BAPA DAN KOMUNITI (PIBK & PIBKS)", 
    "JALINAN & JARINGAN", "BUDAYA ALQURAN", "ECO-SCHOOL", "KELAB WARGA IBEST", 
    "MAJLIS GURU CEMERLANG IBEST", "PENGURUSAN DATA"
  ],
  [TaskCategory.KURIKULUM]: [
    "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "JAWATANKUASA PANITIA MATA PELAJARAN", 
    "BAHASA MELAYU", "KP BAHASA MELAYU", "SETIAUSAHA BAHASA MELAYU", 
    "BAHASA INGGERIS", "KP BAHASA INGGERIS", "SETIAUSAHA BAHASA INGGERIS", 
    "BAHASA MANDARIN", "KP BAHASA MANDARIN", "SEJARAH", "KP SEJARAH", "SETIAUSAHA SEJARAH", 
    "GEOGRAFI", "KP GEOGRAFI", "PENDIDIKAN SENI VISUAL", "KP PENDIDIKAN SENI VISUAL", 
    "SETIAUSAHA PSV", "PENDIDIKAN JASMANI & PENDIDIKAN KESIHATAN", 
    "KP PEN. JASMANI & PEN. KESIHATAN", "SETIAUSAHA PJPK", 
    "SAINS", "KP SAINS", "SETIAUSAHA SAINS", "MATEMATIK", "KP MATEMATIK", "SETIAUSAHA MATEMATIK", 
    "FIZIK", "KP FIZIK", "SETIAUSAHA FIZIK", "KIMIA", "KP KIMIA", "SETIAUSAHA KIMIA", 
    "BIOLOGI", "KP BIOLOGI", "SETIAUSAHA BIOLOGI", "MATEMATIK TAMBAHAN", 
    "KP MATEMATIK TAMBAHAN", "SETIAUSAHA MATEMATIK TAMBAHAN", 
    "REKA BENTUK TEKNOLOGI", "KP REKA BENTUK TEKNOLOGI", "SETIAUSAHA RBT", 
    "PRINSIP AKAUN", "KP PRINSIP AKAUN", "PENDIDIKAN ISLAM", "KP PENDIDIKAN ISLAM", 
    "SETIAUSAHA PENDIDIKAN ISLAM", "BAHASA ARAB", "KP BAHASA ARAB", "SETIAUSAHA BAHASA ARAB", 
    "I’DADI", "KP I’DADI", "SETIAUSAHA I'DADI", "HIFZ AL-QURAN", "KP HIFZ AL-QURAN", 
    "SETIAUSAHA HIFZ AL-QURAN", "MAHARAT AL-QURAN", "KP MAHARAT AL-QURAN", 
    "SETIAUSAHA MAHARAT AL-QURAN", "TURATH AL-QURAN & AL-SUNNAH", "KP TURATH AL-QURAN & AL-SUNNAH", 
    "SETIAUSAHA TURATH AL-QURAN & AL-SUNNAH", "TURATH BAHASA ARAB", "KP TURATH BAHASA ARAB", 
    "SETIAUSAHA TURATH BAHASA ARAB", "TURATH DIRASAT ISLAMIAH", "KP TURATH DIRASAT ISLAMIAH", 
    "SETIAUSAHA TURATH DIRASAT ISLAMIAH", "JAWATANKUASA PENCERAPAN KURIKULUM", 
    "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "JAWATANKUASA PROJEK KECEMERLANGAN AKADEMIK", 
    "PROJEK KECEMERLANGAN SPM", "PROJEK KECEMERLANGAN PRA SPM", "PROJEK KECEMERLANGAN TINGKATAN 3", 
    "PROJEK KECEMERLANGAN TINGKATAN 2", "PROJEK KECEMERLANGAN TINGKATAN 1", 
    "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN AWAM (SPM)", "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", 
    "PENTAKSIRAN BERASASKAN SEKOLAH (PBS)", "PENTAKSIRAN BILIK DARJAH (PBD)", 
    "UJIAN AKHIR SESI AKADEMIK (UASA)", "PENILAIAN SEGAK", "PENTAKSIRAN PAJSK", 
    "PENTAKSIRAN PSIKOMETRIK (PPSi)", "KURIKULUM BERSEPADU TAHFIZ (KBT)", 
    "HIFZ DAN MAHARAT TINGKATAN 1", "HIFZ DAN MAHARAT TINGKATAN 2", "HIFZ DAN MAHARAT TINGKATAN 3", 
    "HIFZ DAN MAHARAT TINGKATAN 4", "HIFZ DAN MAHARAT TINGKATAN 5", 
    "JAWATANKUASA PROGRAM MEMARTABATKAN BAHASA MELAYU DAN MEMPERKUKUHKAN BAHASA INGGERIS (MBMMBI)", 
    "JAWATANKUASA DUAL LANGUAGE PROGRAM (DLP)", "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", 
    "JAWATANKUASA ELEARNING", "DELIMA KPM", "APPLE CLASSROOM", "JAWATANKUASA PUSAT SUMBER & TEKNOLOGI PENDIDIKAN", 
    "PERPUSTAKAAN AL-IDRISI", "TEKNOLOGI PENDIDIKAN", "JAWATANKUASA PENGURUSAN MAKMAL SAINS", 
    "JAWATANKUASA PENGURUSAN MAKMAL KOMPUTER", "JAWATANKUASA PENGURUSAN BENGKEL RBT"
  ],
  [TaskCategory.HEM]: [
    "PENGURUSAN INDUK HAL EHWAL MURID", "PENGURUSAN DISIPLIN SEKOLAH", "KELAB PENCEGAHAN JENAYAH", 
    "PENGURUSAN MAJLIS KEPIMPINAN MURID (MPM)", "BADAN PERWAKILAN MURID (BPM)", 
    "BADAN PERWAKILAN ASRAMA (BPA)", "PEMBIMBING RAKAN SEBAYA (PRS)", 
    "BADAN DAKWAH & KEROHANIAN (BDK) (STRUKTUR BALIK MENGIKUT LAJNAH)", "PENGAWAS PUSAT SUMBER SEKOLAH (PSS)", 
    "PENGAWAS SKIM PINJAMAN BUKU TEKS (SPBT)", "BADAN PERWAKILAN KETUA KELAS", 
    "PENGURUSAN PENDAFTARAN MURID & MINGGU SIMULASI", "PENGURUSAN DATA MURID", "PENGURUSAN TINGKATAN", 
    "PENGURUSAN KECERIAAN, KESELAMATAN & KESIHATAN (3K)", "UNIT KECERIAAN", "UNIT KESELAMATAN", 
    "UNIT KESIHATAN", "PENGURUSAN SKIM PINJAMAN BUKU TEKS (SPBT)", "PENGURUSAN BIASISWA DAN KEBAJIKAN MURID", 
    "UNIT BIASISWA (BKP & BKYT)", "UNIT KEBAJIKAN", "UNIT BANTUAN AWAM PERSEKOLAHAN (BAP)", 
    "UNIT KUMPULAN WANG AMANAH PELAJAR MISKIN (KWAPM)", "UNIT TAKAFUL MURID", "PENGURUSAN BIMBINGAN DAN KAUNSELING", 
    "UNIT KELAB PPDA", "INTERVENSI KEHADIRAN MURID CICIR", "PENGURUSAN ASRAMA", "PENGURUSAN DEWAN MAKAN", 
    "PENGURUSAN IMARAH SURAU", "PENGURUSAN KAFETERIA", "PENGURUSAN BILIK DARJAH", 
    "PENGURUSAN SAHSIAH GEN-T SEJAHTERA DAN MFLS", "PENGURUSAN MAJALAH & BULETIN", 
    "MAJALAH IBEST", "BULETIN IBEST"
  ],
  [TaskCategory.KOKURIKULUM]: [
    "JAWATANKUASA KOKURIKULUM", "JAWATANKUASA SUKAN DAN PERMAINAN", "OLAHRAGA DAN MERENTAS DESA", 
    "PROGRAM SENAMROBIK", "KELAB 1M1S", "PINGPONG", "BOLA SEPAK (LELAKI)", "BOLA JARING", 
    "BADMINTON", "BOULES (PETANQUE)", "BOLA TAMPAR", "BOLA BALING", "SEPAK TAKRAW", "CATUR", 
    "MEMANAH", "RENANG", "SILAT", "TAEKWONDO GTF", "JAWATANKUASA UNIT BERUNIFORM", "PENGAKAP", 
    "PERSATUAN BULAN SABIT MERAH (PBSM)", "PERSATUAN PUTERI ISLAM", "KADET REMAJA SEKOLAH", 
    "KADET POLIS SEKOLAH", "JAWATANKUASA KELAB DAN PERSATUAN", "KELAB MANDARIN", 
    "KELAB KOMPUTER / ANIMASI / EGAMES", "KELAB KESENIAN & KEBUDAYAAN", 
    "KELAB PELANCONGAN KOPERASI SEKOLAH / K3P", "KELAB KEMBARA", "KAUNSELING DAN KERJAYA", 
    "KELAB BAHASA MELAYU", "KELAB BAHASA INGGERIS", "KELAB BAHASA ARAB", 
    "KELAB PENGGUNA / PERMODALAN NASIONAL BERHAD", "KELAB USAHAWAN MUDA (PUM)", 
    "KELAB NADI HUFFAZ / QURRA’", "KELAB FALAK", "JAWATANKUASA KOPERASI SM IMTIAZ BESUT BERHAD"
  ],
  [TaskCategory.ULUL_ALBAB]: [
    "JAWATANKUASA ULUL ALBAB", "JAWATANKUASA PROGRAM KHAS ASASI IMTIAZ ULUL ALBAB (TINGKATAN 1)", 
    "JAWATANKUASA PENGURUSAN FIRQAH", "JAWATANKUASA AKHI DAN UKHTI", 
    "JAWATANKUASA QURANIK (QURANIC MEMORIZING PROGRAMME)", "JAWATANKUASA ENSIKLOPEDIK (CURRICULUM INTEGRATION & MULTILINGUAL)", 
    "JAWATANKUASA IJTIHADIK (PROGRAM ELIT, PENGINTEGRASIAN TEKNOLOGI – STEM, SEM & INOVASI)", 
    "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "KELAB ELIT ROBOTIK", "KELAB ELIT BERKUDA", 
    "KELAB STEM / SEM/ INOVASI", "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", 
    "JAWATANKUASA PEMIKIR ANDALUSIA 2.0"
  ]
};

// Transform all job scopes to UPPERCASE (Redundant now but kept for safety)
export const STANDARD_JOB_SCOPE: Record<TaskCategory, string[]> = Object.entries(RAW_JOB_SCOPE).reduce((acc, [key, values]) => {
    acc[key as TaskCategory] = values.map(v => v.toUpperCase());
    return acc;
}, {} as Record<TaskCategory, string[]>);

// --- DATA SEEDING UTILITIES ---

const createTask = (teacherId: string, title: string, description: string, category: TaskCategory = TaskCategory.PENTADBIRAN, year: number = 2026): Task => {
  // Logic to separate Role from Description if provided in "Role. Description" format
  let role = "AJK";
  let finalDescription = description;

  const parts = description.split('. ');
  if (parts.length > 0) {
    const potentialRole = parts[0].trim();
    // Simple heuristic to detect role: length check and typical formatting
    if (potentialRole.length < 50 && (parts.length > 1 || description.endsWith('.'))) {
      role = potentialRole.replace(/\.$/, ''); // Remove trailing dot
      finalDescription = parts.slice(1).join('. ').trim();
    }
  }

  // Detect specific role codes from description
  if (description.includes("(GDM)")) {
    role = "GURU DATA";
  }

  // Fallback for empty descriptions
  if (!finalDescription && role !== description) {
    // Description was just the role
    finalDescription = ""; 
  }

  return {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    teacherId,
    year,
    title: title.toUpperCase(), // FORCE UPPERCASE
    role: role.toUpperCase(), // FORCE UPPERCASE
    description: finalDescription.toUpperCase(), // FORCE UPPERCASE
    category,
    createdAt: new Date().toISOString(),
  };
};

// Initial data population based on "PENGURUSAN PENTADBIRAN" document
const adminTasks: Task[] = [
  // 1. PENGURUSAN TERTINGGI & MAJLIS TADBIR
  createTask('1', "PENGURUSAN TERTINGGI", "Pengerusi. Mengetuai pentadbiran dan pengurusan sekolah."),
  createTask('1', "MAJLIS TADBIR", "Pengerusi. Mempengerusikan mesyuarat pengurusan tertinggi."),
  createTask('2', "PENGURUSAN TERTINGGI", "Naib Pengerusi. Membantu Pengetua dalam pentadbiran am."),
  createTask('2', "MAJLIS TADBIR", "Timbalan Pengerusi. Menjalankan tugas Pengerusi semasa ketiadaan beliau."),
  createTask('3', "PENGURUSAN TERTINGGI", "Setiausaha. Menguruskan surat menyurat dan dokumentasi tertinggi."),
  createTask('3', "MAJLIS TADBIR", "Naib Pengerusi 1."),
  createTask('4', "PENGURUSAN TERTINGGI", "AJK."),
  createTask('4', "MAJLIS TADBIR", "Naib Pengerusi 2."),
  createTask('5', "PENGURUSAN TERTINGGI", "AJK."),
  createTask('5', "MAJLIS TADBIR", "Naib Pengerusi 3."),
  createTask('8', "MAJLIS TADBIR", "Setiausaha. Mencatat minit mesyuarat dan mengurus fail Majlis Tadbir."),
  createTask('9', "MAJLIS TADBIR", "AJK."),
  createTask('7', "MAJLIS TADBIR", "AJK."),
  createTask('10', "MAJLIS TADBIR", "AJK."),
  createTask('6', "MAJLIS TADBIR", "AJK."),
  createTask('11', "MAJLIS TADBIR", "AJK."),
  createTask('12', "MAJLIS TADBIR", "AJK."),

  // 3. PENGURUSAN PRESTASI (PBPPP DAN LNPT)
  createTask('1', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "Pengerusi."),
  createTask('2', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "Setiausaha. Menguruskan penilaian prestasi guru dan staf."),
  createTask('3', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('4', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('5', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('8', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('7', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('10', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('9', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('6', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('11', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),
  createTask('12', "PENGURUSAN PRESTASI (PBPPP DAN LNPT)", "AJK."),

  // 4. PENGURUSAN KEWANGAN & AKAUN
  createTask('1', "PENGURUSAN KEWANGAN & AKAUN", "Pengerusi."),
  createTask('16', "PENGURUSAN KEWANGAN & AKAUN", "AJK (GBK)."),
  createTask('13', "PENGURUSAN KEWANGAN & AKAUN", "AJK (GPM)."),
  createTask('24', "PENGURUSAN KEWANGAN & AKAUN", "AJK (SU JKS)."),
  createTask('43', "PENGURUSAN KEWANGAN & AKAUN", "AJK (SU HEM)."),
  createTask('26', "PENGURUSAN KEWANGAN & AKAUN", "AJK (SU Kokurikulum)."),
  createTask('76', "PENGURUSAN KEWANGAN & AKAUN", "AJK (SU Ulul Albab)."),
  createTask('47', "PENGURUSAN KEWANGAN & AKAUN", "AJK (SU Sukan)."),

  // 5. PENGURUSAN ASET (JKPA)
  createTask('53', "PENGURUSAN ASET (JKPA)", "Pegawai Aset."),
  createTask('25', "PENGURUSAN ASET (JKPA)", "Pegawai Aset."),
  createTask('65', "PENGURUSAN ASET (JKPA)", "Penolong Pegawai Aset."),
  createTask('26', "PENGURUSAN ASET (JKPA)", "AJK (Kokurikulum)."),
  createTask('47', "PENGURUSAN ASET (JKPA)", "AJK (Sukan)."),
  createTask('13', "PENGURUSAN ASET (JKPA)", "AJK (GPM)."),
  createTask('40', "PENGURUSAN ASET (JKPA)", "AJK (ICT)."),
  createTask('56', "PENGURUSAN ASET (JKPA)", "AJK (Muzik)."),
  createTask('59', "PENGURUSAN ASET (JKPA)", "AJK (Surau)."),
  createTask('31', "PENGURUSAN ASET (JKPA)", "AJK (RBT)."),
  createTask('67', "PENGURUSAN ASET (JKPA)", "AJK (Dewan Ulul Albab)."),
  createTask('79', "PENGURUSAN ASET (JKPA)", "AJK (Dewan Kuliah)."),

  // 6. PENGURUSAN FIZIKAL & BILIK KHAS
  createTask('113', "BILIK MESYUARAT", "Ketua. Menguruskan kebersihan dan kelengkapan bilik mesyuarat."),
  createTask('83', "BILIK MESYUARAT", "Penolong."),
  createTask('8', "BILIK GKMP", "Ketua."),
  createTask('7', "BILIK GKMP", "Penolong."),
  createTask('16', "BILIK ICIC", "Ketua."),
  createTask('15', "BILIK ICIC", "Penolong."),
  createTask('67', "DEWAN ULUL ALBAB", "Ketua."),
  createTask('79', "DEWAN KULIAH ULUL ALBAB", "Ketua."),
  createTask('109', "BILIK GURU 1 – AKADEMIK (P)", "Ketua."),
  createTask('65', "BILIK GURU 2 - AKADEMIK (L)", "Ketua."),
  createTask('58', "BILIK GURU 2 - AKADEMIK (L)", "Penolong."),
  createTask('110', "BILIK GURU 3 (KBT P)", "Ketua."),
  createTask('111', "BILIK GURU 3 (KBT P)", "Penolong."),
  createTask('27', "BILIK GURU 4 (SUUA)", "Ketua."),
  createTask('66', "BILIK GURU 4 (SUUA)", "Penolong."),
  createTask('64', "BILIK GURU 5 (KBT L)", "Ketua."),
  createTask('116', "BILIK GURU 5 (KBT L)", "Penolong."),
  createTask('61', "BILIK GURU 6 (KBT L)", "Ketua."),
  createTask('75', "BILIK GURU 6 (KBT L)", "Penolong."),
  createTask('13', "PUSAT SUMBER SEKOLAH", "Ketua."),
  createTask('49', "PUSAT SUMBER SEKOLAH", "Penolong."),
  createTask('59', "SURAU AJWAD AJYAD", "Ketua."),
  createTask('56', "BILIK BDK", "Ketua."),
  createTask('20', "BILIK BDK", "Penolong."),
  createTask('30', "KOPERASI / KAFETERIA", "Ketua."),
  createTask('71', "BILIK DISIPLIN", "Ketua."),
  createTask('54', "BILIK DISIPLIN", "Penolong."),
  createTask('38', "MAKMAL SAINS", "Ketua."),
  createTask('42', "MAKMAL KIMIA", "Ketua."),
  createTask('29', "MAKMAL BIOLOGI", "Ketua."),
  createTask('46', "MAKMAL FIZIK", "Ketua."),
  createTask('23', "MAKMAL KOMPUTER", "Ketua."),
  createTask('57', "BILIK UJIAN SEGAK", "Ketua."),
  createTask('51', "BILIK UJIAN SEGAK", "Penolong."),
  createTask('89', "BILIK PEPERIKSAAN", "Ketua."),
  createTask('44', "BILIK PEPERIKSAAN", "Penolong."),
  createTask('47', "BILIK SUKAN", "Ketua."),
  createTask('84', "BILIK SUKAN", "Penolong."),
  createTask('69', "GELANGGANG PERMAINAN", "Ketua."),
  createTask('60', "GELANGGANG PERMAINAN", "Penolong."),
  createTask('31', "BENGKEL RBT/ERT", "Ketua."),
  createTask('17', "PERABOT", "Ketua."),
  createTask('74', "BILIK AKSES 1 & 2", "Ketua."),
  createTask('70', "STUDIO", "Ketua."),
  createTask('45', "BILIK MATEMATIK", "Ketua."),
  createTask('39', "BILIK MATEMATIK", "Penolong."),
  createTask('37', "BILIK NILAM", "Ketua."),
  createTask('33', "BILIK NILAM", "Penolong."),
  createTask('43', "BILIK SEMINAR 1 & 2", "Ketua."),
  createTask('85', "BILIK SEMINAR 1 & 2", "Penolong."),
  createTask('94', "BILIK BOSS", "Ketua."),
  createTask('92', "BILIK BOSS", "Penolong."),
  createTask('56', "BILIK KEBUDAYAAN", "Ketua."),
  createTask('64', "BILIK KEBUDAYAAN", "Penolong."),
  createTask('88', "BILIK KESIHATAN/ISOLASI", "Ketua."),
  createTask('90', "BILIK PSV", "Ketua."),
  createTask('113', "BILIK PSV", "Penolong."),
  createTask('32', "BILIK SEJ & GEOG", "Ketua."),
  createTask('30', "BILIK SEJ & GEOG", "Penolong."),

  // PENGURUSAN PEJABAT (Added based on AJK section)
  createTask('8', "PENGURUSAN PEJABAT", "AJK."),
  createTask('9', "PENGURUSAN PEJABAT", "AJK."),
  createTask('7', "PENGURUSAN PEJABAT", "AJK."),
  createTask('10', "PENGURUSAN PEJABAT", "AJK."),
  createTask('6', "PENGURUSAN PEJABAT", "AJK."),
  createTask('11', "PENGURUSAN PEJABAT", "AJK."),
  createTask('12', "PENGURUSAN PEJABAT", "AJK."),

  // 8. PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25
  createTask('12', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "Penyelaras."),
  createTask('42', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "Setiausaha."),
  createTask('16', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK."),
  createTask('24', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK."),
  createTask('43', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK."),
  createTask('26', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK."),
  createTask('76', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK."),
  createTask('13', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK."),
  createTask('89', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK (PLC)."),
  createTask('22', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK (SPLKPM)."),
  createTask('90', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK (PAK 21)."),
  createTask('16', "JALINAN & JARINGAN", "AJK."),
  createTask('26', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK (Kemenjadian Murid)."),
  createTask('113', "PENGURUSAN PERANCANGAN STRATEGIK ORGANISASI/ TS25 & REFORMASI SEKOLAH", "AJK (Keceriaan)."),

  // 9. SKPM KUALITI
  createTask('12', "SKPM KUALITI @ SEKOLAH (SK@S)", "Penyelaras."),
  createTask('14', "SKPM KUALITI @ SEKOLAH (SK@S)", "Setiausaha."),
  createTask('42', "SKPM KUALITI @ SEKOLAH (SK@S)", "Pen. Setiausaha."),

  // 10. PENGURUSAN KBAT
  createTask('28', "PENGURUSAN KBAT", "Pen. Setiausaha."),
  createTask('7', "KBAT DALAM KURIKULUM", "Pengurus."),
  createTask('24', "KBAT DALAM KURIKULUM", "Penyelaras."),
  createTask('8', "KBAT DALAM PEDAGOGI", "Pengurus."),
  createTask('108', "KBAT DALAM PEDAGOGI", "Penyelaras."),
  createTask('12', "KBAT DALAM PENTAKSIRAN", "Pengurus."),
  createTask('89', "KBAT DALAM PENTAKSIRAN", "Penyelaras."),
  createTask('6', "KBAT DALAM KOKURIKULUM", "Pengurus."),
  createTask('26', "KBAT DALAM KOKURIKULUM", "Penyelaras."),
  createTask('10', "KBAT DALAM SOKONGAN KOMUNITI & SWASTA", "Pengurus."),
  createTask('60', "KBAT DALAM SOKONGAN KOMUNITI & SWASTA", "Penyelaras."),
  createTask('11', "KBAT DALAM BINA UPAYA", "Pengurus."),
  createTask('16', "KBAT DALAM BINA UPAYA", "Penyelaras."),
  createTask('9', "KBAT DALAM SUMBER", "Pengurus."),
  createTask('13', "KBAT DALAM SUMBER", "Penyelaras."),
  createTask('5', "KBAT DALAM PERSEKITARAN", "Pengurus."),
  createTask('113', "KBAT DALAM PERSEKITARAN", "Penyelaras."),

  // 11. PENINGKATAN PROFESIONALISME & LADAP
  createTask('22', "PENINGKATAN PROFESIONALISME & LADAP", "Setiausaha 1 (SPLKPM)."),
  createTask('32', "PENINGKATAN PROFESIONALISME & LADAP", "Setiausaha 2 (SPLKPM)."),
  createTask('16', "PENINGKATAN PROFESIONALISME & LADAP", "Pen. Setiausaha (GBK)."),
  createTask('14', "PENINGKATAN PROFESIONALISME & LADAP", "AJK."),
  createTask('13', "PENINGKATAN PROFESIONALISME & LADAP", "AJK."),
  createTask('23', "PENINGKATAN PROFESIONALISME & LADAP", "AJK (Fasih Digital)."),

  // 12. BUKU PENGURUSAN & TAKWIM
  createTask('12', "BUKU PENGURUSAN", "Setiausaha."),
  createTask('11', "TAKWIM SEKOLAH", "Setiausaha."),
  createTask('79', "TAKWIM SEKOLAH", "Pen. Setiausaha."),

  // 13. PENGURUSAN GURU BERTUGAS
  createTask('6', "PENGURUSAN GURU BERTUGAS", "Penyelaras."),
  createTask('32', "PENGURUSAN GURU BERTUGAS", "Setiausaha."),
  createTask('30', "PENGURUSAN GURU BERTUGAS", "Pen. Setiausaha."),

  // 14. PENGURUSAN MESYUARAT GURU
  createTask('41', "PENGURUSAN MESYUARAT GURU", "Setiausaha."),
  createTask('114', "PENGURUSAN MESYUARAT GURU", "Pen. Setiausaha."),

  // 15. PENGURUSAN DOKUMENTASI
  createTask('11', "PENGURUSAN DOKUMENTASI", "Penyelaras."),
  createTask('77', "PENGURUSAN DOKUMENTASI", "Setiausaha."),
  createTask('73', "PENGURUSAN DOKUMENTASI", "Pen. Setiausaha."),
  createTask('42', "PENGURUSAN DOKUMENTASI", "AJK (SU TS25)."),
  createTask('74', "PENGURUSAN DOKUMENTASI", "AJK."),

  // 16. PENGURUSAN GALERI
  createTask('13', "PENGURUSAN GALERI", "Penyelaras."),
  createTask('45', "PENGURUSAN GALERI", "Setiausaha."),
  createTask('109', "PENGURUSAN GALERI", "Pen. Setiausaha."),

  // 17. PENGURUSAN KAJIAN TINDAKAN
  createTask('12', "PENGURUSAN KAJIAN TINDAKAN DAN KAJIAN PENYELIDIKAN", "Penyelaras."),
  createTask('27', "PENGURUSAN KAJIAN TINDAKAN DAN KAJIAN PENYELIDIKAN", "Setiausaha."),
  createTask('16', "PENGURUSAN KAJIAN TINDAKAN DAN KAJIAN PENYELIDIKAN", "AJK."),
  createTask('22', "PENGURUSAN KAJIAN TINDAKAN DAN KAJIAN PENYELIDIKAN", "AJK."),
  createTask('31', "PENGURUSAN KAJIAN TINDAKAN DAN KAJIAN PENYELIDIKAN", "AJK."),

  // 18. KEBITARAAN SEKOLAH
  createTask('7', "KEBITARAAN SEKOLAH", "Penyelaras 1."),
  createTask('11', "KEBITARAAN SEKOLAH", "Penyelaras 2."),
  createTask('45', "BIDANG I : INOVASI", "Setiausaha."),
  createTask('23', "BIDANG I : INOVASI", "Pen Setiausaha."),
  createTask('31', "BIDANG I : INOVASI", "AJK."),
  createTask('14', "BIDANG I : INOVASI", "AJK."),
  createTask('29', "BIDANG I : INOVASI", "AJK."),
  createTask('26', "BIDANG I : INOVASI", "AJK."),
  createTask('88', "BIDANG II : HAFAZAN AL-QURAN", "Setiausaha."),
  createTask('91', "BIDANG II : HAFAZAN AL-QURAN", "AJK."),
  createTask('54', "BIDANG II : HAFAZAN AL-QURAN", "AJK."),
  createTask('112', "BIDANG II : HAFAZAN AL-QURAN", "AJK."),
  createTask('69', "BIDANG II : HAFAZAN AL-QURAN", "AJK."),
  createTask('77', "BIDANG II : HAFAZAN AL-QURAN", "AJK."),

  // 19. PENGURUSAN ICT
  createTask('23', "PENGURUSAN ICT", "Setiausaha."),
  createTask('40', "PENGURUSAN ICT", "Pen. Setiausaha."),
  createTask('65', "PENGURUSAN ICT", "AJK (Apple Classroom)."),
  createTask('52', "PENGURUSAN ICT", "AJK (Program ICT)."),
  createTask('44', "PENGURUSAN ICT", "AJK (Peningk. Profesionalisme)."),
  createTask('14', "PENGURUSAN ICT", "AJK (GDM)."),
  createTask('97', "PENGURUSAN ICT", "AJK."),
  createTask('112', "PENGURUSAN ICT", "AJK."),
  createTask('59', "PENGURUSAN ICT", "AJK."),

  // 20. PROGRAM GURU PENYAYANG
  createTask('16', "PROGRAM GURU PENYAYANG", "Setiausaha."),
  createTask('15', "PROGRAM GURU PENYAYANG", "Pen. Setiausaha."),
  createTask('69', "PROGRAM GURU PENYAYANG", "AJK (Ketua Warden)."),
  createTask('71', "PROGRAM GURU PENYAYANG", "AJK (Ketua Guru Disiplin)."),
  createTask('56', "PROGRAM GURU PENYAYANG", "AJK (Guru BDK)."),
  createTask('74', "PROGRAM GURU PENYAYANG", "AJK (Guru MPM)."),
  createTask('37', "PROGRAM GURU PENYAYANG", "AJK (Guru Pengawas PSS)."),
  createTask('111', "PROGRAM GURU PENYAYANG", "AJK (Kebajikan)."),
  createTask('67', "PROGRAM GURU PENYAYANG", "AJK."),

  // 21. PENGURUSAN BENCANA
  createTask('68', "PENGURUSAN BENCANA", "Setiausaha."),
  createTask('69', "PENGURUSAN BENCANA", "AJK."),
  createTask('29', "PENGURUSAN BENCANA", "AJK."),

  // 22. PIBG
  createTask('1', "PERSATUAN IBU BAPA DAN GURU (PIBG)", "Setiausaha."),
  createTask('3', "PERSATUAN IBU BAPA DAN GURU (PIBG)", "Penolong Setiausaha 1."),
  createTask('50', "PERSATUAN IBU BAPA DAN GURU (PIBG)", "Penolong Setiausaha 2."),
  createTask('35', "PERSATUAN IBU BAPA DAN GURU (PIBG)", "Bendahari."),
  createTask('43', "PERSATUAN IBU BAPA DAN GURU (PIBG)", "Juru Audit."),
  createTask('39', "PERSATUAN IBU BAPA DAN GURU (PIBG)", "Juru Audit."),

  // 22.1 PIBK
  createTask('16', "PENGLIBATAN IBU BAPA DAN KOMUNITI (PIBK & PIBKS)", "Setiausaha."),
  createTask('85', "PENGLIBATAN IBU BAPA DAN KOMUNITI (PIBK & PIBKS)", "Pen. Setiausaha."),

  // 23. JALINAN & JARINGAN
  createTask('16', "JALINAN & JARINGAN", "Setiausaha."),
  createTask('74', "JALINAN & JARINGAN", "Pen. Setiausaha."),
  createTask('13', "JALINAN & JARINGAN", "Bendahari."),

  // 24. BUDAYA ALQURAN
  createTask('18', "BUDAYA ALQURAN", "Setiausaha."),
  createTask('19', "BUDAYA ALQURAN", "Pen. Setiausaha."),
  createTask('12', "BUDAYA ALQURAN", "AJK."),
  createTask('27', "BUDAYA ALQURAN", "AJK."),
  createTask('17', "BUDAYA ALQURAN", "AJK."),

  // 25. ECO-SCHOOL
  createTask('39', "ECO-SCHOOL", "Pengerusi."),
  createTask('45', "ECO-SCHOOL", "Setiausaha."),
  createTask('115', "ECO-SCHOOL", "Bendahari."),
  createTask('59', "ECO-SCHOOL", "AJK (Pengguna & Komuniti)."),
  createTask('92', "ECO-SCHOOL", "AJK (Pengguna & Komuniti)."),
  createTask('43', "ECO-SCHOOL", "AJK (Data & Maklumat)."),
  createTask('14', "ECO-SCHOOL", "AJK (Data & Maklumat)."),
  createTask('60', "ECO-SCHOOL", "AJK (Promosi)."),
  createTask('31', "ECO-SCHOOL", "Ketua Projek (Menengah Bawah)."),
  createTask('26', "ECO-SCHOOL", "Ketua Projek."),
  createTask('29', "ECO-SCHOOL", "Ketua Projek (Menengah Atas)."),
  createTask('23', "ECO-SCHOOL", "Ketua Projek."),

  // 26. KELAB WARGA IBEST
  createTask('49', "KELAB WARGA IBEST", "Yang Dipertua."),
  createTask('53', "KELAB WARGA IBEST", "Naib Yang Dipertua 1."),
  createTask('28', "KELAB WARGA IBEST", "Setiausaha."),
  createTask('92', "KELAB WARGA IBEST", "Bendahari I."),
  createTask('19', "KELAB WARGA IBEST", "AJK Kebajikan."),
  createTask('16', "KELAB WARGA IBEST", "AJK Kebajikan."),
  createTask('112', "KELAB WARGA IBEST", "AJK Hadiah."),
  createTask('62', "KELAB WARGA IBEST", "AJK Aktiviti."),
  createTask('39', "KELAB WARGA IBEST", "AJK Aktiviti."),
  createTask('21', "KELAB WARGA IBEST", "AJK Jamuan."),
  createTask('30', "KELAB WARGA IBEST", "AJK Jamuan."),
  createTask('85', "KELAB WARGA IBEST", "AJK Jamuan."),
  createTask('86', "KELAB WARGA IBEST", "AJK Jamuan."),
  createTask('85', "KELAB WARGA IBEST", "AJK ICT."),
  createTask('48', "KELAB WARGA IBEST", "AJK Sumbangan."),
  createTask('58', "KELAB WARGA IBEST", "AJK Sumbangan."),

  // 27. MAJLIS GURU CEMERLANG
  createTask('12', "MAJLIS GURU CEMERLANG IBEST", "Pengerusi (GCTQS)."),
  createTask('9', "MAJLIS GURU CEMERLANG IBEST", "Timb. Pengerusi (GC BI)."),
  createTask('24', "MAJLIS GURU CEMERLANG IBEST", "Setiausaha (GC Mate. Tamb)."),
  createTask('23', "MAJLIS GURU CEMERLANG IBEST", "AJK (GC Matematik)."),
  createTask('22', "MAJLIS GURU CEMERLANG IBEST", "AJK (GC Bahasa Inggeris)."),
];

const curriculumTasks: Task[] = [
  // 1. JAWATANKUASA KURIKULUM SEKOLAH (JKS)
  createTask('24', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('108', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "Pen Setiausaha.", TaskCategory.KURIKULUM),
  createTask('8', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GKMPK).", TaskCategory.KURIKULUM),
  createTask('7', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GKMPSM).", TaskCategory.KURIKULUM),
  createTask('10', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GKMPPIBA).", TaskCategory.KURIKULUM),
  createTask('11', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KJQ).", TaskCategory.KURIKULUM),
  createTask('12', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KJSUUA).", TaskCategory.KURIKULUM),
  createTask('16', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GBK).", TaskCategory.KURIKULUM),
  createTask('9', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GKMPB).", TaskCategory.KURIKULUM),
  createTask('6', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GKMPTV).", TaskCategory.KURIKULUM),
  createTask('15', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GBK).", TaskCategory.KURIKULUM),
  createTask('14', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GDM/KP Sains).", TaskCategory.KURIKULUM),
  createTask('13', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (GPM).", TaskCategory.KURIKULUM),
  createTask('68', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (RPH).", TaskCategory.KURIKULUM),
  createTask('35', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (Jadual Waktu).", TaskCategory.KURIKULUM),
  createTask('36', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (SU Peperiksaan SPM).", TaskCategory.KURIKULUM),
  createTask('89', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (SU Peperiksaan Dalaman).", TaskCategory.KURIKULUM),
  createTask('38', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Biologi).", TaskCategory.KURIKULUM),
  createTask('46', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Fizik).", TaskCategory.KURIKULUM),
  createTask('42', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Kimia).", TaskCategory.KURIKULUM),
  createTask('24', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Matematik Tambahan).", TaskCategory.KURIKULUM),
  createTask('40', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Matematik).", TaskCategory.KURIKULUM),
  createTask('37', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Bahasa Melayu).", TaskCategory.KURIKULUM),
  createTask('33', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Bahasa Inggeris).", TaskCategory.KURIKULUM),
  createTask('26', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Bahasa Mandarin).", TaskCategory.KURIKULUM),
  createTask('21', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Bahasa Arab).", TaskCategory.KURIKULUM),
  createTask('20', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Pendidikan Islam).", TaskCategory.KURIKULUM),
  createTask('116', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP TQS).", TaskCategory.KURIKULUM),
  createTask('18', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP TBA).", TaskCategory.KURIKULUM),
  createTask('19', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP TDI).", TaskCategory.KURIKULUM),
  createTask('30', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Geografi/Penyelaras T1).", TaskCategory.KURIKULUM),
  createTask('32', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Sejarah).", TaskCategory.KURIKULUM),
  createTask('90', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP PSV).", TaskCategory.KURIKULUM),
  createTask('57', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP PJK).", TaskCategory.KURIKULUM),
  createTask('31', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP RBT).", TaskCategory.KURIKULUM),
  createTask('43', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Prinsip Perakaunan).", TaskCategory.KURIKULUM),
  createTask('48', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Hifz Al-Quran).", TaskCategory.KURIKULUM),
  createTask('92', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (KP Maharat).", TaskCategory.KURIKULUM),
  createTask('29', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (Penyelaras SPM).", TaskCategory.KURIKULUM),
  createTask('28', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (Penyelaras Pra SPM).", TaskCategory.KURIKULUM),
  createTask('39', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (Penyelaras Ting.3).", TaskCategory.KURIKULUM),
  createTask('113', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (Penyelaras Ting.2).", TaskCategory.KURIKULUM),
  createTask('114', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (Urusetia Mesyuarat JKS).", TaskCategory.KURIKULUM),
  createTask('49', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (UASA).", TaskCategory.KURIKULUM),
  createTask('116', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (PBS & PBD).", TaskCategory.KURIKULUM),
  createTask('23', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (SU ICT).", TaskCategory.KURIKULUM),
  createTask('69', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (Ketua Warden).", TaskCategory.KURIKULUM),
  createTask('71', "JAWATANKUASA KURIKULUM SEKOLAH (JKS)", "AJK (SU Disiplin).", TaskCategory.KURIKULUM),

  // 2. JAWATANKUASA PANITIA MATA PELAJARAN
  // BAHASA MELAYU
  createTask('37', "KP BAHASA MELAYU", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('41', "BAHASA MELAYU", "Setiausaha.", TaskCategory.KURIKULUM),
  // BAHASA INGGERIS
  createTask('33', "KP BAHASA INGGERIS", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('22', "BAHASA INGGERIS", "Setiausaha.", TaskCategory.KURIKULUM),
  // BAHASA MANDARIN
  createTask('26', "KP BAHASA MANDARIN", "Ketua Panitia.", TaskCategory.KURIKULUM),
  // SEJARAH
  createTask('32', "KP SEJARAH", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('44', "SEJARAH", "Setiausaha.", TaskCategory.KURIKULUM),
  // GEOGRAFI
  createTask('30', "KP GEOGRAFI", "Ketua Panitia.", TaskCategory.KURIKULUM),
  // PSV
  createTask('90', "KP PENDIDIKAN SENI VISUAL", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('113', "PENDIDIKAN SENI VISUAL", "Setiausaha.", TaskCategory.KURIKULUM),
  // PJPK
  createTask('57', "KP PEN. JASMANI & PEN. KESIHATAN", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('107', "PENDIDIKAN JASMANI & PENDIDIKAN KESIHATAN", "Setiausaha.", TaskCategory.KURIKULUM),
  // SAINS
  createTask('14', "KP SAINS", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('38', "SAINS", "Setiausaha.", TaskCategory.KURIKULUM),
  // MATEMATIK
  createTask('40', "KP MATEMATIK", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('45', "MATEMATIK", "Setiausaha.", TaskCategory.KURIKULUM),
  // FIZIK
  createTask('46', "KP FIZIK", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('36', "FIZIK", "Setiausaha.", TaskCategory.KURIKULUM),
  // KIMIA
  createTask('42', "KP KIMIA", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('28', "KIMIA", "Setiausaha.", TaskCategory.KURIKULUM),
  // BIOLOGI
  createTask('38', "KP BIOLOGI", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('29', "BIOLOGI", "Setiausaha.", TaskCategory.KURIKULUM),
  // MATEMATIK TAMBAHAN
  createTask('24', "KP MATEMATIK TAMBAHAN", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('35', "MATEMATIK TAMBAHAN", "Setiausaha.", TaskCategory.KURIKULUM),
  // RBT
  createTask('31', "KP REKA BENTUK TEKNOLOGI", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('40', "REKA BENTUK TEKNOLOGI", "Setiausaha.", TaskCategory.KURIKULUM),
  // PRINSIP AKAUN
  createTask('43', "KP PRINSIP AKAUN", "Ketua Panitia.", TaskCategory.KURIKULUM),
  // PENDIDIKAN ISLAM
  createTask('20', "KP PENDIDIKAN ISLAM", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('98', "PENDIDIKAN ISLAM", "Setiausaha.", TaskCategory.KURIKULUM),
  // BAHASA ARAB
  createTask('21', "KP BAHASA ARAB", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('81', "BAHASA ARAB", "Setiausaha.", TaskCategory.KURIKULUM),
  // HIFZ
  createTask('48', "KP HIFZ AL-QURAN", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('100', "HIFZ AL-QURAN", "Setiausaha.", TaskCategory.KURIKULUM),
  // MAHARAT
  createTask('92', "KP MAHARAT AL-QURAN", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('70', "MAHARAT AL-QURAN", "Setiausaha.", TaskCategory.KURIKULUM),
  // TQS
  createTask('117', "KP TURATH AL-QURAN & AL-SUNNAH", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('20', "TURATH AL-QURAN & AL-SUNNAH", "Setiausaha.", TaskCategory.KURIKULUM),
  // TBA
  createTask('18', "KP TURATH BAHASA ARAB", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('27', "TURATH BAHASA ARAB", "Setiausaha.", TaskCategory.KURIKULUM),
  // TDI
  createTask('19', "KP TURATH DIRASAT ISLAMIAH", "Ketua Panitia.", TaskCategory.KURIKULUM),
  createTask('56', "TURATH DIRASAT ISLAMIAH", "Setiausaha.", TaskCategory.KURIKULUM),

  // 3. JAWATANKUASA PENCERAPAN KURIKULUM
  createTask('12', "JAWATANKUASA PENCERAPAN KURIKULUM", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('14', "JAWATANKUASA PENCERAPAN KURIKULUM", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('24', "JAWATANKUASA PENCERAPAN KURIKULUM", "Penolong Setiausaha.", TaskCategory.KURIKULUM),

  // 4. JAWATANKUASA JADUAL WAKTU
  createTask('8', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('35', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('85', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "Pen Setiausaha.", TaskCategory.KURIKULUM),
  createTask('44', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "AJK (Guru Ganti).", TaskCategory.KURIKULUM),
  createTask('34', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "AJK (Guru Ganti).", TaskCategory.KURIKULUM),
  createTask('37', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "AJK (Guru Ganti).", TaskCategory.KURIKULUM),
  createTask('43', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "AJK (Guru Ganti).", TaskCategory.KURIKULUM),
  createTask('45', "JAWATANKUASA JADUAL WAKTU DAN GURU GANTI", "AJK (Guru Ganti).", TaskCategory.KURIKULUM),

  // 5. PROJEK KECEMERLANGAN AKADEMIK
  createTask('24', "JAWATANKUASA PROJEK KECEMERLANGAN AKADEMIK", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('16', "JAWATANKUASA PROJEK KECEMERLANGAN AKADEMIK", "AJK (GBK).", TaskCategory.KURIKULUM),
  createTask('15', "JAWATANKUASA PROJEK KECEMERLANGAN AKADEMIK", "AJK (GBK).", TaskCategory.KURIKULUM),
  createTask('29', "PROJEK KECEMERLANGAN SPM", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('93', "PROJEK KECEMERLANGAN SPM", "Pen. Penyelaras.", TaskCategory.KURIKULUM),
  createTask('8', "PROJEK KECEMERLANGAN PRA SPM", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('28', "PROJEK KECEMERLANGAN PRA SPM", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('55', "PROJEK KECEMERLANGAN PRA SPM", "Pen. Penyelaras.", TaskCategory.KURIKULUM),
  createTask('10', "PROJEK KECEMERLANGAN TINGKATAN 3", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('39', "PROJEK KECEMERLANGAN TINGKATAN 3", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('80', "PROJEK KECEMERLANGAN TINGKATAN 3", "Pen. Penyelaras.", TaskCategory.KURIKULUM),
  createTask('7', "PROJEK KECEMERLANGAN TINGKATAN 2", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('113', "PROJEK KECEMERLANGAN TINGKATAN 2", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('110', "PROJEK KECEMERLANGAN TINGKATAN 2", "Pen. Penyelaras.", TaskCategory.KURIKULUM),
  createTask('6', "PROJEK KECEMERLANGAN TINGKATAN 1", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('30', "PROJEK KECEMERLANGAN TINGKATAN 1", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('104', "PROJEK KECEMERLANGAN TINGKATAN 1", "Pen. Penyelaras.", TaskCategory.KURIKULUM),

  // 6. PEPERIKSAAN SPM
  createTask('94', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN AWAM (SPM)", "Penolong Setiausaha.", TaskCategory.KURIKULUM),
  
  // 7. PEPERIKSAAN DALAMAN
  createTask('12', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('89', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('34', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Penolong Setiausaha.", TaskCategory.KURIKULUM),
  createTask('94', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Penyelaras Pep Tingkatan 1.", TaskCategory.KURIKULUM),
  createTask('106', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Penyelaras Pep Tingkatan 2.", TaskCategory.KURIKULUM),
  createTask('84', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Penyelaras Pep Tingkatan 2.", TaskCategory.KURIKULUM),
  createTask('115', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Penyelaras Pep Tingkatan 3.", TaskCategory.KURIKULUM),
  createTask('111', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Penyelaras Pep Tingkatan 4.", TaskCategory.KURIKULUM),
  createTask('38', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "Penyelaras Pep Tingkatan 5 / SPPMA.", TaskCategory.KURIKULUM),
  createTask('104', "JAWATANKUASA UNIT PENILAIAN DAN PEPERIKSAAN DALAMAN", "SPPMA PRA SPM.", TaskCategory.KURIKULUM),

  // 8. PBS
  createTask('11', "PENTAKSIRAN BERASASKAN SEKOLAH (PBS)", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('116', "PENTAKSIRAN BERASASKAN SEKOLAH (PBS)", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('82', "PENTAKSIRAN BERASASKAN SEKOLAH (PBS)", "Pen. Setiausaha.", TaskCategory.KURIKULUM),
  createTask('116', "PENTAKSIRAN BILIK DARJAH (PBD)", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('79', "PENTAKSIRAN BILIK DARJAH (PBD)", "Penolong Setiausaha.", TaskCategory.KURIKULUM),
  createTask('8', "UJIAN AKHIR SESI AKADEMIK (UASA)", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('49', "UJIAN AKHIR SESI AKADEMIK (UASA)", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('84', "UJIAN AKHIR SESI AKADEMIK (UASA)", "Pen Setiausaha.", TaskCategory.KURIKULUM),
  createTask('57', "PENILAIAN SEGAK", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('26', "PENTAKSIRAN PAJSK", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('109', "PENTAKSIRAN PAJSK", "Pen. Setiausaha.", TaskCategory.KURIKULUM),
  createTask('16', "PENTAKSIRAN PSIKOMETRIK (PPSi)", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('15', "PENTAKSIRAN PSIKOMETRIK (PPSi)", "Pen. Penyelaras.", TaskCategory.KURIKULUM),

  // 8.6 KBT
  createTask('11', "KURIKULUM BERSEPADU TAHFIZ (KBT)", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('48', "KURIKULUM BERSEPADU TAHFIZ (KBT)", "Setiausaha 1.", TaskCategory.KURIKULUM),
  createTask('92', "KURIKULUM BERSEPADU TAHFIZ (KBT)", "Setiausaha 2.", TaskCategory.KURIKULUM),
  createTask('53', "KURIKULUM BERSEPADU TAHFIZ (KBT)", "Bendahari.", TaskCategory.KURIKULUM),
  createTask('63', "HIFZ DAN MAHARAT TINGKATAN 1", "Penyelaras Hifz.", TaskCategory.KURIKULUM),
  createTask('109', "HIFZ DAN MAHARAT TINGKATAN 1", "Penyelaras Maharat.", TaskCategory.KURIKULUM),
  createTask('50', "HIFZ DAN MAHARAT TINGKATAN 2", "Penyelaras Hifz.", TaskCategory.KURIKULUM),
  createTask('60', "HIFZ DAN MAHARAT TINGKATAN 2", "Penyelaras Maharat.", TaskCategory.KURIKULUM),
  createTask('78', "HIFZ DAN MAHARAT TINGKATAN 3", "Penyelaras Hifz.", TaskCategory.KURIKULUM),
  createTask('82', "HIFZ DAN MAHARAT TINGKATAN 3", "Penyelaras Maharat.", TaskCategory.KURIKULUM),
  createTask('61', "HIFZ DAN MAHARAT TINGKATAN 4", "Penyelaras Hifz.", TaskCategory.KURIKULUM),
  createTask('101', "HIFZ DAN MAHARAT TINGKATAN 4", "Penyelaras Maharat.", TaskCategory.KURIKULUM),
  createTask('112', "HIFZ DAN MAHARAT TINGKATAN 5", "Penyelaras Hifz.", TaskCategory.KURIKULUM),
  createTask('77', "HIFZ DAN MAHARAT TINGKATAN 5", "Penyelaras Maharat.", TaskCategory.KURIKULUM),

  // 9. MBMMBI
  createTask('9', "JAWATANKUASA PROGRAM MEMARTABATKAN BAHASA MELAYU DAN MEMPERKUKUHKAN BAHASA INGGERIS (MBMMBI)", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('37', "JAWATANKUASA PROGRAM MEMARTABATKAN BAHASA MELAYU DAN MEMPERKUKUHKAN BAHASA INGGERIS (MBMMBI)", "Setiausaha (BM).", TaskCategory.KURIKULUM),
  createTask('33', "JAWATANKUASA PROGRAM MEMARTABATKAN BAHASA MELAYU DAN MEMPERKUKUHKAN BAHASA INGGERIS (MBMMBI)", "Setiausaha (BI).", TaskCategory.KURIKULUM),
  createTask('13', "JAWATANKUASA PROGRAM MEMARTABATKAN BAHASA MELAYU DAN MEMPERKUKUHKAN BAHASA INGGERIS (MBMMBI)", "AJK.", TaskCategory.KURIKULUM),

  // 10. DLP
  createTask('7', "JAWATANKUASA DUAL LANGUAGE PROGRAM (DLP)", "Pengurus.", TaskCategory.KURIKULUM),
  createTask('46', "JAWATANKUASA DUAL LANGUAGE PROGRAM (DLP)", "Penyelaras.", TaskCategory.KURIKULUM),

  // 11. PAK 21
  createTask('22', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('99', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "Pen. Setiausaha.", TaskCategory.KURIKULUM),
  createTask('13', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (GPM).", TaskCategory.KURIKULUM),
  createTask('24', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (SU JKS).", TaskCategory.KURIKULUM),
  createTask('89', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (PLC).", TaskCategory.KURIKULUM),
  createTask('27', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (PLC).", TaskCategory.KURIKULUM),
  createTask('41', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (PLC).", TaskCategory.KURIKULUM),
  createTask('23', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (Program ICT).", TaskCategory.KURIKULUM),
  createTask('53', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (Delima).", TaskCategory.KURIKULUM),
  createTask('66', "JAWATANKUASA PEMBELAJARAN ABAD KE-21 (PAK 21)", "AJK (Apple Classroom).", TaskCategory.KURIKULUM),

  // 12. ELEARNING
  createTask('23', "JAWATANKUASA ELEARNING", "Setiausaha 1.", TaskCategory.KURIKULUM),
  createTask('40', "JAWATANKUASA ELEARNING", "Setiausaha 2.", TaskCategory.KURIKULUM),
  createTask('53', "DELIMA KPM", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('74', "DELIMA KPM", "Pen. Setiausaha.", TaskCategory.KURIKULUM),
  createTask('66', "APPLE CLASSROOM", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('22', "APPLE CLASSROOM", "Penolong Penyelaras.", TaskCategory.KURIKULUM),
  createTask('47', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('104', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('71', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('59', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('60', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('73', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('78', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('64', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('108', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),
  createTask('95', "APPLE CLASSROOM", "Apple Teacher.", TaskCategory.KURIKULUM),

  // 13. PSS
  createTask('13', "JAWATANKUASA PUSAT SUMBER & TEKNOLOGI PENDIDIKAN", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('49', "PERPUSTAKAAN AL-IDRISI", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('33', "PERPUSTAKAAN AL-IDRISI", "AJK (NILAM BI).", TaskCategory.KURIKULUM),
  createTask('34', "PERPUSTAKAAN AL-IDRISI", "AJK (NILAM BM).", TaskCategory.KURIKULUM),
  createTask('21', "PERPUSTAKAAN AL-IDRISI", "AJK (NILAM BA).", TaskCategory.KURIKULUM),
  createTask('74', "PERPUSTAKAAN AL-IDRISI", "AJK (Bilik Akses).", TaskCategory.KURIKULUM),
  createTask('108', "PERPUSTAKAAN AL-IDRISI", "AJK (Sistem i-SLIB).", TaskCategory.KURIKULUM),
  createTask('72', "PERPUSTAKAAN AL-IDRISI", "AJK (Informasi).", TaskCategory.KURIKULUM),
  createTask('67', "PERPUSTAKAAN AL-IDRISI", "AJK (Informasi).", TaskCategory.KURIKULUM),
  createTask('50', "PERPUSTAKAAN AL-IDRISI", "AJK (eBOOK).", TaskCategory.KURIKULUM),
  createTask('76', "PERPUSTAKAAN AL-IDRISI", "AJK (Galeri).", TaskCategory.KURIKULUM),
  createTask('65', "PERPUSTAKAAN AL-IDRISI", "AJK (Galeri).", TaskCategory.KURIKULUM),
  createTask('58', "PERPUSTAKAAN AL-IDRISI", "AJK (Galeri).", TaskCategory.KURIKULUM),
  createTask('51', "PERPUSTAKAAN AL-IDRISI", "AJK (Galeri).", TaskCategory.KURIKULUM),
  createTask('23', "TEKNOLOGI PENDIDIKAN", "Penyelaras.", TaskCategory.KURIKULUM),
  createTask('56', "TEKNOLOGI PENDIDIKAN", "AJK (TViBest).", TaskCategory.KURIKULUM),
  createTask('79', "TEKNOLOGI PENDIDIKAN", "AJK (Video Kreatif).", TaskCategory.KURIKULUM),
  createTask('77', "TEKNOLOGI PENDIDIKAN", "AJK (Facebook).", TaskCategory.KURIKULUM),
  createTask('40', "TEKNOLOGI PENDIDIKAN", "AJK (Facebook).", TaskCategory.KURIKULUM),
  createTask('65', "TEKNOLOGI PENDIDIKAN", "AJK (Audio Visual).", TaskCategory.KURIKULUM),
  createTask('71', "TEKNOLOGI PENDIDIKAN", "AJK (Studio Broadcast).", TaskCategory.KURIKULUM),

  // 14-16 MAKMAL
  createTask('7', "JAWATANKUASA PENGURUSAN MAKMAL SAINS", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('40', "JAWATANKUASA PENGURUSAN MAKMAL KOMPUTER", "Setiausaha.", TaskCategory.KURIKULUM),
  createTask('31', "JAWATANKUASA PENGURUSAN BENGKEL RBT", "Setiausaha.", TaskCategory.KURIKULUM),
];

const hemTasks: Task[] = [
  // 1. PENGURUSAN INDUK HEM
  createTask('43', "PENGURUSAN INDUK HAL EHWAL MURID", "Setiausaha 1.", TaskCategory.HEM),
  createTask('52', "PENGURUSAN INDUK HAL EHWAL MURID", "Setiausaha 2.", TaskCategory.HEM),
  createTask('16', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (GBK).", TaskCategory.HEM),
  createTask('15', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (GBK).", TaskCategory.HEM),
  createTask('14', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Data Murid).", TaskCategory.HEM),
  createTask('71', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Disiplin).", TaskCategory.HEM),
  createTask('74', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (MPM).", TaskCategory.HEM),
  createTask('16', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Pendaftaran).", TaskCategory.HEM),
  createTask('69', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Asrama).", TaskCategory.HEM),
  createTask('113', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (3K).", TaskCategory.HEM),
  createTask('103', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Bilik Darjah).", TaskCategory.HEM),
  createTask('111', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Kebajikan).", TaskCategory.HEM),
  createTask('94', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (SPBT).", TaskCategory.HEM),
  createTask('30', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Kafeteria).", TaskCategory.HEM),
  createTask('72', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Surau).", TaskCategory.HEM),
  createTask('58', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Majalah).", TaskCategory.HEM),
  createTask('76', "PENGURUSAN INDUK HAL EHWAL MURID", "AJK (Sahsiah/MFLS).", TaskCategory.HEM),

  // 2. DISIPLIN
  createTask('71', "PENGURUSAN DISIPLIN SEKOLAH", "Setiausaha.", TaskCategory.HEM),
  createTask('44', "PENGURUSAN DISIPLIN SEKOLAH", "Penolong Setiausaha.", TaskCategory.HEM),
  createTask('16', "PENGURUSAN DISIPLIN SEKOLAH", "AJK (GBK).", TaskCategory.HEM),
  createTask('64', "PENGURUSAN DISIPLIN SEKOLAH", "AJK (SSDM).", TaskCategory.HEM),
  createTask('55', "PENGURUSAN DISIPLIN SEKOLAH", "AJK (Etika).", TaskCategory.HEM),
  createTask('47', "PENGURUSAN DISIPLIN SEKOLAH", "AJK (Personaliti).", TaskCategory.HEM),
  createTask('70', "KELAB PENCEGAHAN JENAYAH", "Ketua.", TaskCategory.HEM),
  createTask('112', "KELAB PENCEGAHAN JENAYAH", "Penolong.", TaskCategory.HEM),
  createTask('75', "PENGURUSAN DISIPLIN SEKOLAH", "Penyelaras HEM T1.", TaskCategory.HEM),
  createTask('65', "PENGURUSAN DISIPLIN SEKOLAH", "Penyelaras HEM T2.", TaskCategory.HEM),
  createTask('60', "PENGURUSAN DISIPLIN SEKOLAH", "Penyelaras HEM T3.", TaskCategory.HEM),
  createTask('66', "PENGURUSAN DISIPLIN SEKOLAH", "Penyelaras HEM PRA SPM.", TaskCategory.HEM),
  createTask('115', "PENGURUSAN DISIPLIN SEKOLAH", "Penyelaras HEM SPM.", TaskCategory.HEM),
  createTask('69', "PENGURUSAN DISIPLIN SEKOLAH", "Ketua Warden Aspura.", TaskCategory.HEM),
  createTask('46', "PENGURUSAN DISIPLIN SEKOLAH", "Ketua Warden Aspuri.", TaskCategory.HEM),

  // 3. MPM
  createTask('81', "PENGURUSAN MAJLIS KEPIMPINAN MURID (MPM)", "Penyelaras.", TaskCategory.HEM),
  createTask('74', "PENGURUSAN MAJLIS KEPIMPINAN MURID (MPM)", "Pen. Penyelaras.", TaskCategory.HEM),
  createTask('81', "BADAN PERWAKILAN MURID (BPM)", "Ketua.", TaskCategory.HEM),
  createTask('80', "BADAN PERWAKILAN MURID (BPM)", "Penolong.", TaskCategory.HEM),
  createTask('59', "BADAN PERWAKILAN ASRAMA (BPA)", "Ketua.", TaskCategory.HEM),
  createTask('46', "BADAN PERWAKILAN ASRAMA (BPA)", "Penolong.", TaskCategory.HEM),
  createTask('16', "PEMBIMBING RAKAN SEBAYA (PRS)", "Ketua.", TaskCategory.HEM),
  createTask('15', "PEMBIMBING RAKAN SEBAYA (PRS)", "Penolong.", TaskCategory.HEM),
  createTask('74', "BADAN DAKWAH & KEROHANIAN (BDK) (STRUKTUR BALIK MENGIKUT LAJNAH)", "Ketua.", TaskCategory.HEM),
  createTask('20', "BADAN DAKWAH & KEROHANIAN (BDK) (STRUKTUR BALIK MENGIKUT LAJNAH)", "Penolong.", TaskCategory.HEM),
  createTask('13', "PENGAWAS PUSAT SUMBER SEKOLAH (PSS)", "Ketua.", TaskCategory.HEM),
  createTask('49', "PENGAWAS PUSAT SUMBER SEKOLAH (PSS)", "Penolong.", TaskCategory.HEM),
  createTask('94', "PENGAWAS SKIM PINJAMAN BUKU TEKS (SPBT)", "Ketua.", TaskCategory.HEM),
  createTask('92', "PENGAWAS SKIM PINJAMAN BUKU TEKS (SPBT)", "Penolong.", TaskCategory.HEM),
  createTask('103', "BADAN PERWAKILAN KETUA KELAS", "Ketua.", TaskCategory.HEM),
  createTask('84', "BADAN PERWAKILAN KETUA KELAS", "Penolong.", TaskCategory.HEM),

  // 4. PENDAFTARAN
  createTask('16', "PENGURUSAN PENDAFTARAN MURID & MINGGU SIMULASI", "Setiausaha.", TaskCategory.HEM),
  createTask('69', "PENGURUSAN PENDAFTARAN MURID & MINGGU SIMULASI", "Penolong Setiausaha.", TaskCategory.HEM),
  createTask('30', "PENGURUSAN PENDAFTARAN MURID & MINGGU SIMULASI", "SU Pendaftaran Ting. 1.", TaskCategory.HEM),

  // 5. DATA MURID
  createTask('14', "PENGURUSAN DATA MURID", "Setiausaha.", TaskCategory.HEM),
  createTask('50', "PENGURUSAN DATA MURID", "Penyelaras APDM/MOEIS.", TaskCategory.HEM),
  createTask('77', "PENGURUSAN DATA MURID", "Penyelaras ASIS-YT.", TaskCategory.HEM),

  // 6. PENGURUSAN TINGKATAN
  createTask('75', "PENGURUSAN TINGKATAN", "Penyelaras Tingkatan 2.", TaskCategory.HEM),
  createTask('65', "PENGURUSAN TINGKATAN", "Penyelaras Tingkatan 1.", TaskCategory.HEM),
  createTask('60', "PENGURUSAN TINGKATAN", "Penyelaras Tingkatan 3.", TaskCategory.HEM),
  createTask('66', "PENGURUSAN TINGKATAN", "Penyelaras Tingkatan 4.", TaskCategory.HEM),
  createTask('115', "PENGURUSAN TINGKATAN", "Penyelaras Tingkatan 5.", TaskCategory.HEM),

  // 7. 3K
  createTask('113', "PENGURUSAN KECERIAAN, KESELAMATAN & KESIHATAN (3K)", "Setiausaha 1.", TaskCategory.HEM),
  createTask('73', "PENGURUSAN KECERIAAN, KESELAMATAN & KESIHATAN (3K)", "Setiausaha 2.", TaskCategory.HEM),
  createTask('113', "UNIT KECERIAAN", "Ketua.", TaskCategory.HEM),
  createTask('38', "UNIT KECERIAAN", "Penolong.", TaskCategory.HEM),
  createTask('68', "UNIT KESELAMATAN", "Ketua.", TaskCategory.HEM),
  createTask('58', "UNIT KESELAMATAN", "Penolong.", TaskCategory.HEM),
  createTask('104', "UNIT KESIHATAN", "Ketua.", TaskCategory.HEM),

  // 8. SPBT
  createTask('94', "PENGURUSAN SKIM PINJAMAN BUKU TEKS (SPBT)", "Setiausaha.", TaskCategory.HEM),
  createTask('92', "PENGURUSAN SKIM PINJAMAN BUKU TEKS (SPBT)", "Penolong Setiausaha.", TaskCategory.HEM),

  // 9. KEBAJIKAN
  createTask('111', "PENGURUSAN BIASISWA DAN KEBAJIKAN MURID", "Setiausaha.", TaskCategory.HEM),
  createTask('107', "PENGURUSAN BIASISWA DAN KEBAJIKAN MURID", "Penolong Setiausaha.", TaskCategory.HEM),
  createTask('107', "UNIT BIASISWA (BKP & BKYT)", "Setiausaha.", TaskCategory.HEM),
  createTask('67', "UNIT BIASISWA (BKP & BKYT)", "Pen. Setiausaha.", TaskCategory.HEM),
  createTask('111', "UNIT KEBAJIKAN", "Setiausaha.", TaskCategory.HEM),
  createTask('84', "UNIT KEBAJIKAN", "Pen.Setiausaha.", TaskCategory.HEM),
  createTask('110', "UNIT BANTUAN AWAM PERSEKOLAHAN (BAP)", "Setiausaha.", TaskCategory.HEM),
  createTask('109', "UNIT BANTUAN AWAM PERSEKOLAHAN (BAP)", "Pen. Setiausaha.", TaskCategory.HEM),
  createTask('106', "UNIT KUMPULAN WANG AMANAH PELAJAR MISKIN (KWAPM)", "Setiausaha.", TaskCategory.HEM),
  createTask('60', "UNIT KUMPULAN WANG AMANAH PELAJAR MISKIN (KWAPM)", "Pen. Setiausaha.", TaskCategory.HEM),
  createTask('107', "UNIT TAKAFUL MURID", "Setiausaha.", TaskCategory.HEM),

  // 10. UBK
  createTask('16', "PENGURUSAN BIMBINGAN DAN KAUNSELING", "Setiausaha.", TaskCategory.HEM),
  createTask('15', "PENGURUSAN BIMBINGAN DAN KAUNSELING", "Penolong Setiausaha.", TaskCategory.HEM),
  createTask('16', "UNIT KELAB PPDA", "Ketua.", TaskCategory.HEM),
  createTask('16', "INTERVENSI KEHADIRAN MURID CICIR", "Ketua.", TaskCategory.HEM),

  // 11. ASRAMA
  createTask('69', "PENGURUSAN ASRAMA", "Setiausaha.", TaskCategory.HEM),
  createTask('46', "PENGURUSAN ASRAMA", "Penolong Setiausaha 1.", TaskCategory.HEM),
  createTask('59', "PENGURUSAN ASRAMA", "Penolong Setiausaha 2.", TaskCategory.HEM),

  // 12. SURAU
  createTask('72', "PENGURUSAN IMARAH SURAU", "Setiausaha.", TaskCategory.HEM),
  createTask('107', "PENGURUSAN IMARAH SURAU", "Penolong Setiausaha.", TaskCategory.HEM),

  // 13. KAFETERIA
  createTask('30', "PENGURUSAN KAFETERIA", "Setiausaha.", TaskCategory.HEM),
  createTask('118', "PENGURUSAN KAFETERIA", "Penolong Setiausaha (Cikgu Noraisham).", TaskCategory.HEM),

  // 14. BILIK DARJAH
  createTask('103', "PENGURUSAN BILIK DARJAH", "Setiausaha.", TaskCategory.HEM),
  createTask('84', "PENGURUSAN BILIK DARJAH", "Penolong Setiausaha.", TaskCategory.HEM),

  // 15. SAHSIAH
  createTask('76', "PENGURUSAN SAHSIAH GEN-T SEJAHTERA DAN MFLS", "Setiausaha.", TaskCategory.HEM),
  createTask('116', "PENGURUSAN SAHSIAH GEN-T SEJAHTERA DAN MFLS", "Penolong Setiausaha.", TaskCategory.HEM),

  // 16. MAJALAH
  createTask('58', "MAJALAH IBEST", "Penyelaras.", TaskCategory.HEM),
  createTask('106', "MAJALAH IBEST", "Pen. Penyelaras.", TaskCategory.HEM),
  createTask('77', "BULETIN IBEST", "Penyelaras.", TaskCategory.HEM),
  createTask('93', "BULETIN IBEST", "Penolong Penyelaras.", TaskCategory.HEM),
];

const kokurikulumTasks: Task[] = [
  // 1. INDUK KOKURIKULUM
  createTask('26', "JAWATANKUASA KOKURIKULUM", "Setiausaha 1.", TaskCategory.KOKURIKULUM),
  createTask('109', "JAWATANKUASA KOKURIKULUM", "Setiausaha 2 (PAJSK).", TaskCategory.KOKURIKULUM),
  createTask('47', "JAWATANKUASA KOKURIKULUM", "Setiausaha Sukan.", TaskCategory.KOKURIKULUM),
  createTask('58', "JAWATANKUASA KOKURIKULUM", "Penyelaras Sukan 1M1S.", TaskCategory.KOKURIKULUM),
  createTask('56', "JAWATANKUASA KOKURIKULUM", "Penyelaras Kelab / Persatuan.", TaskCategory.KOKURIKULUM),
  createTask('70', "JAWATANKUASA KOKURIKULUM", "Penyelaras Unit Beruniform.", TaskCategory.KOKURIKULUM),

  // 2. SUKAN & PERMAINAN
  createTask('47', "JAWATANKUASA SUKAN DAN PERMAINAN", "Setiausaha.", TaskCategory.KOKURIKULUM),
  createTask('55', "JAWATANKUASA SUKAN DAN PERMAINAN", "Penolong Setiausaha.", TaskCategory.KOKURIKULUM),
  createTask('50', "OLAHRAGA DAN MERENTAS DESA", "Pengurus.", TaskCategory.KOKURIKULUM),
  createTask('65', "OLAHRAGA DAN MERENTAS DESA", "Penyelaras.", TaskCategory.KOKURIKULUM),
  createTask('16', "PROGRAM SENAMROBIK", "Pengurus.", TaskCategory.KOKURIKULUM),
  createTask('53', "PROGRAM SENAMROBIK", "Penyelaras.", TaskCategory.KOKURIKULUM),
  createTask('58', "KELAB 1M1S", "Penyelaras.", TaskCategory.KOKURIKULUM),
  createTask('48', "PINGPONG", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('38', "PINGPONG", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('71', "BOLA SEPAK (LELAKI)", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('37', "BOLA JARING", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('27', "BADMINTON", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('31', "BADMINTON", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('74', "BOULES (PETANQUE)", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('20', "BOULES (PETANQUE)", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('53', "BOLA TAMPAR", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('30', "BOLA TAMPAR", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('52', "BOLA BALING", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('113', "BOLA BALING", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('117', "SEPAK TAKRAW", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('40', "CATUR", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('25', "MEMANAH", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('17', "RENANG", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('72', "SILAT", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('34', "TAEKWONDO GTF", "Ketua.", TaskCategory.KOKURIKULUM),

  // 3. UNIT BERUNIFORM
  createTask('70', "JAWATANKUASA UNIT BERUNIFORM", "Penyelaras.", TaskCategory.KOKURIKULUM),
  createTask('73', "JAWATANKUASA UNIT BERUNIFORM", "Setiausaha.", TaskCategory.KOKURIKULUM),
  createTask('76', "PENGAKAP", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('103', "PENGAKAP", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('60', "PERSATUAN BULAN SABIT MERAH (PBSM)", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('92', "PERSATUAN BULAN SABIT MERAH (PBSM)", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('116', "PERSATUAN PUTERI ISLAM", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('64', "KADET REMAJA SEKOLAH", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('82', "KADET REMAJA SEKOLAH", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),
  createTask('79', "KADET POLIS SEKOLAH", "Ketua (Lelaki).", TaskCategory.KOKURIKULUM),
  createTask('36', "KADET POLIS SEKOLAH", "Ketua (Perempuan).", TaskCategory.KOKURIKULUM),

  // 4. KELAB PERSATUAN
  createTask('56', "JAWATANKUASA KELAB DAN PERSATUAN", "Penyelaras.", TaskCategory.KOKURIKULUM),
  createTask('106', "JAWATANKUASA KELAB DAN PERSATUAN", "Setiausaha.", TaskCategory.KOKURIKULUM),
  createTask('26', "KELAB MANDARIN", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('58', "KELAB KOMPUTER / ANIMASI / EGAMES", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('78', "KELAB KESENIAN & KEBUDAYAAN", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('69', "KELAB PELANCONGAN KOPERASI SEKOLAH / K3P", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('55', "KELAB KEMBARA", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('16', "KAUNSELING DAN KERJAYA", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('44', "KELAB BAHASA MELAYU", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('33', "KELAB BAHASA INGGERIS", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('18', "KELAB BAHASA ARAB", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('57', "KELAB PENGGUNA / PERMODALAN NASIONAL BERHAD", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('69', "KELAB USAHAWAN MUDA (PUM)", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('75', "KELAB NADI HUFFAZ / QURRA’", "Ketua.", TaskCategory.KOKURIKULUM),
  createTask('66', "KELAB FALAK", "Ketua.", TaskCategory.KOKURIKULUM),

  // 5. KOPERASI
  createTask('4', "JAWATANKUASA KOPERASI SM IMTIAZ BESUT BERHAD", "Pengerusi.", TaskCategory.KOKURIKULUM),
  createTask('59', "JAWATANKUASA KOPERASI SM IMTIAZ BESUT BERHAD", "Setiausaha 1.", TaskCategory.KOKURIKULUM),
  createTask('30', "JAWATANKUASA KOPERASI SM IMTIAZ BESUT BERHAD", "Setiausaha 2.", TaskCategory.KOKURIKULUM),
];

const ululAlbabTasks: Task[] = [
  // 1. JAWATANKUASA ULUL ALBAB
  createTask('77', "JAWATANKUASA ULUL ALBAB", "Setiausaha.", TaskCategory.ULUL_ALBAB),
  createTask('8', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('7', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('6', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('9', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('10', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('12', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('11', "JAWATANKUASA ULUL ALBAB", "AJK (KJQ).", TaskCategory.ULUL_ALBAB),
  createTask('16', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('67', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('30', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('49', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('18', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('27', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('21', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('54', "JAWATANKUASA ULUL ALBAB", "AJK.", TaskCategory.ULUL_ALBAB),

  // 2. JAWATANKUASA PROGRAM KHAS ASASI IMTIAZ ULUL ALBAB (TINGKATAN 1)
  createTask('30', "JAWATANKUASA PROGRAM KHAS ASASI IMTIAZ ULUL ALBAB (TINGKATAN 1)", "Setiausaha.", TaskCategory.ULUL_ALBAB),

  // 3. JAWATANKUASA PENGURUSAN FIRQAH
  createTask('67', "JAWATANKUASA PENGURUSAN FIRQAH", "Setiausaha.", TaskCategory.ULUL_ALBAB),
  createTask('48', "JAWATANKUASA PENGURUSAN FIRQAH", "AJK (Ketua Itqan).", TaskCategory.ULUL_ALBAB),
  createTask('68', "JAWATANKUASA PENGURUSAN FIRQAH", "AJK (Ketua Mahabbah).", TaskCategory.ULUL_ALBAB),
  createTask('80', "JAWATANKUASA PENGURUSAN FIRQAH", "AJK (Ketua Taqwa).", TaskCategory.ULUL_ALBAB),
  createTask('79', "JAWATANKUASA PENGURUSAN FIRQAH", "AJK (Ketua Istiqomah).", TaskCategory.ULUL_ALBAB),
  createTask('53', "JAWATANKUASA PENGURUSAN FIRQAH", "AJK (Ketua Akhlak).", TaskCategory.ULUL_ALBAB),
  createTask('72', "JAWATANKUASA PENGURUSAN FIRQAH", "AJK (Ketua Zaamah).", TaskCategory.ULUL_ALBAB),

  // 4. JAWATANKUASA AKHI DAN UKHTI
  createTask('16', "JAWATANKUASA AKHI DAN UKHTI", "Setiausaha.", TaskCategory.ULUL_ALBAB),

  // 5. JAWATANKUASA QURANIK (QURANIC MEMORIZING PROGRAMME)
  createTask('49', "JAWATANKUASA QURANIK (QURANIC MEMORIZING PROGRAMME)", "Penyelaras.", TaskCategory.ULUL_ALBAB),
  createTask('89', "JAWATANKUASA QURANIK (QURANIC MEMORIZING PROGRAMME)", "Setiausaha.", TaskCategory.ULUL_ALBAB),
  createTask('54', "JAWATANKUASA QURANIK (QURANIC MEMORIZING PROGRAMME)", "Bendahari.", TaskCategory.ULUL_ALBAB),
  createTask('97', "JAWATANKUASA QURANIK (QURANIC MEMORIZING PROGRAMME)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('56', "JAWATANKUASA QURANIK (QURANIC MEMORIZING PROGRAMME)", "AJK.", TaskCategory.ULUL_ALBAB),

  // 6. JAWATANKUASA ENSIKLOPEDIK (Curriculum Integration & Multilingual)
  createTask('18', "JAWATANKUASA ENSIKLOPEDIK (CURRICULUM INTEGRATION & MULTILINGUAL)", "Setiausaha.", TaskCategory.ULUL_ALBAB),
  createTask('11', "JAWATANKUASA ENSIKLOPEDIK (CURRICULUM INTEGRATION & MULTILINGUAL)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('66', "JAWATANKUASA ENSIKLOPEDIK (CURRICULUM INTEGRATION & MULTILINGUAL)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('26', "JAWATANKUASA ENSIKLOPEDIK (CURRICULUM INTEGRATION & MULTILINGUAL)", "AJK.", TaskCategory.ULUL_ALBAB),

  // 7. JAWATANKUASA IJTIHADIK (PROGRAM ELIT)
  createTask('27', "JAWATANKUASA IJTIHADIK (PROGRAM ELIT, PENGINTEGRASIAN TEKNOLOGI – STEM, SEM & INOVASI)", "Setiausaha.", TaskCategory.ULUL_ALBAB),

  // 7.1 Kelab Ulul Albab (Avionik/Drone/Solarik/Fotonik)
  createTask('49', "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "Ketua.", TaskCategory.ULUL_ALBAB),
  createTask('80', "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('61', "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('52', "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('28', "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('38', "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('47', "KELAB ULUL ALBAB (AVIONIK/DRONE/SOLARIK/FOTONIK)", "AJK.", TaskCategory.ULUL_ALBAB),

  // 7.3 Kelab Elit Robotik
  createTask('79', "KELAB ELIT ROBOTIK", "Ketua.", TaskCategory.ULUL_ALBAB),
  createTask('35', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('72', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('63', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('53', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('90', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('100', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('105', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('40', "KELAB ELIT ROBOTIK", "AJK.", TaskCategory.ULUL_ALBAB),

  // 7.4 Kelab Elit Berkuda
  createTask('58', "KELAB ELIT BERKUDA", "Ketua.", TaskCategory.ULUL_ALBAB),
  createTask('50', "KELAB ELIT BERKUDA", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('73', "KELAB ELIT BERKUDA", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('54', "KELAB ELIT BERKUDA", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('89', "KELAB ELIT BERKUDA", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('91', "KELAB ELIT BERKUDA", "AJK.", TaskCategory.ULUL_ALBAB),

  // 7.5 Kelab STEM / SEM / Inovasi
  createTask('46', "KELAB STEM / SEM/ INOVASI", "Ketua.", TaskCategory.ULUL_ALBAB),
  createTask('29', "KELAB STEM / SEM/ INOVASI", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('43', "KELAB STEM / SEM/ INOVASI", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('23', "KELAB STEM / SEM/ INOVASI", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('31', "KELAB STEM / SEM/ INOVASI", "AJK.", TaskCategory.ULUL_ALBAB),

  // 8. JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)
  createTask('21', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "Setiausaha.", TaskCategory.ULUL_ALBAB),
  createTask('55', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('82', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('83', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('57', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('111', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('69', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('9', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('36', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('77', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('85', "JAWATANKUASA PROGRAM KOMUNITI & KEMASYARAKATAN (OUTDOOR ACTIVITIES)", "AJK.", TaskCategory.ULUL_ALBAB),

  // 9. JAWATANKUASA PEMIKIR ANDALUSIA 2.0
  createTask('54', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "Setiausaha.", TaskCategory.ULUL_ALBAB),
  createTask('13', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('42', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('14', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('79', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('102', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('96', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "AJK.", TaskCategory.ULUL_ALBAB),
  createTask('17', "JAWATANKUASA PEMIKIR ANDALUSIA 2.0", "AJK.", TaskCategory.ULUL_ALBAB),
];

export const INITIAL_TASKS: Task[] = [...adminTasks, ...curriculumTasks, ...hemTasks, ...kokurikulumTasks, ...ululAlbabTasks];
