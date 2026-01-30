// 1. قاعدة بيانات الأدعية (تتغير كل 30 ثانية)
const ramadanDuas = [
    "اللهم اجعل صيامنا فيه صيام الصائمين، وقيامنا فيه قيام القائمين.",
    "اللهم ارزقنا فيه طاعة الخاشعين، واشرح فيه صدورنا بإنابة المخبتين.",
    "اللهم اجعلنا فيه من المتوكلين عليك، الفائزين لديك، المقربين إليك.",
    "اللهم حبب إلينا فيه الإحسان، وكره إلينا فيه الفسوق والعصيان.",
    "اللهم اهدنا فيه لصالح الأعمال، واقضِ لنا فيه الحوائج والآمال.",
    "اللهم وفر فيه حظنا من بركاته، وسهل سبيلنا إلى خيراته.",
    "اللهم افتح لنا فيه أبواب الجنان، وأغلق عنا فيه أبواب النيران.",
    "اللهم وفقنا فيه لقراءة قرآنك، يا منزل السكينة في قلوب المؤمنين.",
    "اللهم اجعلنا ممن تدركهم الرحمة ثم المغفرة ثم العتق من النار."
];

// 2. قاعدة بيانات المواقيت الأساسية لليوم الأول (رمضان 2026)
const cityData = {
    tripoli: {
        fajr: { h: 5, m: 52 },
        sunrise: { h: 7, m: 20 },
        dhuhr: { h: 13, m: 10 },
        asr: { h: 16, m: 15 },
        maghrib: { h: 19, m: 02 },
        isha: { h: 20, m: 25 }
    },
    ghadames: {
        fajr: { h: 6, m: 12 },
        sunrise: { h: 7, m: 35 },
        dhuhr: { h: 13, m: 28 },
        asr: { h: 16, m: 38 },
        maghrib: { h: 19, m: 22 },
        isha: { h: 20, m: 42 }
    }
};

const daysAr = ["الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد", "الاثنين", "الثلاثاء"];

// --- وظيفة توليد الجدول الكامل (30 يوماً) ---
// 1. قاعدة بيانات المواقيت (أدخل المواقيت الصحيحة هنا)
const ramadanTimes = {
    tripoli: [
        { day: 1, date: "1 مارس", fajr: "05:40", shuruq: "07:05", dhuhr: "13:02", asr: "16:20", maghrib: "18:55", isha: "20:15" },
        { day: 2, date: "2 مارس", fajr: "05:39", shuruq: "07:04", dhuhr: "13:02", asr: "16:21", maghrib: "18:56", isha: "20:16" },
        { day: 3, date: "3 مارس", fajr: "05:38", shuruq: "07:03", dhuhr: "13:02", asr: "16:22", maghrib: "18:57", isha: "20:17" },
        // يمكنك إضافة باقي الأيام بنفس الطريقة هنا
    ],
    ghadames: [
        { day: 1, date: "1 مارس", fajr: "06:49", shuruq: "07:15", dhuhr: "13:15", asr: "16:35", maghrib: "19:10", isha: "20:25" },
        { day: 2, date: "2 مارس", fajr: "05:54", shuruq: "07:14", dhuhr: "13:15", asr: "16:36", maghrib: "19:11", isha: "20:26" },
		{ day: 3, date: "3 مارس", fajr: "05:54", shuruq: "07:14", dhuhr: "13:15", asr: "16:36", maghrib: "19:11", isha: "20:26" },
		{ day: 4, date: "4 مارس", fajr: "05:54", shuruq: "07:14", dhuhr: "13:15", asr: "16:36", maghrib: "19:11", isha: "20:26" },
		{ day: 5, date: "5 مارس", fajr: "05:54", shuruq: "07:14", dhuhr: "13:15", asr: "16:36", maghrib: "19:11", isha: "20:26" },
		{ day: 6, date: "6 مارس", fajr: "05:54", shuruq: "07:14", dhuhr: "13:15", asr: "16:36", maghrib: "19:11", isha: "20:26" },
		{ day: 7, date: "7 مارس", fajr: "05:54", shuruq: "07:14", dhuhr: "13:15", asr: "16:36", maghrib: "19:11", isha: "20:26" },
        // أضف باقي أيام غدامس هنا
    ]
};

