var dropdownActive = false;

function toggleMenuVisibility(){
  if (dropdownActive){
    dropdownActive = false;
    dropdownMenuItems.style.display = 'none';
  } else {
    dropdownActive = true;
    dropdownMenuItems.style.display = 'block';
  }
}

function menuButtonKeydown(event){
  if (event.keyCode != 9) {
    toggleMenuVisibility();
  }
}

function lastLinkButtonKeydown(event){
  if (event.keyCode == 9){
    toggleMenuVisibility();
  }
}

var dropdownMenuButton = document.getElementById('dropdown-menu-button');
var dropdownMenuItems = document.getElementById('dropdown-menu-items');
var finalDropdownMenuLink = dropdownMenuItems.children[dropdownMenuItems.children.length-1];

dropdownMenuButton.addEventListener('click', toggleMenuVisibility);
dropdownMenuButton.addEventListener('keydown', menuButtonKeydown);
finalDropdownMenuLink.addEventListener('keydown', lastLinkButtonKeydown);