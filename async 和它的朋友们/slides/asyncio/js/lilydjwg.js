(function(){
  let cursor_shown = false
  let cursor_hider
  let rightclick_with_shift = false
  //trace left mousedown; when cancelling contextmenu we have mouseup but not mousedown
  let left_clicking = false

  document.addEventListener('mousemove', function(){
    if(!cursor_shown){
      document.body.style.cursor = 'auto'
      cursor_shown = true
    }
    if(cursor_hider){
      clearTimeout(cursor_hider)
    }
    cursor_hider = setTimeout(function(){
      document.body.style.cursor = 'none'
      cursor_shown = false
      cursor_hider = null
    }, 1000, false)
  }, false)

  document.addEventListener('contextmenu', function(e){
    if(!rightclick_with_shift){
      //returning false doesn't work
      e.preventDefault()
    }
  }, false)

  document.addEventListener('mousedown', function(e){
    if(e.button == 2){
      rightclick_with_shift = e.shiftKey
    }else if(e.button === 0){
      left_clicking = [e.clientX, e.clientY]
    }
    return true
  }, false)

  document.addEventListener('mouseup', function(e){
    if(e.target.matches('a *, button') || Reveal.isOverview()){
    }else if(e.button === 0 && left_clicking && left_clicking[0] == e.clientX && left_clicking[1] == e.clientY){
      Reveal.next()
      left_clicking = false
      return false
    }else if(e.button == 2 && !rightclick_with_shift){
      Reveal.prev()
      return false
    }
    return true
  }, false)

  document.addEventListener('keydown', function(e){
    if(e.keyCode == 40) {
      if(Reveal.isOverview()) {
        Reveal.right()
      }else{
        Reveal.next()
      }
      return false
    }else if(e.keyCode == 38) {
      if(Reveal.isOverview()) {
        Reveal.left()
      }else{
        Reveal.prev()
      }
      return false
    }else if(e.keyCode == 9) {
      Reveal.toggleOverview()
      return false
    }
    return true
  })

  Reveal.configure({
    keyboard: {
      38: null,
      40: null,
    }
  });

  document.addEventListener('wheel', function(e){
    if(!e.target.matches('div.present')){
      return true
    }

    if(e.deltaY < 0){
      Reveal.prev()
      return false
    }else if(e.deltaY > 0){
      Reveal.next()
      return false
    }
    return true
  }, false)
})()
