const by = [
    ["København"],
    ["Aarhus"],
    ["Odense"],
    ["Esbjerg"],
    ["Kolding"],
    ["Randers"],
    ["Herning"],
    ["Roskilde"],
    ["Horsens"],
];

const KBH = document.getElementById("kbh");

KBH.addEventListener("click", function() {
    sessionStorage.setItem("København");
})

console.log(VKNAP1);