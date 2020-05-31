var dropdownActive = false;

function menuButtonToggle(){
  if (dropdownActive){
    dropdownActive = false;
    dropdownMenuItems.style.display = 'none';
  } else {
    dropdownActive = true;
    dropdownMenuItems.style.display = 'block';
  }
}

var dropdownMenuButton = document.getElementById('dropdown-menu-button');
var dropdownMenuItems = document.getElementById('dropdown-menu-items');

dropdownMenuButton.addEventListener('click', menuButtonToggle);
dropdownMenuButton.addEventListener('keydown', menuButtonToggle);