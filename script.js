let choose = document.querySelector("#image-input")
let sliders = document.querySelectorAll('input[type="range"]');
let imgPlaceholder = document.querySelector("#image-placeholder")
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let image = null
let resetBtn = document.querySelector("#reset-btn")
let downloadBtn = document.querySelector("#download-btn")
let presetBtn = document.querySelectorAll(".preset-btn")

sliders.forEach(function (slider) {
    function updateSliderColor() {
        let percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

        slider.style.background = `linear-gradient(to right, #ff3b3b ${percentage}%, #3a3a3a ${percentage}%)`;
    }

    slider.addEventListener("input", updateSliderColor);

    // Set the initial track color
    updateSliderColor();
});

applyFilters = () => {
    let brightness = document.getElementById("brightness").value;
    let contrast = document.getElementById("contrast").value;
    let saturation = document.getElementById("saturation").value;
    let hue = document.getElementById("hueRotation").value;
    let blur = document.getElementById("blur").value;
    let grayscale = document.getElementById("grayscale").value;
    let sepia = document.getElementById("sepia").value;
    let opacity = document.getElementById("opacity").value;
    let invert = document.getElementById("invert").value;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) blur(${blur}px) grayscale(${grayscale}%) sepia(${sepia}%) opacity(${opacity}%) invert(${invert}%)`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

sliders.forEach(function (slider) {
    slider.addEventListener("input", applyFilters)
});

choose.addEventListener("change", (e) => {
    const files = e.target.files[0]
    console.log(files);
    if (files) {
        const img = new Image()
        img.src = URL.createObjectURL(files)
        image = img
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            imgPlaceholder.style.display = "none"
            canvas.style.display = "block"
        }
    }
})

resetBtn.addEventListener("click", () => {
    sliders.forEach((slider) => {
        slider.value = slider.defaultValue;
        slider.dispatchEvent(new Event("input"));
    });
    applyFilters();
});

downloadBtn.addEventListener("click",()=>{
    let link = document.createElement("a")
    link.download = "Edited-img.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
})

let presets = {
    drama: {
        brightness: 110, contrast: 130, saturation: 120,
        hueRotation: 0, blur: 0, grayscale: 0, sepia: 10,
        opacity: 100, invert: 0
    },

    vintage: {
        brightness: 110, contrast: 110, saturation: 80,
        hueRotation: 10, blur: 0, grayscale: 0, sepia: 35,
        opacity: 100, invert: 0
    },

    oldSchool: {
        brightness: 100, contrast: 90, saturation: 70,
        hueRotation: 0, blur: 0, grayscale: 20, sepia: 40,
        opacity: 100, invert: 0
    },

    cyberpunk: {
        brightness: 120, contrast: 140, saturation: 180,
        hueRotation: 270, blur: 0, grayscale: 0, sepia: 0,
        opacity: 100, invert: 0
    },

    softGlow: {
        brightness: 120, contrast: 90, saturation: 110,
        hueRotation: 0, blur: 2, grayscale: 0, sepia: 10,
        opacity: 100, invert: 0
    },

    noir: {
        brightness: 100, contrast: 140, saturation: 0,
        hueRotation: 0, blur: 0, grayscale: 100, sepia: 0,
        opacity: 100, invert: 0
    },

    warmSunset: {
        brightness: 120, contrast: 110, saturation: 130,
        hueRotation: 15, blur: 0, grayscale: 0, sepia: 30,
        opacity: 100, invert: 0
    },

    coolTone: {
        brightness: 100, contrast: 110, saturation: 90,
        hueRotation: 200, blur: 0, grayscale: 0, sepia: 0,
        opacity: 100, invert: 0
    },

    faded: {
        brightness: 115, contrast: 80, saturation: 70,
        hueRotation: 0, blur: 0, grayscale: 10, sepia: 20,
        opacity: 100, invert: 0
    },

    retroPop: {
        brightness: 110, contrast: 130, saturation: 160,
        hueRotation: 10, blur: 0, grayscale: 0, sepia: 10,
        opacity: 100, invert: 0
    }
};

presetBtn.forEach(function (button) {
    button.addEventListener("click", function () {

        let presetName = button.dataset.preset;
        let preset = presets[presetName];

        for (let key in preset) {
            let slider = document.getElementById(key);

            slider.value = preset[key];

            slider.dispatchEvent(new Event("input"));
        }

        applyFilters();
    });
});