// 2. وظيفة إنشاء الجدول بناءً على البيانات أعلاه
function generateRamadanTable() {
    const city = document.getElementById('citySwitcher').value;
    const data = ramadanTimes[city];
    const tbody = document.getElementById('timetableBody');
    
    if(!tbody) return;
    tbody.innerHTML = ""; 

    // مصفوفة أسماء الأيام باللغة العربية
    const arabicDays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

    data.forEach(row => {
        // تحويل التاريخ النصي (مثلاً "1 مارس") إلى تاريخ حقيقي لمعرفة اسم اليوم
        // سنفترض السنة 2026 كما في الموقع
        const dayNumber = parseInt(row.date); // يأخذ الرقم من "1 مارس"
        const dateObj = new Date(2026, 2, dayNumber); // رقم 2 يعني شهر مارس في البرمجة
        const dayName = arabicDays[dateObj.getDay()]; // الحصول على اسم اليوم من المصفوفة

        const tr = document.createElement('tr');
        
        // تمييز يوم الجمعة بلون مختلف قليلاً (اختياري)
        if(dayName === "الجمعة") tr.style.color = "var(--main-color)";

        tr.innerHTML = `
            <td>${row.day}</td>
            <td style="font-weight: bold;">${dayName}</td>
            <td class="date-col">${row.date}</td>
            <td>${row.fajr}</td>
            <td>${row.shuruq}</td>
            <td>${row.dhuhr}</td>
            <td>${row.asr}</td>
            <td class="highlight-maghrib">${row.maghrib}</td>
            <td>${row.isha}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // تحديث الملخص العلوي أيضاً
    updateTodaySummary(); 
}

// وظيفة مساعدة لمعرفة اسم اليوم (سبت، أحد...)
function getDayName(dateString) {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    // هذه الوظيفة تفترض تاريخاً معيناً، يمكنك تحسينها لاحقاً
    return "سيتم تحديده"; 
}

// --- وظيفة تبديل الأدعية تلقائياً كل 30 ثانية ---
let duaIndex = 0;
function rotateDua() {
    const duaElement = document.getElementById('dua-text');
    if (!duaElement) return;

    duaElement.style.opacity = 0; // تأثير تلاشي للخروج

    setTimeout(() => {
        duaIndex = (duaIndex + 1) % ramadanDuas.length;
        duaElement.innerText = ramadanDuas[duaIndex];
        duaElement.style.opacity = 1; // تأثير تلاشي للدخول
    }, 500);
}

// --- وظائف التحكم في نافذة "نبذة عنا" ---
function showAbout() {
    document.getElementById('about-section').style.display = 'block';
}

function closeAbout() {
    document.getElementById('about-section').style.display = 'none';
}

// --- تشغيل الوظائف عند تحميل الصفحة ---
window.onload = () => {
    generateRamadanTable();
    
    // ضبط أول دعاء
    const duaElement = document.getElementById('dua-text');
    if(duaElement) duaElement.innerText = ramadanDuas[0];
    
    // تشغيل العداد التلقائي للأدعية (كل 30000 مللي ثانية = 30 ثانية)
    setInterval(rotateDua, 30000);
};
// وظيفة العداد التنازلي وشريط الإنجاز
function updateCountdown() {
    const now = new Date();
    const city = document.getElementById('citySwitcher').value;
    
    // 1. جلب بيانات اليوم الحالي من المصفوفة الجديدة
    const data = ramadanTimes[city];
    const today = now.getDate();
    // البحث عن بيانات اليوم أو أخذ اليوم الأول كافتراضي
    let todayData = data.find(d => d.date.includes(today)) || data[0];

    // 2. تحويل وقت الفجر والمغرب من نصوص (05:40) إلى تواريخ حقيقية
    const [fH, fM] = todayData.fajr.split(':');
    const [mH, mM] = todayData.maghrib.split(':');

    const maghribDate = new Date();
    maghribDate.setHours(parseInt(mH), parseInt(mM), 0);

    const fajrDate = new Date();
    fajrDate.setHours(parseInt(fH), parseInt(fM), 0);

    const diff = maghribDate - now;

    if (diff > 0) {
        // حساب الوقت المتبقي
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        // تحديث النص في الصفحة
        document.getElementById('countdown').innerText = 
            `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        // 3. تحديث شريط الإنجاز بدقة بناءً على الفجر والمغرب في الجدول
        const totalFastingMs = maghribDate - fajrDate;
        const passedMs = now - fajrDate;
        const progress = Math.max(0, Math.min(100, (passedMs / totalFastingMs) * 100));
        
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

    } else {
        // وقت الإفطار
        document.getElementById('countdown').innerText = "حان وقت الإفطار!";
        document.getElementById('timer-label').innerText = "تقبل الله صيامكم";
        if (document.getElementById('progress-bar')) {
            document.getElementById('progress-bar').style.width = "100%";
        }
        
        // تشغيل صوت الإفطار (يتم التأكد أنه يشتغل لمرة واحدة فقط)
        const sound = document.getElementById('iftaar-sound');
        if (sound && !sound.getAttribute('played')) {
            sound.play();
            sound.setAttribute('played', 'true'); // علامة لكي لا يتكرر الصوت في كل ثانية
        }
    }
}

// تشغيل العداد كل ثانية
setInterval(updateCountdown, 1000);

// إضافة وظيفة "الوضع التلقائي" (تغيير الخلفية ليلاً)
function applyAutoTheme() {
    const hour = new Date().getHours();
    if (hour >= 19 || hour <= 5) {
        document.body.style.filter = "contrast(1.1) brightness(0.9)";
    } else {
        document.body.style.filter = "none";
    }
}
setInterval(applyAutoTheme, 60000);
function downloadDua() {
    const card = document.getElementById('dua-card');
    const btn = card.querySelector('button');

    // 1. إخفاء الزر مؤقتاً لكي لا يظهر في الصورة
    btn.style.display = 'none';
    card.classList.add('taking-screenshot');

    // 2. استخدام المكتبة لالتقاط الصورة
    html2canvas(card, {
        backgroundColor: '#000a1a',
        scale: 2 // لزيادة دقة الصورة
    }).then(canvas => {
        // 3. تحويل الكانفاس إلى رابط تحميل
        const link = document.createElement('a');
        link.download = 'رمضان_2026_دعاء.png';
        link.href = canvas.toDataURL("image/png");
        link.click();

        // 4. إعادة الزر وإزالة التنسيق المؤقت
        btn.style.display = 'inline-block';
        card.classList.remove('taking-screenshot');
    });
}
function saveQuranProgress() {
    const part = document.getElementById('quran-part').value;
    localStorage.setItem('myRamadanProgress', part);
    displayQuranStatus();
}

function displayQuranStatus() {
    const savedPart = localStorage.getItem('myRamadanProgress') || 0;
    document.getElementById('quran-status').innerText = `أنت الآن في الجزء (${savedPart}). تبقى لك ${30 - savedPart} أجزاء للختم!`;
}

// استدعاء الوظيفة عند التحميل لضمان بقاء البيانات
window.addEventListener('load', displayQuranStatus);
// --- 1. نظام التحديد التلقائي للموقع ---
function autoDetectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // إحداثيات تقريبية لطرابلس وغدامس للمقارنة
            const tripoli = { lat: 32.8872, lon: 13.1913 };
            const ghadames = { lat: 30.1337, lon: 9.5007 };

            // حساب المسافة البسيطة لاختيار أقرب مدينة
            const distToTripoli = Math.sqrt(Math.pow(lat - tripoli.lat, 2) + Math.pow(lon - tripoli.lon, 2));
            const distToGhadames = Math.sqrt(Math.pow(lat - ghadames.lat, 2) + Math.pow(lon - ghadames.lon, 2));

            const citySwitcher = document.getElementById('citySwitcher');
            if (distToGhadames < distToTripoli) {
                citySwitcher.value = "ghadames";
                document.getElementById('location-status').innerText = "تم ضبط الموقع تلقائياً على: غدامس";
            } else {
                citySwitcher.value = "tripoli";
                document.getElementById('location-status').innerText = "تم ضبط الموقع تلقائياً على: طرابلس";
            }
            generateRamadanTable(); // تحديث الجدول بناءً على الموقع المكتشف
        }, () => {
            document.getElementById('location-status').innerText = "تعذر تحديد الموقع، يرجى الاختيار يدوياً.";
        });
    }
}

