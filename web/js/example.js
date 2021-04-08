function findById(id) {
  return document.getElementById(id);
}
var icon0 = findById("skill0");
var icon1 = findById("skill1");
var icon2 = findById("skill2");
var icon3 = findById("skill3");

var keyboard = new CtrlTab.Keyboard();

keyboard.addCmd("action0", { ctrl: true }, [65], action0, {
  preventDefault: true,
  repeat: true,
  groupName: "group1"
});
keyboard.addCmd("action1", null, ["G"], action1, {groupName: "group1"});
keyboard.setInputs(
  "group1",
  "action1",
  { ctrl: false, alt: false, shift: false },
  ["Z"]
);
keyboard.addCmd(
  "action2",
  { ctrl: false, alt: false, shift: false },
  ["E"],
  action2
);
keyboard.addCmd(
  "action3",
  { ctrl: false, alt: false, shift: false },
  ["R", "T"],
  action3,
  {groupName: "group1"}
);
keyboard.listen("group1");
keyboard.listen("default");

function action0(isKeyDown) {
  if (isKeyDown) {
    animate(icon0);
  }
}

function action1(isKeyDown) {
  if (isKeyDown) {
    animate(icon1);
  }
}

function action2(isKeyDown) {
  if (isKeyDown) {
    animate(icon2);
  }
}

function action3(isKeyDown) {
  if (isKeyDown) {
    animate(icon3);
  }
}

function animate(icon) {
  icon.classList.remove("animation");
  void icon.offsetWidth;
  icon.classList.add("animation");
}
