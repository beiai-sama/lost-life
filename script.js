let topZ = 10;
let draggingWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function openWindow(id) {
const win = document.getElementById(id);
if (!win) return;

win.style.display = "block";
win.style.zIndex = topZ++;

// 如果窗口第一次打开时还没有具体 left/top，就把当前位置固化成像素，方便拖动
const rect = win.getBoundingClientRect();
if (!win.dataset.positionReady) {
win.style.left = rect.left + "px";
win.style.top = rect.top + "px";
win.style.transform = "none";
win.dataset.positionReady = "true";
}

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

function initDraggableWindows() {
const windows = document.querySelectorAll(".window");

windows.forEach((win) => {
const titleBar = win.querySelector(".window-title");
if (!titleBar) return;

```
titleBar.addEventListener("pointerdown", (event) => {
  // 点关闭按钮时不要触发拖动
  if (event.target.tagName.toLowerCase() === "button") return;

  draggingWindow = win;
  draggingWindow.style.zIndex = topZ++;

  const rect = draggingWindow.getBoundingClientRect();

  draggingWindow.style.left = rect.left + "px";
  draggingWindow.style.top = rect.top + "px";
  draggingWindow.style.transform = "none";
  draggingWindow.dataset.positionReady = "true";

  dragOffsetX = event.clientX - rect.left;
  dragOffsetY = event.clientY - rect.top;

  titleBar.setPointerCapture(event.pointerId);
  document.body.classList.add("dragging");
});

titleBar.addEventListener("pointerup", (event) => {
  draggingWindow = null;
  document.body.classList.remove("dragging");

  try {
    titleBar.releasePointerCapture(event.pointerId);
  } catch (error) {
    // 有些浏览器释放失败也没事
  }
});

titleBar.addEventListener("pointercancel", () => {
  draggingWindow = null;
  document.body.classList.remove("dragging");
});
```

});

document.addEventListener("pointermove", (event) => {
if (!draggingWindow) return;

```
const taskbarHeight = 44;
const winRect = draggingWindow.getBoundingClientRect();

let newLeft = event.clientX - dragOffsetX;
let newTop = event.clientY - dragOffsetY;

const maxLeft = window.innerWidth - winRect.width;
const maxTop = window.innerHeight - winRect.height - taskbarHeight;

newLeft = Math.max(0, Math.min(newLeft, maxLeft));
newTop = Math.max(0, Math.min(newTop, maxTop));

draggingWindow.style.left = newLeft + "px";
draggingWindow.style.top = newTop + "px";
```

});
}

setInterval(updateClock, 1000);
updateClock();
initDraggableWindows();

document.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
const active = document.activeElement;
if (active && active.id === "passwordInput") {
checkPassword();
}
}
});