// --- 2. نظام التنبيهات (الإشعارات) ---
function setupNotifications() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            alert("تم تفعيل التنبيهات بنجاح! سنقوم بتنبيهك قبل الأذان.");
            document.getElementById('notify-btn').style.display = "none";
            checkForUpcomingAzan();
        }
    });
}

function checkAndNotify(azanName, azanTime) {
    const now = new Date();
    const azanDate = new Date();
    azanDate.setHours(azanTime.h, azanTime.m, 0);

    const diff = azanDate - now;
    
    // التنبيه قبل الأذان بـ 15 دقيقة (900000 مللي ثانية)
    if (diff > 0 && diff <= 900000 && !window.notified) {
        new Notification("تنبيه أذان " + azanName, {
            body: `بقي 15 دقيقة على أذان ${azanName}. جهز نفسك للدعاء الصالح.`,
            icon: "favicon.png"
        });
        window.notified = true; // منع تكرار التنبيه لنفس الأذان
    }
}

// تشغيل فحص التنبيهات كل دقيقة
setInterval(() => {
    const city = document.getElementById('citySwitcher').value;
    const times = cityData[city];
    checkAndNotify("المغرب", times.maghrib);
    checkAndNotify("الفجر", times.fajr);
}, 60000);

// إضافة استدعاء تحديد الموقع عند تحميل الصفحة
window.addEventListener('load', autoDetectLocation);
function displayTodaySummary() {
    const city = document.getElementById('citySwitcher').value;
    const times = cityData[city];
    const summaryDiv = document.getElementById('today-times');
    
    summaryDiv.innerHTML = `
        <div class="time-box"><span>الفجر</span><br><b style="color:var(--neon-cyan)">${times.fajr.h}:${times.fajr.m}</b></div>
        <div class="time-box"><span>المغرب</span><br><b style="color:var(--neon-green)">${times.maghrib.h}:${times.maghrib.m}</b></div>
        <div class="time-box"><span>العشاء</span><br><b>${times.isha.h}:${times.isha.m}</b></div>
    `;
}
// استدعِ هذه الوظيفة داخل window.onload وفي وظيفة تغيير المدينة
// 1. وظيفة البحث في الجدول
function filterTable() {
    let input = document.getElementById("tableSearch").value.toLowerCase();
    let rows = document.getElementById("timetableBody").getElementsByTagName("tr");

    for (let row of rows) {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    }
}

