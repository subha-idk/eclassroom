// insertData.js
import mongoose from 'mongoose';
import Student from './models/Student.js'; // adjust path if necessary

const MONGO_URL = 'mongodb://127.0.0.1:27017/attendanceApp'; // or use dotenv
const DEFAULT_PASSWORD_HASH = "$2b$10$hC2n8jQNgfAJe0guWhqXwuGG/otHs7wSTfWRbORpIdA.CzpDxfMfe";
const SECTION = "CSE_B";

const students = [
  { roll: "CSE/22/160", name: "SUBHAM NANDI" },
  { roll: "CSE/22/110", name: "ARNAB BISWAS" },
  { roll: "CSE/22/065", name: "PUSHPITA PANJA" },
  { roll: "CSE/22/153", name: "DEEP DOLAI" },
  { roll: "CSE/22/107", name: "M.HARI KISHORE" },
  { roll: "CSE/22/050", name: "SANKET MANNA" },
  { roll: "CSE/22/051", name: "ARPAN SAMANTA" },
  { roll: "CSE/22/154", name: "SAYAN PATRA" },
  { roll: "CSE/22/052", name: "SOUMIK BHUNIA" },
  { roll: "CSE/22/155", name: "SUSANTA JANA TFW" },
  { roll: "CSE/22/053", name: "NAYAN ADHIKARI" },
  { roll: "CSE/22/108", name: "SIDDHARTHA CHAKRABORTY" },
  { roll: "CSE/22/066", name: "SUDIPTA PARIA" },
  { roll: "CSE/22/161", name: "ABDUL RAJIBUL MALLICK" },
  { roll: "CSE/22/111", name: "ANIMESH SHIT" },
  { roll: "CSE/22/067", name: "GOURAB DHARA" },
  { roll: "CSE/22/068", name: "SOUMEN GIRI" },
  { roll: "CSE/22/162", name: "SOURAV KUILA" },
  { roll: "CSE/22/112", name: "APURBA RANA" },
  { roll: "CSE/22/075", name: "ANANYA MAITI" },
  { roll: "CSE/22/076", name: "SUSMITA PARIA" },
  { roll: "CSE/22/077", name: "SNEHAMOY KHANRA" },
  { roll: "CSE/22/078", name: "SAMBADI PRASANNA DOLOI" },
  { roll: "CSE/22/167", name: "SHRABAN BHUNIYA" },
  { roll: "CSE/22/079", name: "SANCHITA MANNA" },
  { roll: "CSE/22/080", name: "SUVANKAR BHAKTA" },
  { roll: "CSE/22/115", name: "KOUSIK MAITI" },
  { roll: "CSE/22/081", name: "SAYAN DEY" },
  { roll: "CSE/22/168", name: "ARNAB SAMANTA" },
  { roll: "CSE/22/116", name: "POULAMI ACHARYA" },
  { roll: "CSE/22/082", name: "PRATIKSHA PATRA" },
  { roll: "CSE/22/169", name: "SOUMYADIP GAYEN" },
  { roll: "CSE/22/083", name: "BISWAJIT SAMANTA" },
  { roll: "CSE/22/117", name: "KARTICK SAU TFW" },
  { roll: "CSE/22/170", name: "SUBHAJIT SASMAL" },
  { roll: "CSE/22/084", name: "KARTIK GHARA" },
  { roll: "CSE/22/118", name: "INDRANIL PAL" },
  { roll: "CSE/22/085", name: "LOKJIT RANA" },
  { roll: "CSE/22/119", name: "SOUMYAJIT RAY" },
  { roll: "CSE/22/086", name: "SK. AAMIR SOHAIL" },
  { roll: "CSE/22/120", name: "SOUGATA MODAK" },
  { roll: "CSE/22/121", name: "SUVODIP PATRA" },
  { roll: "CSE/22/089", name: "SUBHRANIL DAS" },
  { roll: "CSE/22/122", name: "JITENDRANATH SAHOO" },
  { roll: "CSE/22/069", name: "K.YOGESH SATHVIK" },
  { roll: "CSE/22/164", name: "INDIRA BANERJEE" },
  { roll: "CSE/22/070", name: "M.RAJA SADHVIKA" },
  { roll: "CSE/22/071", name: "PAPI PAL" },
  { roll: "CSE/22/165", name: "ARUNAVA PATRA" },
  { roll: "CSE/22/123", name: "SHUBHADIP PAL" },
  { roll: "CSE/22/124", name: "JOYDEV GHOSH" },
  { roll: "CSE/22/102", name: "SUMAN CHOWDHURY" },
  { roll: "CSE/22/091", name: "SOHAM GHOSH" },
  { roll: "CSE/22/092", name: "SHREYA BAG" },
  { roll: "CSE/22/094", name: "TAPOBRATA SAU" },
  { roll: "CSE/22/095", name: "RAJDEEP BHUKTA" },
  { roll: "CSE/22/096", name: "SUPRIYO GANTAIT" },
  { roll: "CSE/22/097", name: "SOMNATH PATRA" },
  { roll: "CSE/22/098", name: "PARTHIB PAL" },
  { roll: "CSE/22/099", name: "USHA RANI BERA TFW" },
  { roll: "CSE/22/100", name: "SAYANTAN PAUL" },
  { roll: "CSE/22/125", name: "NABARUPA BHUNIA" },
  { roll: "CSE/22/126", name: "BIBEK DUTTA" },
  { roll: "CSE/22/127", name: "ASHRUKANA MAITY" },
  { roll: "CSE/22/128", name: "RAKESH MALASH" },
  { roll: "CSE/22/130", name: "NILABJA MITRA" }
];

const formattedStudents = students.map(({ roll, name }) => ({
  name,
  roll,
  section: SECTION,
  password: DEFAULT_PASSWORD_HASH,
  createdAt: new Date()
}));

const insertStudents = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");

    const result = await Student.insertMany(formattedStudents);
    console.log(`✅ Inserted ${result.length} students`);

  } catch (err) {
    console.error("❌ Error inserting students:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
};

insertStudents();
