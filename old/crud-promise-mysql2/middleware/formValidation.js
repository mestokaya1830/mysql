const formValidate = (name ='', password ='') => {
  const errors = []
  if(name === '' || password === ''){
    errors.push({message:'Please fill all field'})
  }else if(name.length < 3){
    errors.push({message:'Name must be less 4 charecters!'})
  }else if(password.length < 3){
    errors.push({message:'Password must be less 4 charecters!'})
  }
  return errors
}

module.exports = formValidate