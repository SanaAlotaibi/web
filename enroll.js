//  جلب أسماء الأطفال من Local Storage وتعبئتها في القائمة
window.onload = function () {
    const kids = JSON.parse(localStorage.getItem("kids")) || [];
    const kidSelect = document.getElementById("kid-select");

    // إزالة الخيارات القديمة (ما عدا أول واحدة)
    while (kidSelect.options.length > 1) {
        kidSelect.remove(1);
    }

    kids.forEach(kid => {
        const option = document.createElement("option");
        option.value = kid;
        option.textContent = kid;
        kidSelect.appendChild(option);
    });

    loadFilterOptions();
    renderActivities(activities);
};

// تعريف الأنشطة كمصفوفة متعددة الأبعاد
const activities = [
    { name: "Basketball", coach: "Mona", prerequisite: "Beginner" },
    { name: "Tennis", coach: "Omar", prerequisite: "Advanced" },
    { name: "Golf", coach: "Omar", prerequisite: "Beginner" },
    { name: "Volleyball", coach: "Nasreen", prerequisite: "Advanced" },
    { name: "Baseball", coach: "Nasreen", prerequisite: "Beginner" },
    { name: "Soccer", coach: "Kamal" },
    { name: "Basketball", coach: "Latifah", prerequisite: "Advanced" }
];

//  تعبئة قائمة الفلاتر من المصفوفة
function loadFilterOptions() {
    const filterSelect = document.getElementById("filter-select");
    filterSelect.innerHTML = <option value="" disabled selected>Select Filter</option>;
    
    const coaches = new Set();
    const prerequisites = new Set();

    activities.forEach(act => {
        coaches.add(act.coach);
        if (act.prerequisite) prerequisites.add(act.prerequisite);
    });

    const coachGroup = document.createElement("optgroup");
    coachGroup.label = "By Coach";
    coaches.forEach(coach => {
        const opt = document.createElement("option");
        opt.value = "coach-" + coach;
        opt.textContent = Coach ${coach};
        coachGroup.appendChild(opt);
    });

    const preGroup = document.createElement("optgroup");
    preGroup.label = "By Prerequisites";
    prerequisites.forEach(pre => {
        const opt = document.createElement("option");
        opt.value = "pre-" + pre;
        opt.textContent = pre + " Level";
        preGroup.appendChild(opt);
    });

    filterSelect.appendChild(coachGroup);
    filterSelect.appendChild(preGroup);
}

//تصفية الأنشطة عند اختيار فلتر
document.getElementById("filter-select").addEventListener("change", function () {
    const val = this.value;
    let filtered = [];

    if (val.startsWith("coach-")) {
        const coachName = val.replace("coach-", "");
        filtered = activities.filter(act => act.coach === coachName);
    } else if (val.startsWith("pre-")) {
        const level = val.replace("pre-", "");
        filtered = activities.filter(act => act.prerequisite === level);
    }

    renderActivities(filtered);
});

//  عرض الأنشطة في الصفحة
function renderActivities(activitiesList) {
    const container = document.querySelector(".activitiesparents-grid");
    container.innerHTML = "";

    activitiesList.forEach(act => {
        const div = document.createElement("div");
        div.className = "activityparents";

        const img = document.createElement("img");
        img.src = "images/" + act.name.replace(/\s+/g, "") + ".png";
        img.alt = act.name + " Image";

        const infoDiv = document.createElement("div");
        infoDiv.className = "activityparents-info";
        infoDiv.innerHTML = <p><strong>${act.name}</strong></p><p>Coach: ${act.coach}</p>;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = JSON.stringify(act);

        div.appendChild(img);
        div.appendChild(infoDiv);
        div.appendChild(checkbox);
        container.appendChild(div);
    });
}

//  التحقق من صحة النموذج عند الإرسال
document.getElementById("enroll-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedKid = document.getElementById("kid-select").value;
    const checkboxes = document.querySelectorAll(".activitiesparents-grid input[type='checkbox']:checked");

    if (!selectedKid) {
		alert("Please select a kid.");
        return;
    }

    if (checkboxes.length === 0) {
        alert("Please select at least one activity.");
        return;
    }

    const enrolled = Array.from(checkboxes).map(cb => JSON.parse(cb.value));

    const existingResult = document.getElementById("result");
    if (existingResult) existingResult.remove();

    const resultDiv = document.createElement("div");
    resultDiv.id = "result";
    resultDiv.innerHTML = <h3>Enrollment Confirmation</h3><p><strong>${selectedKid}</strong> enrolled in:</p><ul> +
        enrolled.map(act => `<li>${act.name} with Coach ${act.coach}</li>`).join("") + "</ul>";

    document.getElementById("enroll-container").appendChild(resultDiv);

    document.getElementById("enroll-form").reset();
    renderActivities(activities); // عرض الكل بعد إعادة التهيئة
});
