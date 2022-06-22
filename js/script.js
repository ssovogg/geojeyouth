// jquery를 이용 (html, css, js)
$(document).ready(function(){
  // 모바일 메뉴 기능
  // .mb-bt를 저장해서 활용하자
  $('.mb-bt').click(function(event){
    event.preventDefault();
    $(this).toggleClass('mb-bt-open');
    $('.mb-dim').toggleClass('mb-dim-open');
    $('.mb-wrap').toggleClass('mb-wrap-open');
  });

  // 전체메뉴 보기(더보기) 기능
  // .more-wrap, .member-more 저장해서 활용하자
  let more_wrap = $('.more-wrap');
  let member_more = $('.member-more');
  member_more.click(function(){
    more_wrap.fadeIn(300);
  });
  // .more-div-close 활용
  let more_div_close = $('.more-div-close');
  more_div_close.click(function(){
    more_wrap.fadeOut(300);
  })

  // 전체메뉴 보기(더보기) 기능 배경 클릭하면 창 사라짐
  more_wrap.click(function(){
    more_wrap.fadeOut(300);
  });
  $('.more-div').click(function(event){
    // click된 신호(이벤트)를 전달 방지
    event.stopPropagation();
  })


  // 화면 사이즈 체크
  $(window).resize(function(){
    // 화면 너비를 계산한다
    let temp = $(window).width();
    // 1000px 보다 크면
    if(temp > 1000) {
      // 모바일 버튼 기능 초기화
      $('.mb-bt').removeClass('mb-bt-open');
      $('.mb-dim').removeClass('mb-dim-open');
      $('.mb-wrap').removeClass('mb-wrap-open');
      $('.mb-menu>li').height(60);
      $('.mb-mainmenu').removeClass('.mb-mainmenu-open');
      more_wrap.fadeOut(0);
  }
  });

  // 모바일 메뉴 펼치기 기능
  // 1. 모바일 메뉴 저장
  let mb_mainmenu = $('.mb-mainmenu');
  // 2. 모바일 서브메뉴 저장
  let mb_submenu = $('.mb-submenu');
  // 3. 펼쳐질 서브메뉴의 높이값 
  let mb_submenu_high = [];
  // 4. 높이값 계산을 실행
  // mb-submenu 각각(each)을 찾아서 > 순서(index)대로 접근
  $.each(mb_submenu, function(index){
    // 각각의 .mb-submenu로 가서 li의 개수 파악
    let count = $(this).find('li').length;
    // 최종 결과를 순서대로 저장(56*count)
    mb_submenu_high[index] = (56 * count + 22);
    //* 22 = 패딩 높이
  });
  // 최종 결과
  let mb_li = $('.mb-menu > li');
  $.each(mb_mainmenu, function(index){
    $(this).click(function(e){
      // a 태그는 클릭하면 웹브라우저에 갱신되서 막아줘야 함
      e.preventDefault();
      // mb-mainmenu 를 toggleClass하기
      $(this).toggleClass('mb-mainmenu-open');
      // mb-mainmenu-open이 있으면 펼치고, 없으면 닫기
      let active = $(this).hasClass('mb-mainmenu-open');
      if(active) {
        let temp = mb_submenu_high[index];
        mb_li.eq(index).height(temp + 60);
        // * 60 = 주메뉴 높이
      } else {
        mb_li.eq(index).height(60);
      }
    });
  });

  // 모바일 메뉴 배경 클릭시 창 사라짐
  let mb_dim = $('.mb-dim');
  mb_dim.click(function(){
    // 모바일 버튼 기능 초기화
    $('.mb-bt').removeClass('mb-bt-open');
    $('.mb-dim').removeClass('mb-dim-open');
    $('.mb-wrap').removeClass('mb-wrap-open');
    $('.mb-menu>li').height(60);
    $('.mb-mainmenu').removeClass('.mb-mainmenu-open');
  })

});


// js를 이용 (html, css, js ~ 멀티미디어 요소)
window.onload = function () {
  
  // 비주얼 슬라이드
  let sw_visual = new Swiper('.sw-visual', {
    loop: true,
    speed: 1000,
    effect: "fade",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.sw-visual-pg',
      clickable: true,
    },
  });

  // 일시정지 버튼
  // 현재 상태 저장
  let slide_now = 'ing';

  // 버튼을 클릭 했을 때
  $('.sw-visual-bt').click(function () {
    if (slide_now == 'ing') {
      // 현재 슬라이드 진행중이라면
      // 슬라이드를 멈춘다.
      slide_now = 'stop'; //조건이 참이면 stop으로 바꾸면서
      sw_visual.autoplay.stop(); // 멈춤
      $(this).find('span').text('play_arrow');
    } else {
      // 현재 슬라이드가 멈췄다.
      // 다시 슬라이드를 진행한다.
      slide_now = 'ing';
      sw_visual.autoplay.start();
      $(this).find('span').text('pause');
    }

    // // 1) 아이콘 변경
    // $(this).toggleClass('sw-visual-bt-play');
    // // 2) 슬라이드 재생 토글 시키기
    // // 현재 슬라이드 상태
    // let temp = $(this).hasClass('sw-visual-bt-play');
    // if(temp){
    //   // 슬라이드 멈추자
    //   sw_visual.autoplay.stop();
    // } else {
    //   // 슬라이드 재생하자
    //   sw_visual.autoplay.start();
    // }
  });

  // 배너 슬라이드
  let sw_banner = new Swiper('.sw-banner', {
    loop: true,
    slidesPerView: 6, // 슬라이드 한번에 6개씩 보여주기
    spaceBetween: 20, // 슬라이드 사이 여백 좌우 20px
    navigation: {
      prevEl: '.sw-banner-prev',
      nextEl: '.sw-banner-next'
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    }, 
    // 화면 사이즈에 따라 슬라이드 갯수 조절
    breakpoints : {
      1400: {
        slidesPerView: 6
      },
      1260: {
        slidesPerView: 5
      },
      1000: {
        slidesPerView: 4
      },
      860: {
        slidesPerView: 3
      }
    }
  });
  
  // 배너 슬라이드 일시정지
  $('.sw-banner-pause').click(function(){
    // 현재 i 태그 안쪽의 글자를 읽는다.
    let temp = $(this).find('span').text();
    if(temp == 'pause') {
      $(this).find('span'.text('play_arrow'));
    } else {
      $(this).find('span').text('pause');
    }
  });

  // 화면 위로 이동
  $('.gotop').click(function(){
    $('html').animate({
      scrollTop: 0
    }, 1000);
  });

}
