let topZ = 10;

function openWindow(id) {
const win = document.getElementById(id);
if (!win) return;

win.style.display = "block";
win.style.zIndex = topZ++;
closeStartMenu();
}

function closeWindow(id) {
const win = document.getElementById(id);
if (!win) return;

win.style.display = "none";
}

function toggleStartMenu() {
const menu = document.getElementById("startMenu");
if (!menu) return;

menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function closeStartMenu() {
const menu = document.getElementById("startMenu");
if (!menu) return;

menu.style.display = "none";
}

function checkPassword() {
const input = document.getElementById("passwordInput");
const result = document.getElementById("resultText");

if (!input || !result) return;

const value = input.value.trim().toLowerCase();

if (value === "teto31life") {
result.textContent = "密钥正确。正在修复 Beiai.exe...";
setTimeout(() => {
openWindow("final");
}, 700);
} else {
result.textContent = "密钥错误。理智模块继续损坏。";
}
}

function fakeShutdown() {
alert("关机失败：Beiai.exe 正在后台运行。");
closeStartMenu();
}

function updateClock() {
const clock = document.getElementById("clock");
if (!clock) return;

const now = new Date();
const h = String(now.getHours()).padStart(2, "0");
const m = String(now.getMinutes()).padStart(2, "0");

clock.textContent = `${h}:${m}`;
}

function selectProject(name, text) {
const projectName = document.getElementById("flProjectName");
const statusText = document.getElementById("flStatusText");

if (projectName) {
projectName.textContent = name;
}

if (statusText) {
statusText.textContent = text;
}
}

setInterval(updateClock, 1000);
updateClock();

document.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
const active = document.activeElement;
if (active && active.id === "passwordInput") {
checkPassword();
}
}
});
