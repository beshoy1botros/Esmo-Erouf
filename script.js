/***** المتغيرات الأساسية *****/
let currentSection = "home";
let userData = null; // بيانات التسجيل: { name, password, phase, level }
let loggedInUser = null; // بيانات المستخدم المسجل: { name, phase, level }

/* مصفوفة النصوص الوصفية المختلفة لكل فيديو */
const uniqueTexts = [
  /*تالته ورابعه*/
  /*المستوي الاول*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*المستوي الثاني*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*الموهوبين*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*خامسة وسادسه*/
  /*المستوي الاول*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*المستوي الثاني*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*الموهوبين*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*اعدادي*/
  /*المستوي الاول*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*المستوي الثاني*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*الموهوبين*/
  "طقس اللحن",
  "طقس اللحن",
  /*ثانوي*/
  /*المستوي الاول*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*المستوي الثاني*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*الموهوبين*/
  "طقس اللحن",
  "طقس اللحن",
  /*جامعة*/
  /*المستوي الاول*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  /*المستوي الثاني*/
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
  "طقس اللحن",
];

/* دوال التحقق من صحة المدخلات */
// التحقق من أن الاسم الكامل ثلاثي
function isThreePartName(name) {
  return name.trim().split(/\s+/).length === 3;
}
// التحقق من صحة كلمة السر: 8 أحرف على الأقل وتحتوي على حروف وأرقام
function isValidPassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}

/* كائنات تحتوي على أسماء الألحان لكل مرحلة منفصلة */
const hymnNamesByHodana = {
  "المستوي الاول": [
    "سوتيس امين دمج",
    "مرد مزمور عشية وباكر وقداس عيد النيروز",
    "ختام الصلوات الاجتماعية(المياة والاهوية)",
    "هيتين القداس للعذراء+الاباء الرسل",
  ],
  "المستوي الثاني": [
    "ذكصولوجية العذراء عشية (ايريه ابصول سيل)",
    "مرد المجمع الباسيلي (ايريه بو اسمو)",
    "المزمور 150 الهوس الرابع بالطريقة السنوي",
    "مرد انجيل القداس السنوي أوأونياتو",
  ],
  الموهوبين: [
    "تي شوري السنوي",
    "لحن البركة (بدون البرلكس)",
    "لحن خين افران (التمجيد)",
  ],
};

const hymnNamesOwlaya = {
  "المستوي الاول": [
    "الليلويا فاي بيه بي",
    "مرد انجيل عيد النيروز",
    "ذوكصولوجية العذراء رفع بخور باكر",
    "طلبة افنوتي ناي نان تسبحة نصف الليل",
  ],
  "المستوي الثاني": [
    "تي شوري السنوي",
    "ذوكصولوجية الاباء الرسل (كيريوس)",
    "المزمور 149 الهوس الرابع",
    "مرد (اوس بيرين) للقداس الباسيلي",
  ],
  الموهوبين: [
    "لبش الهوس الاول خين اوشوت (اول ربعين باللحن+التكملة دمج+اخر 3 ارباع بالطريقة المطولة)",
    "مرد الابركسيس لصوم الاباء الرسل",
  ],
};

const hymnNamesTalatah = {
  "المستوي الاول": [
    "ذوكصولوجية الاباء الرسل (كيريوس)",
    "مرد امين امين طون ثاناطون",
    "مرد انجيل عشية في صوم العذراء (آ اوميش ان اسهيمي)",
    "لحن التمجيد (اك اسماروؤت)",
  ],
  "المستوي الثاني": [
    "طاي شوري السنوي",
    "ذكصولوجية العذراء في تسبحة نصف الليل",
    "مرد الابركسيس لصوم الاباء الرسل (شيريه ناتشويس)",
    "مرد (اوس بيرين) للقداس الغريغوري بالختام المطول",
  ],
  الموهوبين: [
    "قطعة التمجيد (شاشف انسوب)",
    "لحن افشوليم لتسبحة الاحد",
    "لحن بي ابنفما المقدمة فقط +المحير(الربع الاول والثاني الي خين هان ميش ان لاس)",
  ],
};

const hymnNamesKhamissa = {
  "المستوي الاول": [
    "مرد فول ايفول للقداس الغريغوري",
    "مرد الابركسيس لصوم الاباء الرسل (شيريه ناتشويس)",
    "لحن البركة (بدون البرلكس)",
    "ذوكصولوجية الاباء الرسل (كيريوس)",
  ],
  "المستوي الثاني": [
    "ذكصولوجية العذراء في تسبحة نصف الليل",
    "المزمور السنوي المختصر (او اويني افشاي)",
    "طاي شوري السنوي",
    "لبش الهوس الثاني (اول ربعين باللحن+التكملة دمج+اخر 4 ارباع باللحن)",
  ],
  الموهوبين: [
    "لحن اطاي بارثينوس كاملا",
    "اوشية القرابين الكبيرة",
    "اسبسمس الادام(افرحي يا مريم )عربي كاملا",
  ],
};

