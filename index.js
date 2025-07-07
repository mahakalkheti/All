const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Attendance = require('./models/Attendance');
const fs = require('fs');
require('dotenv').config();
const uploadsDir = './uploads';

const app = express();
const PORT = process.env.PORT || 8080;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/attendanceDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("✅ MongoDB connected");
// }).catch((err) => {
//     console.error("❌ MongoDB error:", err);
// });

const mongoose = require('mongoose');


async function connectDB() {
    try {
        const DB_PASS = process.env.DB_PASS;
        const DB_USER  = process.env.DB_USER;
        const mongodbURL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.iwaylz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        // const mongodbURL = 'mongodb://localhost:27017/attendanceDB';
        await mongoose.connect(mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
connectDB();


// Student data for all classes
const studentsData = {
    "Nursery": [
        {name: "Aarav Kumar", roll: "N001"},
        {name: "Diya Sharma", roll: "N002"},
        {name: "Arjun Singh", roll: "N003"},
        {name: "Kavya Patel", roll: "N004"},
        {name: "Rohan Gupta", roll: "N005"}
    ],
    "LKG": [
        {name: "Anaya Joshi", roll: "L001"},
        {name: "Karan Mehta", roll: "L002"},
        {name: "Priya Agarwal", roll: "L003"},
        {name: "Vihaan Shah", roll: "L004"},
        {name: "Isha Verma", roll: "L005"}
    ],
    "UKG": [
        {name: "Aditya Rao", roll: "U001"},
        {name: "Myra Kapoor", roll: "U002"},
        {name: "Aryan Jain", roll: "U003"},
        {name: "Saanvi Reddy", roll: "U004"},
        {name: "Daksh Bhatt", roll: "U005"}
    ],
    "1st": [
        {name: "Avnixx Malhotra", roll: "1001"},
        {name: "Reyansh Tiwari", roll: "1002"},
        {name: "Kiara Nair", roll: "1003"},
        {name: "Aadhya Mishra", roll: "1004"},
        {name: "Vivaan Pandey", roll: "1005"},
        {name: "Anvi Saxena", roll: "1006"}
    ],
    "2nd": [
        {name: "Ishaan Bansal", roll: "2001"},
        {name: "Zara Khan", roll: "2002"},
        {name: "Arnav Chopra", roll: "2003"},
        {name: "Riya Sood", roll: "2004"},
        {name: "Kabir Sethi", roll: "2005"},
        {name: "Mira Ghosh", roll: "2006"}
    ],
    "3rd": [
        {name: "Atharv Bose", roll: "3001"},
        {name: "Siya Dutta", roll: "3002"},
        {name: "Advait Khanna", roll: "3003"},
        {name: "Nitya Arora", roll: "3004"},
        {name: "Yash Goyal", roll: "3005"},
        {name: "Tanvi Sinha", roll: "3006"}
    ],
    "4th": [
        {name: "Shivansh Kumar", roll: "4001"},
        {name: "Anika Gupta", roll: "4002"},
        {name: "Dhruv Sharma", roll: "4003"},
        {name: "Shreya Joshi", roll: "4004"},
        {name: "Ayaan Patel", roll: "4005"},
        {name: "Navya Singh", roll: "4006"},
        {name: "Rudra Mehta", roll: "4007"}
    ],
    "5th": [
        {name: "Aarush Agarwal", roll: "5001"},
        {name: "Aditi Shah", roll: "5002"},
        {name: "Krishna Verma", roll: "5003"},
        {name: "Palak Rao", roll: "5004"},
        {name: "Shaurya Kapoor", roll: "5005"},
        {name: "Vrinda Jain", roll: "5006"},
        {name: "Arjun Reddy", roll: "5007"}
    ],
    "6th": [
        {name: "Sarthak Bhatt", roll: "6001"},
        {name: "Kashvi Malhotra", roll: "6002"},
        {name: "Vedant Tiwari", roll: "6003"},
        {name: "Aanya Nair", roll: "6004"},
        {name: "Agastya Mishra", roll: "6005"},
        {name: "Pihu Pandey", roll: "6006"},
        {name: "Raghav Saxena", roll: "6007"},
        {name: "Mahika Bansal", roll: "6008"}
    ],
    "7th": [
        {name: "Devang Khan", roll: "7001"},
        {name: "Sanvi Chopra", roll: "7002"},
        {name: "Hriday Sood", roll: "7003"},
        {name: "Jaanvi Sethi", roll: "7004"},
        {name: "Viraj Ghosh", roll: "7005"},
        {name: "Mishti Bose", roll: "7006"},
        {name: "Atharva Dutta", roll: "7007"},
        {name: "Samaira Khanna", roll: "7008"}
    ],
    "8th": [
        {name: "Pranav Arora", roll: "8001"},
        {name: "Ananya Goyal", roll: "8002"},
        {name: "Tejas Sinha", roll: "8003"},
        {name: "Aarya Kumar", roll: "8004"},
        {name: "Rishabh Gupta", roll: "8005"},
        {name: "Mehak Sharma", roll: "8006"},
        {name: "Shivam Joshi", roll: "8007"},
        {name: "Khushi Patel", roll: "8008"},
        {name: "Aryan Singh", roll: "8009"}
    ],
    "9th": [
        {name: "Aayush Mehta", roll: "9001"},
        {name: "Disha Agarwal", roll: "9002"},
        {name: "Krish Shah", roll: "9003"},
        {name: "Tara Verma", roll: "9004"},
        {name: "Harsh Rao", roll: "9005"},
        {name: "Naina Kapoor", roll: "9006"},
        {name: "Siddharth Jain", roll: "9007"},
        {name: "Kavya Reddy", roll: "9008"},
        {name: "Nikhil Bhatt", roll: "9009"},
        {name: "Pooja Malhotra", roll: "9010"}
    ],
    "10th": [
        {name: "Raghav Tiwari", roll: "10001"},
        {name: "Shreya Nair", roll: "10002"},
        {name: "Anirudh Mishra", roll: "10003"},
        {name: "Rhea Pandey", roll: "10004"},
        {name: "Varun Saxena", roll: "10005"},
        {name: "Anushka Bansal", roll: "10006"},
        {name: "Kartik Khan", roll: "10007"},
        {name: "Divya Chopra", roll: "10008"},
        {name: "Abhay Sood", roll: "10009"},
        {name: "Ritika Sethi", roll: "10010"}
    ],
    "11th": [
        {name: "Aakash Ghosh", roll: "11001"},
        {name: "Simran Bose", roll: "11002"},
        {name: "Rohit Dutta", roll: "11003"},
        {name: "Sneha Khanna", roll: "11004"},
        {name: "Akshay Arora", roll: "11005"},
        {name: "Prachi Goyal", roll: "11006"},
        {name: "Manav Sinha", roll: "11007"},
        {name: "Sakshi Kumar", roll: "11008"},
        {name: "Karthik Gupta", roll: "11009"},
        {name: "Natasha Sharma", roll: "11010"},
        {name: "Vikram Joshi", roll: "11011"}
    ],
    "12th": [
        {name: "Rajesh Patel", roll: "12001"},
        {name: "Meera Singh", roll: "12002"},
        {name: "Arjun Mehta", roll: "12003"},
        {name: "Nidhi Agarwal", roll: "12004"},
        {name: "Suresh Shah", roll: "12005"},
        {name: "Deepika Verma", roll: "12006"},
        {name: "Amit Rao", roll: "12007"},
        {name: "Swati Kapoor", roll: "12008"},
        {name: "Ravi Jain", roll: "12009"},
        {name: "Preeti Reddy", roll: "12010"},
        {name: "Anil Bhatt", roll: "12011"},
        {name: "Sunita Malhotra", roll: "12012"}
    ]
};

// mongodb code
app.post('/attendance/:className', async (req, res) => {
    const { className } = req.params;
    const { date, attendance } = req.body;

    if (!studentsData[className]) {
        return res.status(404).json({ error: 'Class not found' });
    }

    // 🧠 Update in-memory attendanceData (optional)
    Object.keys(attendance).forEach(rollNo => {
        const attendanceKey = `${className}_${rollNo}_${date}`;
        attendanceData[attendanceKey] = attendance[rollNo];
    });

    // 🆕 MongoDB: Save attendance to DB
    const studentList = Object.keys(attendance).map(roll => ({
        roll,
        isPresent: attendance[roll]
    }));

    // ✅ Upsert attendance record (update if exists, else create)
    await Attendance.findOneAndUpdate(
        { className, date },
        { students: studentList },
        { upsert: true, new: true }
    );

    res.json({ success: true, message: `Attendance saved for ${className} on ${date}` });
});


// In-memory storage for attendance (in production, use database)
let attendanceData = {};

// Initialize sample data
function initializeSampleData() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    Object.keys(studentsData).forEach(className => {
        studentsData[className].forEach((student, index) => {
            attendanceData[`${className}_${student.roll}_${today}`] = Math.random() > 0.2;
            attendanceData[`${className}_${student.roll}_${yesterdayStr}`] = Math.random() > 0.15;
        });
    });
}

// Initialize sample data
initializeSampleData();
app.get("/",(req,res)=>{
    res.render("main.ejs");
})
app.get('/atten',(req,res)=>{
    res.render('index.ejs');
})

// Routes
app.get('/attendance', (req, res) => {
    const currentDate = new Date().toISOString().split('T')[0];
    res.render('index', { 
        studentsData, 
        attendanceData, 
        currentDate,
        classes: Object.keys(studentsData)
    });
});

// FIXED: Updated attendance endpoint to handle both individual updates and bulk saves
app.post('/attendance/:className', (req, res) => {
    const { className } = req.params;
    const { date, attendance } = req.body;
    
    if (!studentsData[className]) {
        return res.status(404).json({ error: 'Class not found' });
    }
    
    // Update attendance data
    Object.keys(attendance).forEach(rollNo => {
        const attendanceKey = `${className}_${rollNo}_${date}`;
        attendanceData[attendanceKey] = attendance[rollNo];
    });
    
    res.json({ success: true, message: `Attendance saved for ${className}` });
});


// NEW: Individual attendance update endpoint
app.put('/attendance/:className/:rollNo', (req, res) => {
    const { className, rollNo } = req.params;
    const { date, isPresent } = req.body;
    
    if (!studentsData[className]) {
        return res.status(404).json({ error: 'Class not found' });
    }
    
    const attendanceKey = `${className}_${rollNo}_${date}`;
    attendanceData[attendanceKey] = isPresent;
    
    res.json({ success: true, message: 'Attendance updated' });
});

app.get('/students/:className', (req, res) => {
    const { className } = req.params;
    const { date } = req.query;
    
    if (!studentsData[className]) {
        return res.status(404).json({ error: 'Class not found' });
    }
    
    const students = studentsData[className].map(student => {
        const attendanceKey = `${className}_${student.roll}_${date}`;
        return {
            ...student,
            isPresent: attendanceData[attendanceKey] !== false
        };
    });
    
    res.json({ students });
});

// FIXED: Updated stats endpoint to provide real-time calculations
app.get('/stats/:className', (req, res) => {
    const { className } = req.params;
    const { date } = req.query;
    
    if (!studentsData[className]) {
        return res.status(404).json({ error: 'Class not found' });
    }
    
    const students = studentsData[className];
    let presentCount = 0;
    let totalCount = students.length;
    
    students.forEach(student => {
        const attendanceKey = `${className}_${student.roll}_${date}`;
        if (attendanceData[attendanceKey] !== false) {
            presentCount++;
        }
    });
    
    const absentCount = totalCount - presentCount;
    const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
    
    res.json({
        totalStudents: totalCount,
        presentStudents: presentCount,
        absentStudents: absentCount,
        attendancePercentage
    });
});


app.get('/reports/:className', async (req, res) => {
    const { className } = req.params;
    const { type, date } = req.query;

    if (!studentsData[className]) {
        return res.status(404).json({ error: 'Class not found' });
    }

    const currentDate = new Date(date);
    const students = studentsData[className];
    const reports = [];

    for (let student of students) {
        let presentDays = 0;
        let totalDays = 0;
        let attendanceDates = [];

        if (type === 'monthly') {
            const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            // Get all records for the class in selected month
            attendanceDates = await Attendance.find({
                className,
                date: {
                    $gte: start.toISOString().split('T')[0],
                    $lte: end.toISOString().split('T')[0]
                }
            });

        } else if (type === 'yearly') {
            const yearStart = new Date(currentDate.getFullYear(), 0, 1);
            const yearEnd = new Date(currentDate.getFullYear(), 11, 31);

            attendanceDates = await Attendance.find({
                className,
                date: {
                    $gte: yearStart.toISOString().split('T')[0],
                    $lte: yearEnd.toISOString().split('T')[0]
                }
            });
        }

        // Loop through attendance documents
        for (let record of attendanceDates) {
            totalDays++;
            const studentRecord = record.students.find(s => s.roll === student.roll);
            if (studentRecord && studentRecord.isPresent) {
                presentDays++;
            }
        }

        const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;
        const attendanceClass = percentage >= 80 ? 'high-attendance'
                                : percentage >= 60 ? 'medium-attendance'
                                : 'low-attendance';

        reports.push({
            name: student.name,
            roll: student.roll,
            percentage,
            attendanceClass,
            presentDays,
            totalDays
        });
    }

    reports.sort((a, b) => b.percentage - a.percentage);
    res.json({ reports });
});


const multer = require('multer');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


const contactSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  phone1: String,
  phone2: String,
  address: String,
  className: String,
  photo: String, // image filename
});

