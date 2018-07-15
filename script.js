"use strict";
(function(){
  var data =  {
    "korea": ["교동 전 선생", "대원정", "보승회관", "명동칼국수", "쟌슨빌 부대찌개"],
    "chinese": ["리칭", "썬데이 반점"],
    "japanese": ["가츠몽", "유리카모메"],
    "snack_bar": ["김밥천국", "레드바삭"]
  };
  var store_list = []

  function setStoreList() {
    var selected_food_style = $('.sc-food-filter').serializeArray();
    
    store_list = [];
    selected_food_style.forEach(function(obj) {
      data[obj.value].forEach(function(value) {
        store_list.push(value);
      })
    })
    shuffle()
  }

  function setAllStoreList() {
    store_list = [];
    for (var key in data) {
      data[key].forEach(function (value) {
        store_list.push(value);
      })
    }
    shuffle()
  }

  function createCard() {
    var $card_wrap = $('.card-wrap')
      , card = [] 

    store_list.forEach(function(value, index) {
      card.push('<li class="card" style="margin-top: ' + index * 40 + 'px;">' +
        '<div class="protect front"></div>' +
        '<div class="protect back">' + value + '</div>' +
      '</li>')
    })
    $card_wrap.html(card.join(''))

    $('.card').on('click', function (e) {
      $(this).addClass('active');
    })
  }
  
  function shuffle() {
    $('.card').addClass('shuffle');
    var random_number = 0
      , save_value = '';

    store_list.forEach(function(value, index) {
      random_number = Math.floor(Math.random() * (store_list.length - 1));
      save_value = store_list[index];
      store_list[index] = store_list[random_number];
      store_list[random_number] = save_value;
    })
  }

  /* 이벤트 바인딩 */
  $('input[name=food-style]').on('change', function(){
    $(this.labels).toggleClass('active')
    setStoreList();
    createCard();
  });

  $('button#selecte-all').on('click', function() {
    var $not_selected = $('input[name=food-style]:not(:checked)');
    
    if($not_selected.length == 0) {return;}
    $not_selected.prop('checked', true);
    $('label:not(.active)').addClass('active')
    setAllStoreList();
    createCard();
  })

  $('button#shuffle').on('click', function () {
    shuffle();
    setTimeout(function(){
      createCard();
    }, 500)
  })
  
})()