// 2. تحديث ملخص اليوم
function updateTodaySummary() {
    const city = document.getElementById('citySwitcher').value;
    const data = ramadanTimes[city]; // سحب البيانات من المصفوفة التي أنشأناها يدوياً
    const container = document.getElementById('today-times');
    
    // الحصول على تاريخ اليوم الحالي
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;

    // البحث عن بيانات اليوم الحالي داخل الجدول
    // نفترض أن رمضان في شهر مارس (3)
    let todayData = data.find(d => d.date.includes(currentDay) && currentMonth === 3);

    // إذا كنا خارج أيام رمضان، اعرض أول يوم كنموذج
    if (!todayData) todayData = data[0];

    // تحديث المحتوى مع الحفاظ على الألوان الجديدة (الذهبي والبرتقالي)
    container.innerHTML = `
        <div class="time-box">
            <span>الفجر</span><br>
            <b style="color:var(--main-color)">${todayData.fajr}</b>
        </div>
        <div class="time-box">
            <span>المغرب</span><br>
            <b style="color:var(--accent-color)">${todayData.maghrib}</b>
        </div>
        <div class="time-box">
            <span>العشاء</span><br>
            <b>${todayData.isha}</b>
        </div>
    `;

    // تحديث العداد التنازلي بناءً على مغرب اليوم المختار
    if (typeof updateCountdown === "function") {
        updateCountdown(todayData.maghrib);
    }
}