const Contact = mongoose.model('Contact', contactSchema);



app.get('/phonebook', async (req, res) => {
  const search = req.query.search || '';
  const classFilter = req.query.classFilter || '';

  let filter = {
    name: { $regex: search, $options: 'i' },
  };
  if (classFilter) filter.className = classFilter;

  const contacts = await Contact.find(filter);
  const allClasses = await Contact.distinct('className');

  res.render('phone', {
    contacts,
    search,
    selectedClass: classFilter,
    classList: allClasses,
  });
});

app.use('/uploads', express.static('uploads'));

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', upload.single('photo'), async (req, res) => {
  const { name, fatherName, phone1, phone2, address, className } = req.body;
  const photo = req.file ? req.file.filename : '';
  await Contact.create({ name, fatherName, phone1, phone2, address, className, photo });
  res.redirect('/phonebook');
});


app.get('/edit/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('edit', { contact });
});

app.post('/edit/:id', upload.single('photo'), async (req, res) => {
  const { name, fatherName, phone1, phone2, address, className } = req.body;
  
  const updatedData = {
    name,
    fatherName,
    phone1,
    phone2,
    address,
    className,
  };

  if (req.file) {
    updatedData.photo = req.file.filename;
  }

  await Contact.findByIdAndUpdate(req.params.id, updatedData);
  res.redirect('/phonebook');
});


app.get('/delete/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect('/phonebook');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});