const hymnNamesEadadi = {
  "المستوي الاول": [
    "ابصالية الاحد(ايكوتي) كاملة",
    "قطعة توزيع عيد العنصرة وصوم الاباء الرسل (اسومين) كاملا يوناني+ قبطي+ عربي",
    "المزمور السنوي المختصر",
    "اسبسمس الادام (اونوف اممو ماريا)قبطي كاملا",
  ],
  "المستوي الثاني": [
    "لحن اوندوس(المقدمة+ ابوخروؤ+ اري ابريسفيفين+ طوبه ام ابتشويس للرسل)",
    "ابصالية الثلاثة فتية(اربصالين)",
    "اسبسمس ادام عربي للرسل(اباؤنا الرسل)",
    "طواف عشية + طواف باكر السنوي",
  ],
  الموهوبين: [
    "ني اثنوس تيرو كاملا",
    "لحن الفضائل الاثني عشر قبطي (تي ميتي اسنوتي)",
  ],
};

const hymnNamesThanawee = {
  "المستوي الاول": [
    "الهوس الاول كاملا",
    "اطاي بارثينوس كاملا",
    "اسبسمس واطس للعذراء(ماريا تي تشرومبي)",
    "مرد الابركسيس لعيد النيروز + الختام بالطريقة المطولة",
  ],
  "المستوي الثاني": [
    "تين اويه انسوك السنوي",
    "محير(افناف امبي اسمو)للعذراء",
    "ذوكصولوجية باكر",
    "اوندوس",
  ],
  الموهوبين: ["اسبازيستي الكبير", "مزمور عشية (جي افساجي)"],
};

const hymnNamesJamiya = {
  "المستوي الاول": [
    "اوندوس",
    "اطاي بارثينوس كاملا",
    "لحن افشوليم + ايفول هيتين الصغير",
    "محير التمجيد(فاي بي ابليمين)",
  ],
  "المستوي الثاني": [
    "الهوس الرابع كاملا",
    "التوزيع الفرايحي الكبير لعيد النيروز قبطيا كاملا",
    "لحن افئين بي ارشي",
    "لحن فاني تينه (للملاك ميخائيل)",
  ],
};

/* كائن يحدد عدد الفيديوهات لكل مستوى حسب المرحلة */
const videoCounts = {
  حضانة: {
    "المستوي الاول": 4,
    "المستوي الثاني": 4,
    الموهوبين: 3,
  },
  "اولي وتانيه": {
    "المستوي الاول": 4,
    "المستوي الثاني": 4,
    الموهوبين: 2,
  },
  "تالته ورابعه": {
    "المستوي الاول": 4,
    "المستوي الثاني": 4,
    الموهوبين: 3,
  },
  "خامسة وسادسه": {
    "المستوي الاول": 4,
    "المستوي الثاني": 4,
    الموهوبين: 3,
  },
  اعدادي: {
    "المستوي الاول": 4,
    "المستوي الثاني": 4,
    الموهوبين: 2,
  },
  ثانوي: {
    "المستوي الاول": 4,
    "المستوي الثاني": 4,
    الموهوبين: 2,
  },
  جامعة: {
    "المستوي الاول": 4,
    "المستوي الثاني": 4,
  },
};

/* كائن يحتوي على روابط الفيديو لكل مرحلة ولكل مستوى */
const videoURLs = {
  حضانة: {
    "المستوي الاول": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ],
    "المستوي الثاني": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
    ],
    الموهوبين: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
  },
  "اولي وتانيه": {
    "المستوي الاول": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
    "المستوي الثاني": [
      "http://techslides.com/demos/sample-videos/small.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    ],
    الموهوبين: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    ],
  },
  "تالته ورابعه": {
    "المستوي الاول": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
    ],
    "المستوي الثاني": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    الموهوبين: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
  },
  "خامسة وسادسه": {
    "المستوي الاول": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
    ],
    "المستوي الثاني": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    الموهوبين: [
      "http://techslides.com/demos/sample-videos/small.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
  },
  اعدادي: {
    "المستوي الاول": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ],
    "المستوي الثاني": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
    ],
    الموهوبين: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ],
  },
  ثانوي: {
    "المستوي الاول": [
      "https://www.youtube.com/watch?v=0u0nY31iXqE",
      "https://www.youtube.com/watch?v=o_D149fkt6U",
      "https://www.youtube.com/watch?v=BVVB4o0gqN0",
      "https://www.youtube.com/watch?v=bzacrRVhRBE",
    ],
    "المستوي الثاني": [
      "https://www.youtube.com/watch?v=ZM1CHrsAKZc",
      "https://www.youtube.com/watch?v=563yhpV8INI",
      "https://www.youtube.com/watch?v=tbreXiaMnmE",
      "https://www.youtube.com/watch?v=cTsZOCs9g2M",
    ],
    الموهوبين: [
      "https://www.youtube.com/watch?v=Rd7vZzwsNI0",
      "https://www.youtube.com/watch?v=Mdm7k-3slXg",
    ],
  },
  جامعة: {
    "المستوي الاول": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ],
    "المستوي الثاني": [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "http://techslides.com/demos/sample-videos/small.mp4",
    ],
  },
};