// 3. تأثير النجوم التفاعلية مع الماوس
document.addEventListener('mousemove', (e) => {
    const stars = document.querySelector('.background-stars');
    let x = (window.innerWidth - e.pageX * 2) / 100;
    let y = (window.innerHeight - e.pageY * 2) / 100;
    stars.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// 4. مراقب التمرير (Scroll Observer) للظهور التدريجي
function revealElements() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 50) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealElements);

// تأكد من استدعاء الوظائف الجديدة في window.onload
const originalOnload = window.onload;
window.onload = () => {
    if(originalOnload) originalOnload();
    updateTodaySummary();
    revealElements(); // لتشغيل العناصر الموجودة في الأعلى فوراً
};
// فتح وإغلاق النافذة
function toggleTools() {
    const modal = document.getElementById('tools-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    if(modal.style.display === 'flex') calculateQibla();
}

// منطق البوصلة (تقريبي لليبيا)
function calculateQibla() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const kaaba = { lat: 21.4225, lon: 39.8262 };
            const y = Math.sin(kaaba.lon - pos.coords.longitude);
            const x = Math.cos(pos.coords.latitude) * Math.tan(kaaba.lat) - Math.sin(pos.coords.latitude) * Math.cos(kaaba.lon - pos.coords.longitude);
            const qiblaAngle = Math.atan2(y, x) * 180 / Math.PI;
            document.getElementById('compass-pointer').style.transform = `rotate(${qiblaAngle}deg)`;
            document.getElementById('qibla-dir').innerText = `اتجاه القبلة بالنسبة للشمال: ${Math.round(qiblaAngle)}°`;
        });
    }
}

// فانوس الذكريات
const tips = [
    "هل تعلم؟ غدامس تُلقب بـ 'لؤلؤة الصحراء' ولها تقاليد فريدة في سحورها.",
    "نصيحة: ابدأ إفطارك بالتمر والماء لتهيئ معدتك بعد صيام طويل.",
    "ذكرى: مدفع الإفطار في طرابلس قديماً كان يُسمع من قلعة السراي الحمراء.",
    "معلومة: سنة 2026 سيوافق رمضان في فصل الشتاء الجميل في ليبيا."
];

function glowLantern() {
    const box = document.getElementById('lantern-text');
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    box.style.opacity = 0;
    setTimeout(() => {
        box.innerText = randomTip;
        box.style.opacity = 1;
    }, 300);
}
// --- منطق المسبحة ---
let tasbeehCount = localStorage.getItem('tasbeehCount') || 0;
document.getElementById('tasbeeh-display').innerText = tasbeehCount;

function incrementTasbeeh() {
    tasbeehCount++;
    document.getElementById('tasbeeh-display').innerText = tasbeehCount;
    localStorage.setItem('tasbeehCount', tasbeehCount);
    
    // إضافة اهتزاز بسيط للهواتف
    if (navigator.vibrate) navigator.vibrate(50);
}

function resetTasbeeh() {
    if(confirm("هل تريد تصفير العداد؟")) {
        tasbeehCount = 0;
        document.getElementById('tasbeeh-display').innerText = 0;
        localStorage.setItem('tasbeehCount', 0);
    }
}

