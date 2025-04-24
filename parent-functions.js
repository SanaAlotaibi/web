// ========== PARENT DASHBOARD ==========
function loadDashboard() {
  var kidsString = localStorage.getItem("kids");
  var kids;

  if (kidsString === null || kidsString === "[]") {
    kids = [
      {
        name: "Badr Khalid",
        age: 15,
        image: "images/badr.png",
        gender: "Male",
        height: 165,
        weight: 55,
        phone: "0555555555",
        email: "badr.khalid@email.com"
      },
      {
        name: "Lana Khalid",
        age: 6,
        image: "images/Lana.png",
        gender: "Female",
        height: 110,
        weight: 20,
        phone: "0566666666",
        email: "lana.khalid@email.com"
      },
      {
        name: "Farah Khalid",
        age: 8,
        image: "images/Farah.png",
        gender: "Female",
        height: 120,
        weight: 22,
        phone: "0577777777",
        email: "farah.khalid@email.com"
      }
    ];
    localStorage.setItem("kids", JSON.stringify(kids));
  } else {
    kids = JSON.parse(kidsString);
  }

  displayKids(kids);
}


function displayKids(kidsArray) {
  var container = document.getElementById("kids-container");
  container.innerHTML = "";

  for (var i = 0; i < kidsArray.length; i++) {
    var kid = kidsArray[i];

    var card = document.createElement("div");
    card.className = "kid-card";

    var img = document.createElement("img");
    img.src = kid.image;
    img.alt = kid.name;
    img.className = "kid-image";

    var name = document.createElement("p");
    name.className = "kid-name";
    name.innerHTML = "<strong>" + kid.name + "</strong>";

    var age = document.createElement("p");
    age.className = "kid-age";
    age.textContent = "Age: " + kid.age;

    var btn = document.createElement("button");
    btn.className = "details-btnkid";
    btn.textContent = "View Details";
    btn.onclick = (function(index) {
      return function () {
        showKidDetails(index);
      };
    })(i);

    var detailsDiv = document.createElement("div");
    detailsDiv.id = "details-" + i;
    detailsDiv.className = "kid-extra";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(age);
    card.appendChild(btn);
    card.appendChild(detailsDiv);

    container.appendChild(card);
  }
}

function sortKids() {
  var sort = document.getElementById("sort-options").value;
  var kids = JSON.parse(localStorage.getItem("kids"));

  if (sort === "name-asc") {
    kids.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (sort === "name-desc") {
    kids.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  } else if (sort === "age-asc") {
    kids.sort(function (a, b) {
      return a.age - b.age;
    });
  } else if (sort === "age-desc") {
    kids.sort(function (a, b) {
      return b.age - a.age;
    });
  }

  displayKids(kids);
}

function showKidDetails(index) {
  var kids = JSON.parse(localStorage.getItem("kids"));
  var kid = kids[index];
  var detailBox = document.getElementById("details-" + index);

  detailBox.innerHTML = `
    <p><strong>Gender:</strong> ${kid.gender || "Not specified"}</p>
    <p><strong>Height:</strong> ${kid.height || "Not available"} cm</p>
    <p><strong>Weight:</strong> ${kid.weight || "Not available"} kg</p>
    <p><strong>Email:</strong> ${kid.email || "N/A"}</p>
    <p><strong>Phone:</strong> ${kid.phone || "N/A"}</p>
  `;
}
function setupRegisterForm() {
  var birthdateField = document.getElementById("birthdate");
  birthdateField.onchange = function () {
    var birthdateValue = birthdateField.value;
    if (birthdateValue) {
      var today = new Date();
      var dob = new Date(birthdateValue);
      var age = today.getFullYear() - dob.getFullYear();
      var monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      document.getElementById("age").value = age;
    } else {
      document.getElementById("age").value = "";
    }
  };

  document.getElementById("register-form").onsubmit = function () {
    var name = document.getElementById("child-name").value.trim();
    var birthdate = document.getElementById("birthdate").value;
    var age = document.getElementById("age").value;
    var genderInputs = document.getElementsByName("gender");
    var gender = "";
    for (var i = 0; i < genderInputs.length; i++) {
      if (genderInputs[i].checked) {
        gender = genderInputs[i].value;
      }
    }
    var weight = document.getElementById("weight").value.trim();
    var height = document.getElementById("height").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var email = document.getElementById("email").value.trim();
    var photo = document.getElementById("photo").files[0]; // لرفع الصورة

    // التحقق من الحقول الفارغة
    if (!name || !birthdate || !age || !gender || !weight || !height || !phone || !email) {
      alert("Please fill in all required fields.");
      return false;
    }

    // الاسم لا يبدأ برقم
    if (/^\d/.test(name)) {
      alert("Child's name cannot start with a number.");
      return false;
    }

    // تحقق من رقم الجوال (10 أرقام فقط)
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return false;
    }

    // التحقق من وجود @ في الإيميل
    if (!email.includes("@")) {
      alert("Email must contain '@'");
      return false;
    }

    // تاريخ الميلاد يجب أن يكون في أو قبل 2020
    var year = new Date(birthdate).getFullYear();
    if (year > 2020) {
      alert("Child must be born in 2020 or earlier.");
      return false;
    }

    // إذا كانت هناك صورة، نحفظها
    var imageURL = "images/default-kid.png"; // صورة افتراضية
    if (photo) {
      var reader = new FileReader();
      reader.onload = function (e) {
        imageURL = e.target.result;  // تحويل الصورة إلى Data URL
        saveData(); // بعد تحميل الصورة، يتم حفظ البيانات
      };
      reader.readAsDataURL(photo);  // تحويل الصورة إلى Data URL
    } else {
      saveData(); // إذا لم تكن هناك صورة، حفظ البيانات مع الصورة الافتراضية
    }

    function saveData() {
      // حفظ بيانات الطفل في localStorage
      var kids = JSON.parse(localStorage.getItem("kids")) || [];
      kids.push({
        name: name,
        age: parseInt(age),
        image: imageURL,
        gender: gender,
        weight: weight,
        height: height,
        phone: phone,
        email: email
      });
      localStorage.setItem("kids", JSON.stringify(kids));

      alert("Child registered successfully!");

      // عرض البيانات على الصفحة الرئيسية
      displayChildInfo(name, imageURL);

      // إعادة تعيين النموذج
      document.getElementById("register-form").reset();
      document.getElementById("age").value = "";
    }

    return false;
  };
}

// عرض البيانات في الصفحة الرئيسية
function displayChildInfo(name, imageURL) {
  var kidsListContainer = document.getElementById("kids-list");

  var kidInfoDiv = document.createElement("div");
  kidInfoDiv.classList.add("kid-info");

  kidInfoDiv.innerHTML = `
    <p>Name: ${name}</p>
    <img src="${imageURL}" alt="${name}" width="100" height="100">
  `;
  kidsListContainer.appendChild(kidInfoDiv);
}


// ========== EVALUATE ACTIVITY ==========
function submitEvaluation() {
  var activity = document.getElementById("activityparents-select").value;

  var ratings = document.getElementsByName("rating");
  var selectedRating = null;

  for (var i = 0; i < ratings.length; i++) {
    if (ratings[i].checked) {
      selectedRating = ratings[i].value;
      break;
    }
  }

  if (!activity) {
    alert("Please select an activity.");
    return false;
  }

  if (!selectedRating) {
    alert("Please select a rating.");
    return false;
  }

  alert(
    "Thank you for your feedback!\nYour rating for the activity " +
    activity + " is " + selectedRating + " ★"
  );

  window.location.href = "HomePage.html";
  return false;
}