/***** دوال التنقل وعرض الفيديوهات *****/
function showSection(sectionId) {
  currentSection = sectionId;
  document.querySelectorAll("section").forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
  if (sectionId === "videosPage") {
    updateUserGreeting();
    displayVideos();
  }
}

function displayVideos() {
  const container = document.getElementById("videosContainer");
  container.innerHTML = "";
  const videos = getVisibleVideos();
  if (videos.length === 0) {
    container.innerHTML = "<p>لا توجد ألحان متاحة حالياً للمرحلة والمستوى المحددين.</p>";
    return;
  }
  const hymnArray = getHymnNamesForPhase();
  const phase = loggedInUser.phase;
  const level = loggedInUser.level;
  const urlsArray = (videoURLs[phase] && videoURLs[phase][level]) || [];
  videos.forEach((videoId, index) => {
    const card = document.createElement("div");
    card.className = "video-card";
    const hymnName = hymnArray[index] ? hymnArray[index] : "اللحن " + videoId;
    let videoURL = urlsArray[videoId - 1] || "http://techslides.com/demos/sample-videos/small.mp4";

    let mediaElement;
    if (videoURL.includes("youtube.com/watch")) {
      const embedURL = videoURL.replace("watch?v=", "embed/");
      mediaElement = `
        <iframe
          width="100%"
          height="315"
          src="${embedURL}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
    } else {
      mediaElement = `
        <video controls>
          <source src="${videoURL}" type="video/mp4">
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
      `;
    }
    let extraParagraph = "";
    if (phase !== "حضانة" && phase !== "اولي وتانيه") {
      extraParagraph = `<p>${
        uniqueTexts[index] || "هذا هو الوصف الخاص بالفيديو رقم " + (index + 1)
      }</p>`;
    }
    card.innerHTML = `
      <div class="video-header">
        <h3>${hymnName}</h3>
      </div>
      <div class="video-body">
        ${mediaElement}
        ${extraParagraph}
      </div>
    `;
    container.appendChild(card);
  });
}

function getHymnNamesForPhase() {
  if (!loggedInUser) return [];
  const phase = loggedInUser.phase;
  const level = loggedInUser.level;
  switch (phase) {
    case "حضانة":
      return hymnNamesByHodana[level] || [];
    case "اولي وتانيه":
      return hymnNamesOwlaya[level] || [];
    case "تالته ورابعه":
      return hymnNamesTalatah[level] || [];
    case "خامسة وسادسه":
      return hymnNamesKhamissa[level] || [];
    case "اعدادي":
      return hymnNamesEadadi[level] || [];
    case "ثانوي":
      return hymnNamesThanawee[level] || [];
    case "جامعة":
      return hymnNamesJamiya[level] || [];
    default:
      return [];
  }
}

/***** زر الرجوع للأعلى *****/
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/***** خلفية الجزيئات *****/
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = 5 + Math.random() * 10;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 5 + Math.random() * 5 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particlesContainer.appendChild(particle);
  }
}
createParticles();

/***** دوال تغيير خيارات المستوى *****/
function populateRegLevel() {
  const phase = document.getElementById("regPhase").value;
  const regLevel = document.getElementById("regLevel");
  regLevel.innerHTML = '<option value="">اختر المستوى</option>';
  let options = [
    { value: "المستوي الاول", label: "المستوي الاول" },
    { value: "المستوي الثاني", label: "المستوي الثاني" },
  ];
  if (phase !== "جامعة") {
    options.push({ value: "الموهوبين", label: "الموهوبين" });
  }
  options.forEach((opt) => {
    const optionEl = document.createElement("option");
    optionEl.value = opt.value;
    optionEl.textContent = opt.label;
    regLevel.appendChild(optionEl);
  });
}
function resetLoginLevel() {
  const phase = document.getElementById("loginPhase").value;
  const loginLevel = document.getElementById("loginLevel");
  loginLevel.innerHTML = '<option value="">اختر المستوى</option>';
  let options = [
    { value: "المستوي الاول", label: "المستوي الاول" },
    { value: "المستوي الثاني", label: "المستوي الثاني" },
  ];
  if (phase !== "جامعة" && phase !== "") {
    options.push({ value: "الموهوبين", label: "الموهوبين" });
  }
  options.forEach((opt) => {
    const optionEl = document.createElement("option");
    optionEl.value = opt.value;
    optionEl.textContent = opt.label;
    loginLevel.appendChild(optionEl);
  });
}

/***** دوال التسجيل وتسجيل الدخول *****/
function handleSignup() {
    const name = document.getElementById("regName").value.trim();
    const phase = document.getElementById("regPhase").value;
    const level = document.getElementById("regLevel").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    const regMsg = document.getElementById("regMsg");
    regMsg.textContent = "";
    if (!name || !phase || !level || !password || !confirmPassword) {
      regMsg.textContent = "لازم تملي كل الخانات";
      regMsg.style.color = "red";
      return;
    }
    if (!isThreePartName(name)) {
      regMsg.textContent = "يجب أن يكون الاسم الكامل ثلاثي.";
      regMsg.style.color = "red";
      return;
    }
    // تم إزالة شرط التحقق من صحة كلمة السر هنا
    if (password !== confirmPassword) {
      regMsg.textContent = "الكلمتين مش زي بعض";
      regMsg.style.color = "red";
      return;
    }
    userData = { name, password, phase, level };
    localStorage.setItem("userData", JSON.stringify(userData));
    regMsg.textContent = "تم التسجيل بنجاح!";
    regMsg.style.color = "green";
    setTimeout(() => {
      loggedInUser = { name, phase, level };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      showSection("videosPage");
    }, 1000);
  }
  
function handleLogin() {
  const name = document.getElementById("loginName").value.trim();
  const password = document.getElementById("loginPassword").value;
  const phase = document.getElementById("loginPhase").value;
  const level = document.getElementById("loginLevel").value;
  const loginMsg = document.getElementById("loginMsg");
  loginMsg.textContent = "";
  if (!name || !password || !phase || !level) {
    loginMsg.textContent = "لازم تملي كل الخانات";
    loginMsg.style.color = "red";
    return;
  }
  if (!isThreePartName(name)) {
    loginMsg.textContent = "يجب أن يكون الاسم الكامل ثلاثي.";
    loginMsg.style.color = "red";
    return;
  }
  // لا يتم التحقق من صحة كلمة السر في فورم الدخول
  const storedData = localStorage.getItem("userData");
  if (!storedData) {
    loginMsg.textContent = "لا يوجد حساب مسجل بعد. سجل أولاً في (حساب جديد).";
    loginMsg.style.color = "red";
    return;
  }
  const storedUser = JSON.parse(storedData);
  if (name === storedUser.name && password === storedUser.password) {
    loginMsg.textContent = "تم تسجيل الدخول بنجاح!";
    loginMsg.style.color = "green";
    setTimeout(() => {
      loggedInUser = { name, phase, level };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      showSection("videosPage");
    }, 1000);
  } else {
    loginMsg.textContent = "الاسم أو كلمة السر غير صحيحة.";
    loginMsg.style.color = "red";
  }
}

function handleLogout() {
  loggedInUser = null;
  localStorage.removeItem("loggedInUser");
  showSection("home");
}

/***** قسم الألحان *****/
function updateUserGreeting() {
  if (loggedInUser) {
    document.getElementById("userGreeting").textContent = `مرحباً ${loggedInUser.name} | المرحلة: ${loggedInUser.phase} | المستوى: ${loggedInUser.level}`;
  }
}

/* دالة استرجاع عدد الفيديوهات بناءً على المرحلة والمستوى */
function getVisibleVideos() {
  if (loggedInUser) {
    const phase = loggedInUser.phase;
    const level = loggedInUser.level;
    if (videoCounts[phase] && videoCounts[phase][level]) {
      let count = videoCounts[phase][level];
      return Array.from({ length: count }, (_, i) => i + 1);
    }
  }
  return [];
}

/***** فحص التحديثات *****/
const CURRENT_VERSION = "1.0.2";
function checkForUpdates() {
  fetch("/version.json", { cache: "no-cache" })
    .then((response) => response.json())
    .then((data) => {
      if (data.version !== CURRENT_VERSION) {
        alert("تم العثور على تحديث جديد! سيتم إعادة تحميل التطبيق لتطبيق التحديث.");
        window.location.reload(true);
      }
    })
    .catch((error) => {
      console.error("فشل التحقق من التحديثات:", error);
    });
}
// ضبط فاصل التحقق من التحديثات كل دقيقة
setInterval(checkForUpdates, 60000);
checkForUpdates();

/***** زر الرجوع للأعلى *****/
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/***** تذييل الصفحة *****/
document.getElementById("year").textContent = new Date().getFullYear();
