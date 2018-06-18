<?php
//ini_set('display_errors', 1);
//error_reporting(E_ALL);

function endSession(){
    $result = array('is_succeeded' => false);
    // セッションの初期化
    session_start();

    // セッション変数を全て解除する
    $_SESSION = array();

    // セッションを切断するにはセッションクッキーも削除する。
    // Note: セッション情報だけでなくセッションを破壊する。
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, '/');
    }

    // 最終的に、セッションを破壊する
    session_destroy();

    $result['is_succeeded'] = true;

    return json_encode($result);
}

echo endSession();

?>