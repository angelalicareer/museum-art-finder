function ScorePassword(stringOfPassword) {
    const obj = { 
      score: 0, 
      hasLowerCase: false, 
      hasUpperCase: false,
      hasNumber: false,
      hasNonAlphaNumeric: false,
      isOver8Char: false,
      isOver12Char: false
        }
    if(/[0-9]/.test(stringOfPassword)){
      obj.hasNumber = true
      obj.score +=1
    }
    if(/[A-Z]/.test(stringOfPassword)){
      obj.hasUpperCase = true
      obj.score +=1 
    }
    if(/[a-z]/.test(stringOfPassword)){
      obj.hasLowerCase = true
      obj.score +=1
    }
    if(/\W/.test(stringOfPassword)){
      obj.hasNonAlphaNumeric = true
      obj.score +=1
    }
    if(stringOfPassword.length>12){
      obj.isOver12Char = true
      obj.isOver8Char = true
      obj.score =obj.score + 2
    }else if(stringOfPassword.length>8){
      obj.isOver8Char = true
      obj.score +=1
    }
    return ( obj )

  }

module.exports = ScorePassword