// --- منطق حاسبة الزكاة ---
function calculateZakat() {
    const count = document.getElementById('family-count').value || 0;
    const result = document.getElementById('zakat-result');
    if (count > 0) {
        // القاعدة الشرعية: صاع نبوي (حوالي 2.5 - 3 كجم)
        result.innerHTML = `الإجمالي لـ ${count} أفراد هو: ${count * 1} صاع <br> (حوالي ${count * 2.5} كجم من القمح أو التمر)`;
    } else {
        result.innerText = "يرجى إدخال عدد الأفراد";
    }
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// إغلاق القائمة عند الضغط في أي مكان خارجها
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.menu-icon');
    if (!sidebar.contains(e.target) && !menuIcon.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});
const spiritualMessages = [
    "﴿وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ﴾.. الله يسمع نبض قلبك قبل لسانك.",
    "صيامك ارتقاء لروحك.. تذكر أنك في أيام الرحمة والمغفرة.",
    "بينك وبين الإفطار دعوة مستجابة.. خبئها في قلبك وأطلقها بيقين عند الغروب.",
    "رمضان شهر الجبر.. استبشر خيراً فالله سيجبر خاطرك بما تمنيت."
];

function showDailyMessage() {
    if (!sessionStorage.getItem('shownMessage')) {
        const msg = spiritualMessages[Math.floor(Math.random() * spiritualMessages.length)];
        const msgDiv = document.createElement('div');
        msgDiv.id = 'spiritual-popup';
        msgDiv.className = 'spiritual-popup';
        msgDiv.innerHTML = `
            <div class="msg-content reveal active">
                <span class="close-msg" onclick="closeSpiritualMsg()">×</span>
                <div style="font-size: 2.5rem; margin-bottom: 15px;">🌙</div>
                <p id="typed-text">${msg}</p>
            </div>
        `;
        document.body.appendChild(msgDiv);
        sessionStorage.setItem('shownMessage', 'true');
    }
}

function closeSpiritualMsg() {
    const el = document.getElementById('spiritual-popup');
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
}

// استدعِ showDailyMessage() داخل window.onload
function lightBranch(element) {
    element.classList.toggle('lit');
    if (element.classList.contains('lit') && navigator.vibrate) {
        navigator.vibrate(30); // اهتزاز خفيف عند الإنجاز
    }
}

function resetTree() {
    if(confirm("هل تريد تصفير الشجرة لبدء يوم جديد من الخير؟")) {
        document.querySelectorAll('.tree-branch').forEach(b => b.classList.remove('lit'));
    }
}
window.addEventListener('load', () => {
    generateRamadanTable();
});
window.addEventListener('load', () => {
    // 1. إنشاء الجدول أولاً
    generateRamadanTable(); 
    // 2. تحديث الملخص (وهو بدوره سيشغل العداد)
    updateTodaySummary();
    // 3. إظهار رسالة الترحيب
    showDailyMessage();
});
window.addEventListener('load', () => {
    // تشغيل الوظائف الأساسية
    generateRamadanTable();
    updateTodaySummary();
    
    // إخفاء شاشة التحميل بعد ثانية واحدة (لإعطاء شعور بالفخامة)
    setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        if (loader) {
            loader.classList.add('loader-hidden');
        }
    }, 1000); 
});
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'إمساكية رمضان 2026 - ليبيا',
            text: 'تابع مواقيت الصلاة والعد التنازلي للإفطار بدقة عبر منصة إمساكيتي.',
            url: window.location.href
        }).then(() => {
            console.log('تمت المشاركة بنجاح');
        }).catch((error) => {
            console.log('خطأ في المشاركة:', error);
        });
    } else {
        // إذا كان المتصفح لا يدعم المشاركة التلقائية
        alert("file:///C:/Users/Administrator/Desktop/MyRamadanProject/index.html " + window.location.href);
    }
}