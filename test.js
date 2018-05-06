var $form = $('#questionForm');
var $result = $('#question-result');
var $cnt = $('#answer-cnt-prompt');
var $answer = $('input[type=text][name=answer]');
var $submit = $('input[type=submit][name=answer]');
var $skip = $('input[type=button][name=skip]');
var $back = $('#back-btn');
var $submitPrompt = $('#submit-prompt');

var showMsg = function (text, auto_close) {
  $result.children('.content').html('<p>' + text + '</p>');
  $result.addClass('active');
  if (typeof auto_close == 'undefined' || auto_close) {
    setTimeout("closeMsg()", 3000);
  }
};

var closeMsg = function () {
  $result.removeClass('active')
};

$result.click(closeMsg);

$skip.click(function () {
  $.ajax({
    url: window.location.href,
    data: "_method=DELETE",
    type: "POST",
    beforeSend: function () {
      if (skipped < 2) {
        if (!confirm('纭璺宠繃璇ラ锛�'))
          return false;
      } else if (skipped == 2) {
        if (!confirm('纭璺宠繃璇ラ锛熷鏋滃啀娆¤烦杩囧繀绛旈锛屾瘮璧涘皢澶辫触骞舵棤娉曡繘鍏ラ€夌瓟棰樼幆鑺傦紝璇锋厧閲嶈€冭檻銆�'))
          return false;
      }
      $submit.attr('disabled', 'disabled');
      $skip.attr('disabled', 'disabled');
      $back.attr('disabled', 'disabled');
      return true;
    },
    success: function (data) {
      if (data == 2) {
        if (skipped < 2)
          showMsg("鎴愬姛璺宠繃锛�");
        setTimeout("window.location.href = '/user'", 1500);
      } else {
        showMsg("鍑洪敊浜嗭紝鍏朵腑蹇呮湁韫婅贩...");
        $submit.removeAttr('disabled');
        $skip.removeAttr('disabled');
        $back.removeAttr('disabled');
      }
    },
    error: function (xhr, errorText, errorType) {
      showMsg("鍑洪敊鍟︼細" + errorType + "<br>璇疯仈绯绘姝ヤ负璧㈣礋璐ｄ汉锛�", false);
      $submit.removeAttr('disabled');
      $skip.removeAttr('disabled');
      $back.removeAttr('disabled');
    }
  });
  return false;
});

$form.submit(function () {
  // The return value can be seen in App\TeamQuestion constants
  $.ajax({
    url: window.location.href,
    data: $form.serialize(),
    type: "POST",
    beforeSend: function () {
      if (!$answer.val()) {
        showMsg('nothing');
        return false
      } else if (answer_type == 'number' && !$.isNumeric($answer.val())) {
        showMsg('not a number');
        return false
      }
      
      if (!confirm('纭鎻愪氦绛旀锛�'))
        return false;
      $submit.attr('disabled', 'disabled');
      $skip.attr('disabled', 'disabled');
      $back.attr('disabled', 'disabled');
      $submitPrompt.html('姝ｅ湪鎻愪氦绛旀锛岃鑰愬績绛夊緟...');
      $('body').animate({scrollTop: 0});
      return true;
    },
    success: function (data) {
      console.log(data);
      showMsg([
        "绛旈敊鍟oQ<br>娌℃湁鏈轰細浜� 危( 掳 鈻� 掳|||)锔�<br><br>椤甸潰鍗冲皢璺宠浆...",
        "涓嶆暍鐩镐俊锛岀珶鐒剁瓟瀵逛簡鈯櫹夆姍.<br><br>椤甸潰鍗冲皢璺宠浆...",
        "ERROR!缃戠珯鍑洪敊浜嗭紒<br>璇峰姟蹇呰仈绯绘姝ヤ负璧㈣礋璐ｄ汉锛侊紒锛�<br>锛堥敊璇唬鐮侊細0x00008d锛�",
        "ERROR!缃戠珯鍑洪敊浜嗭紒<br>璇疯仈绯绘姝ヤ负璧㈣礋璐ｄ汉<br>锛堥敊璇唬鐮侊細0x00009e锛�",
        "绛旈敊鍟oQ<br>杩樻湁 1 娆℃満浼毼燺螤"
      ][data[0]], data[0] > 3);
      if (data[0] < 2) {
        if(data[1])//data[1]鏄嚜宸卞凡缁忔槸鍚﹂€氳繃
        {
          var msg = '璇ュ皬闃熷繀绛旈宸插畬鎴愭爣鍑嗭紝鎮ㄥ彲浠ョ户缁瓟棰橈紝鐜板畬鎴愭爣鍑嗙殑灏忕粍鏈�'+data[2]+'涓�';
          alert(msg);
        }
        setTimeout("window.location.href = '/user'", 1500)
      } else if (data[0] > 3) {
        $cnt.text('鍓╀綑鏈轰細: ' + (5 - data[0]));
        $submit.removeAttr('disabled');
        $skip.removeAttr('disabled');
        $back.removeAttr('disabled');
        $submitPrompt.html('&nbsp;');
      }
    },
    error: function (xhr, errorText, errorType) {
      showMsg("鍑洪敊鍟︼細" + errorType + "<br>璇疯仈绯绘姝ヤ负璧㈣礋璐ｄ汉锛�", false);
      $submit.removeAttr('disabled');
      $skip.removeAttr('disabled');
      $back.removeAttr('disabled');
      $submitPrompt.html('&nbsp;');
    }
  });
  return false;
});

$back.click(function () {
  $submit.attr('disabled', 'disabled');
  $skip.attr('disabled', 'disabled');
  $back.attr('disabled', 'disabled');
  window.location.href = '/user';
});