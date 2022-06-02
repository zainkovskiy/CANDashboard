<?php
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

if (isset($_REQUEST['IFRAME_TYPE']) && $_REQUEST['IFRAME_TYPE'] == 'SIDE_SLIDER') {

  $showFoot = false;
} else {
  require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_after.php");
  $showFoot = true;
}

$ActiveUser = CUser::GetLogin();
$ActiveUserID = CUser::GetID();
?>

<!doctype html>
<html lang="ru">

<head>
  <!-- <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1"> -->
  <?php
  if (!$showFoot) {
    $APPLICATION->ShowHead();
  } else {
    $APPLICATION->ShowHeadScripts();
  }
  
  $APPLICATION->SetAdditionalCSS("/dev/dashboard/main.css");
  ?>
  <script defer="defer" src="bundle.js?'.chr(rand(65,90)).chr(rand(65,90)).'='.rand(0,1000000).'"></script>
  <!-- <link href="main.css?s=<?= rand(0, 1000000) ?>" rel="stylesheet"> -->
  <script>
    let userId = '<? echo ($ActiveUserID); ?>';;
    let userLogin = '<? echo ($ActiveUser); ?>';;
  </script>
</head>

<body>
  <?php
  if ($showFoot) {
    echo ('<SCRIPT>BX.remove(BX.findParent(uiToolbarContainer,{className :"bx-layout-inner-inner-cont"})) </SCRIPT>');
  }
  CJSCore::Init(['ui', 'sidepanel', 'jquery2']);
  echo ('<div id="root"></div>');
  if ($showFoot) {
    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
  }
  $APPLICATION->ShowCSS(false, false);
  ?>
</body>

</html>